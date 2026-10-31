"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ChevronDown, ChevronUp, Save } from "lucide-react";

type Task = { id?: string; title: string; description: string; isOptional: boolean };
type PResource = {
  id?: string; name: string; websiteUrl: string; purpose: string;
  pricingModel: "Free" | "Freemium" | "Paid"; hasFreeTier: boolean; isEssential: boolean;
};
type Phase = {
  id?: string; title: string; description: string; outcome: string;
  estimatedDuration: string; tasks: Task[]; resources: PResource[];
};
type ActionPlan = { id?: string; title: string; description: string };

type IdeaPayload = {
  id?: string;
  slug: string;
  title: string;
  outcome: string;
  description: string;
  targetAudience: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  estimatedCost: string;
  category: "Creator Economy" | "SaaS & Startups" | "Freelancing & Business" | "Content & Media" | "Digital Products";
  featured: boolean;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  keywords: string;
  actionPlans: ActionPlan[];
  phases: Phase[];
};

const emptyIdea: IdeaPayload = {
  slug: "", title: "", outcome: "", description: "", targetAudience: "",
  difficulty: "Beginner", estimatedTime: "", estimatedCost: "",
  category: "Creator Economy", featured: false, status: "DRAFT", keywords: "",
  actionPlans: [], phases: [],
};

export default function IdeaForm({
  mode,
  initialIdea,
}: {
  mode: "create" | "edit";
  initialIdea?: any;
}) {
  const router = useRouter();
  const [form, setForm] = useState<IdeaPayload>(() => {
    if (!initialIdea) return emptyIdea;
    return {
      id: initialIdea.id,
      slug: initialIdea.slug,
      title: initialIdea.title,
      outcome: initialIdea.outcome,
      description: initialIdea.description || "",
      targetAudience: initialIdea.targetAudience || "",
      difficulty: initialIdea.difficulty,
      estimatedTime: initialIdea.estimatedTime,
      estimatedCost: initialIdea.estimatedCost,
      category: initialIdea.category,
      featured: !!initialIdea.featured,
      status: initialIdea.status || "PUBLISHED",
      keywords: (initialIdea.keywords || []).join(", "),
      actionPlans: (initialIdea.actionPlans || []).map((a: any) => ({
        id: a.id, title: a.title, description: a.description || "",
      })),
      phases: (initialIdea.phases || []).map((p: any) => ({
        id: p.id, title: p.title, description: p.description || "",
        outcome: p.outcome || "", estimatedDuration: p.estimatedDuration || "",
        tasks: (p.tasks || []).map((t: any) => ({
          id: t.id, title: t.title, description: t.description || "",
          isOptional: !!t.isOptional,
        })),
        resources: (p.resources || []).map((r: any) => ({
          id: r.id, name: r.name, websiteUrl: r.websiteUrl,
          purpose: r.purpose || "", pricingModel: r.pricingModel,
          hasFreeTier: !!r.hasFreeTier, isEssential: !!r.isEssential,
        })),
      })),
    };
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const update = (patch: Partial<IdeaPayload>) => setForm((f) => ({ ...f, ...patch }));

  // ─ Action Plan helpers ─
  const addAction = () =>
    update({ actionPlans: [...form.actionPlans, { title: "", description: "" }] });
  const updateAction = (i: number, patch: Partial<ActionPlan>) =>
    update({
      actionPlans: form.actionPlans.map((a, idx) => (idx === i ? { ...a, ...patch } : a)),
    });
  const removeAction = (i: number) =>
    update({ actionPlans: form.actionPlans.filter((_, idx) => idx !== i) });

  // ─ Phase helpers ─
  const addPhase = () =>
    update({
      phases: [
        ...form.phases,
        {
          title: "", description: "", outcome: "", estimatedDuration: "",
          tasks: [], resources: [],
        },
      ],
    });
  const updatePhase = (i: number, patch: Partial<Phase>) =>
    update({ phases: form.phases.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) });
  const removePhase = (i: number) =>
    update({ phases: form.phases.filter((_, idx) => idx !== i) });

  // ─ Task / Resource helpers per phase ─
  const addTask = (pi: number) => {
    const phases = [...form.phases];
    phases[pi].tasks = [...phases[pi].tasks, { title: "", description: "", isOptional: false }];
    update({ phases });
  };
  const updateTask = (pi: number, ti: number, patch: Partial<Task>) => {
    const phases = form.phases.map((p, idx) => {
      if (idx !== pi) return p;
      return { ...p, tasks: p.tasks.map((t, tidx) => (tidx === ti ? { ...t, ...patch } : t)) };
    });
    update({ phases });
  };
  const removeTask = (pi: number, ti: number) => {
    const phases = form.phases.map((p, idx) =>
      idx !== pi ? p : { ...p, tasks: p.tasks.filter((_, tidx) => tidx !== ti) }
    );
    update({ phases });
  };
  const addResource = (pi: number) => {
    const phases = [...form.phases];
    phases[pi].resources = [
      ...phases[pi].resources,
      { name: "", websiteUrl: "", purpose: "", pricingModel: "Freemium", hasFreeTier: true, isEssential: true },
    ];
    update({ phases });
  };
  const updateResource = (pi: number, ri: number, patch: Partial<PResource>) => {
    const phases = form.phases.map((p, idx) => {
      if (idx !== pi) return p;
      return { ...p, resources: p.resources.map((r, ridx) => (ridx === ri ? { ...r, ...patch } : r)) };
    });
    update({ phases });
  };
  const removeResource = (pi: number, ri: number) => {
    const phases = form.phases.map((p, idx) =>
      idx !== pi ? p : { ...p, resources: p.resources.filter((_, ridx) => ridx !== ri) }
    );
    update({ phases });
  };

  async function submit() {
    setBusy(true); setError("");

    const payload = {
      slug: form.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, ""),
      title: form.title,
      outcome: form.outcome,
      description: form.description,
      targetAudience: form.targetAudience,
      difficulty: form.difficulty,
      estimatedTime: form.estimatedTime,
      estimatedCost: form.estimatedCost,
      category: form.category,
      featured: form.featured,
      status: form.status,
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      actionPlans: form.actionPlans.map((a) => ({ id: a.id, title: a.title, description: a.description })),
      phases: form.phases.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        outcome: p.outcome,
        estimatedDuration: p.estimatedDuration,
        tasks: p.tasks.map((t) => ({ id: t.id, title: t.title, description: t.description, isOptional: t.isOptional })),
        resources: p.resources.map((r) => ({
          id: r.id, name: r.name, websiteUrl: r.websiteUrl, purpose: r.purpose,
          pricingModel: r.pricingModel, hasFreeTier: r.hasFreeTier, isEssential: r.isEssential,
        })),
      })),
    };

    try {
      const isNew = mode === "create";
      const res = await fetch(
        isNew ? "/api/admin/ideas" : `/api/admin/ideas/${form.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save");
      router.push("/admin/ideas");
      router.refresh();
    } catch (e: any) {
      setError(e.message || "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {error && <div className="bg-rose-500/10 border border-rose-500/40 text-rose-300 p-3 rounded-xl text-sm">{error}</div>}

      {/* Basic Info */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold mb-2">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title *"><input className={I} value={form.title} onChange={(e) => update({ title: e.target.value })} /></Field>
          <Field label="Slug *"><input className={I} value={form.slug} onChange={(e) => update({ slug: e.target.value })} placeholder="youtube-career-launchpad" /></Field>
        </div>
        <Field label="Outcome *"><textarea rows={2} className={I} value={form.outcome} onChange={(e) => update({ outcome: e.target.value })} /></Field>
        <Field label="Description"><textarea rows={2} className={I} value={form.description} onChange={(e) => update({ description: e.target.value })} /></Field>
        <Field label="Target Audience"><textarea rows={2} className={I} value={form.targetAudience} onChange={(e) => update({ targetAudience: e.target.value })} /></Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Difficulty">
            <select className={I} value={form.difficulty} onChange={(e) => update({ difficulty: e.target.value as any })}>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
          </Field>
          <Field label="Estimated Time *"><input className={I} value={form.estimatedTime} onChange={(e) => update({ estimatedTime: e.target.value })} /></Field>
          <Field label="Estimated Cost *"><input className={I} value={form.estimatedCost} onChange={(e) => update({ estimatedCost: e.target.value })} /></Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select className={I} value={form.category} onChange={(e) => update({ category: e.target.value as any })}>
              <option>Creator Economy</option><option>SaaS & Startups</option><option>Freelancing & Business</option>
              <option>Content & Media</option><option>Digital Products</option>
            </select>
          </Field>
          <Field label="Status">
            <select className={I} value={form.status} onChange={(e) => update({ status: e.target.value as any })}>
              <option>PUBLISHED</option><option>DRAFT</option><option>ARCHIVED</option>
            </select>
          </Field>
        </div>

        <Field label="Keywords (comma separated)"><input className={I} value={form.keywords} onChange={(e) => update({ keywords: e.target.value })} /></Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => update({ featured: e.target.checked })} />
          Featured on the ideas directory
        </label>
      </section>

      {/* Action Plans */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Action Plan Steps</h2>
          <button onClick={addAction} className="bg-zinc-800 hover:bg-zinc-700 text-sm px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Plus size={14} /> Add step
          </button>
        </div>
        {form.actionPlans.length === 0 && <p className="text-sm text-zinc-500">No action plan steps yet.</p>}
        {form.actionPlans.map((a, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-start bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <input className={I} placeholder="Step title" value={a.title} onChange={(e) => updateAction(i, { title: e.target.value })} />
            <input className={I} placeholder="Step description" value={a.description} onChange={(e) => updateAction(i, { description: e.target.value })} />
            <button onClick={() => removeAction(i)} className="p-2 text-zinc-500 hover:text-rose-400"><Trash2 size={14} /></button>
          </div>
        ))}
      </section>

      {/* Phases */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Phases ({form.phases.length})</h2>
          <button onClick={addPhase} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Plus size={14} /> Add phase
          </button>
        </div>

        {form.phases.map((phase, pi) => (
          <PhaseEditor
            key={pi}
            index={pi}
            phase={phase}
            onUpdate={(patch) => updatePhase(pi, patch)}
            onRemove={() => removePhase(pi)}
            onAddTask={() => addTask(pi)}
            onUpdateTask={(ti, patch) => updateTask(pi, ti, patch)}
            onRemoveTask={(ti) => removeTask(pi, ti)}
            onAddResource={() => addResource(pi)}
            onUpdateResource={(ri, patch) => updateResource(pi, ri, patch)}
            onRemoveResource={(ri) => removeResource(pi, ri)}
          />
        ))}
      </section>

      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
        <button onClick={() => router.push("/admin/ideas")} className="px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white">Cancel</button>
        <button onClick={submit} disabled={busy}
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-2.5 rounded-xl text-sm disabled:opacity-50 flex items-center gap-2">
          <Save size={14} /> {busy ? "Saving..." : mode === "create" ? "Create Idea" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────
function PhaseEditor({
  index, phase, onUpdate, onRemove,
  onAddTask, onUpdateTask, onRemoveTask,
  onAddResource, onUpdateResource, onRemoveResource,
}: any) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-left">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Phase {index + 1}</span>
          <span className="font-semibold">{phase.title || "Untitled"}</span>
        </button>
        <button onClick={onRemove} className="p-2 text-zinc-500 hover:text-rose-400"><Trash2 size={14} /></button>
      </div>

      {open && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phase Title"><input className={I} value={phase.title} onChange={(e) => onUpdate({ title: e.target.value })} /></Field>
            <Field label="Estimated Duration"><input className={I} value={phase.estimatedDuration} onChange={(e) => onUpdate({ estimatedDuration: e.target.value })} /></Field>
          </div>
          <Field label="Description"><textarea rows={2} className={I} value={phase.description} onChange={(e) => onUpdate({ description: e.target.value })} /></Field>
          <Field label="Outcome"><textarea rows={2} className={I} value={phase.outcome} onChange={(e) => onUpdate({ outcome: e.target.value })} /></Field>

          {/* Tasks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold">Tasks ({phase.tasks.length})</h4>
              <button onClick={onAddTask} className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded flex items-center gap-1">
                <Plus size={12} /> Add task
              </button>
            </div>
            <div className="space-y-2">
              {phase.tasks.map((t: any, ti: number) => (
                <div key={ti} className="grid grid-cols-[2fr_3fr_auto_auto] gap-2 items-center bg-zinc-950 border border-zinc-800 rounded-lg p-2">
                  <input className={I} placeholder="Task title" value={t.title} onChange={(e) => onUpdateTask(ti, { title: e.target.value })} />
                  <input className={I} placeholder="Description" value={t.description} onChange={(e) => onUpdateTask(ti, { description: e.target.value })} />
                  <label className="flex items-center gap-1 text-xs text-zinc-400">
                    <input type="checkbox" checked={t.isOptional} onChange={(e) => onUpdateTask(ti, { isOptional: e.target.checked })} />
                    Optional
                  </label>
                  <button onClick={() => onRemoveTask(ti)} className="p-1.5 text-zinc-500 hover:text-rose-400"><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold">Tools / Resources ({phase.resources.length})</h4>
              <button onClick={onAddResource} className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded flex items-center gap-1">
                <Plus size={12} /> Add tool
              </button>
            </div>
            <div className="space-y-2">
              {phase.resources.map((r: any, ri: number) => (
                <div key={ri} className="space-y-2 bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                    <input className={I} placeholder="Tool name" value={r.name} onChange={(e) => onUpdateResource(ri, { name: e.target.value })} />
                    <input className={I} placeholder="https://..." value={r.websiteUrl} onChange={(e) => onUpdateResource(ri, { websiteUrl: e.target.value })} />
                    <button onClick={() => onRemoveResource(ri)} className="p-1.5 text-zinc-500 hover:text-rose-400"><Trash2 size={12} /></button>
                  </div>
                  <input className={I} placeholder="Purpose" value={r.purpose} onChange={(e) => onUpdateResource(ri, { purpose: e.target.value })} />
                  <div className="flex items-center gap-4 text-xs">
                    <select className={I + " max-w-[120px]"} value={r.pricingModel} onChange={(e) => onUpdateResource(ri, { pricingModel: e.target.value })}>
                      <option>Free</option><option>Freemium</option><option>Paid</option>
                    </select>
                    <label className="flex items-center gap-1"><input type="checkbox" checked={r.hasFreeTier} onChange={(e) => onUpdateResource(ri, { hasFreeTier: e.target.checked })} /> Free tier</label>
                    <label className="flex items-center gap-1"><input type="checkbox" checked={r.isEssential} onChange={(e) => onUpdateResource(ri, { isEssential: e.target.checked })} /> Essential</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const I = "w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}