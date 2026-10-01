import { redirect } from "next/navigation";

export default async function StackRedirectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  redirect(`/implement-ideas/${params.slug}`);
}
