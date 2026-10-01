import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ completedTaskIds: [], startedIdeaIds: [] });
    }

    const { searchParams } = new URL(req.url);
    const ideaId = searchParams.get("ideaId");

    if (ideaId) {
      // Resolve idea by ID or Slug
      const idea = await prisma.implementationIdea.findFirst({
        where: {
          OR: [{ id: ideaId }, { slug: ideaId }],
        },
        select: { id: true },
      });

      const resolvedIdeaId = idea ? idea.id : ideaId;

      const taskProgress = await prisma.userTaskProgress.findMany({
        where: {
          userId: session.user.id,
          task: {
            phase: {
              ideaId: resolvedIdeaId,
            },
          },
          completed: true,
        },
        include: {
          task: {
            select: { id: true, title: true },
          },
        },
      });

      // Return both task IDs and titles so frontend can match either
      const completedTaskIds = Array.from(
        new Set(taskProgress.flatMap((tp) => [tp.taskId, tp.task.title]))
      );

      return NextResponse.json({
        completedTaskIds,
      });
    }

    // All started ideas and tasks
    const ideaProgress = await prisma.userIdeaProgress.findMany({
      where: { userId: session.user.id },
      include: {
        idea: {
          include: {
            phases: {
              include: {
                tasks: true,
              },
            },
          },
        },
      },
    });

    const userTasks = await prisma.userTaskProgress.findMany({
      where: {
        userId: session.user.id,
        completed: true,
      },
      include: {
        task: {
          select: { id: true, title: true },
        },
      },
    });

    const completedTaskIds = Array.from(
      new Set(userTasks.flatMap((t) => [t.taskId, t.task.title]))
    );

    return NextResponse.json({
      startedIdeas: ideaProgress,
      completedTaskIds,
    });
  } catch (error) {
    console.error("Fetch idea progress error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized. Guest progress saved locally." }, { status: 401 });
    }

    const body = await req.json();
    const { action, ideaId, taskId, completed } = body;

    // Handle Reset Progress
    if (action === "reset" && ideaId) {
      const idea = await prisma.implementationIdea.findFirst({
        where: {
          OR: [{ id: ideaId }, { slug: ideaId }],
        },
        select: { id: true },
      });

      if (idea) {
        const ideaTasks = await prisma.implementationTask.findMany({
          where: {
            phase: {
              ideaId: idea.id,
            },
          },
          select: { id: true },
        });

        const taskIds = ideaTasks.map((t) => t.id);

        await prisma.userTaskProgress.deleteMany({
          where: {
            userId: session.user.id,
            taskId: { in: taskIds },
          },
        });

        await prisma.userIdeaProgress.deleteMany({
          where: {
            userId: session.user.id,
            ideaId: idea.id,
          },
        });
      }

      return NextResponse.json({ message: "Progress reset successfully", completedTaskIds: [] });
    }

    // Handle Start Idea
    if (action === "start" && ideaId) {
      const idea = await prisma.implementationIdea.findFirst({
        where: {
          OR: [{ id: ideaId }, { slug: ideaId }],
        },
        select: { id: true },
      });

      if (idea) {
        await prisma.userIdeaProgress.upsert({
          where: {
            userId_ideaId: {
              userId: session.user.id,
              ideaId: idea.id,
            },
          },
          update: {
            updatedAt: new Date(),
          },
          create: {
            userId: session.user.id,
            ideaId: idea.id,
          },
        });
      }

      return NextResponse.json({ message: "Roadmap started!" });
    }

    // Handle Task Toggle
    if (taskId) {
      const task = await prisma.implementationTask.findFirst({
        where: {
          OR: [{ id: taskId }, { title: taskId }],
        },
        select: {
          id: true,
          phase: {
            select: { ideaId: true },
          },
        },
      });

      if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
      }

      const resolvedTaskId = task.id;
      const resolvedIdeaId = task.phase.ideaId;

      if (completed) {
        await prisma.userTaskProgress.upsert({
          where: {
            userId_taskId: {
              userId: session.user.id,
              taskId: resolvedTaskId,
            },
          },
          update: {
            completed: true,
            completedAt: new Date(),
          },
          create: {
            userId: session.user.id,
            taskId: resolvedTaskId,
            completed: true,
            completedAt: new Date(),
          },
        });
      } else {
        await prisma.userTaskProgress.deleteMany({
          where: {
            userId: session.user.id,
            taskId: resolvedTaskId,
          },
        });
      }

      // Automatically register idea as started if not already
      await prisma.userIdeaProgress.upsert({
        where: {
          userId_ideaId: {
            userId: session.user.id,
            ideaId: resolvedIdeaId,
          },
        },
        update: {
          updatedAt: new Date(),
        },
        create: {
          userId: session.user.id,
          ideaId: resolvedIdeaId,
        },
      });

      return NextResponse.json({ success: true, taskId: resolvedTaskId, completed });
    }

    return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
  } catch (error) {
    console.error("Update task progress error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
