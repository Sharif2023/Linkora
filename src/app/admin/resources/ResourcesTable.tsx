"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Search, ExternalLink } from "lucide-react";

type Category = { id: string; name: string; slug: string };
type Resource = {
  id: string; url: string; title: string; description: string; logo: string | null;
  categoryId: string | null; category: Category | null; pricingModel: string | null;
  freeTier: boolean; payoutMethods: string | null; minPayout: number | null;
  supportedCountries: string | null; fees: string | null; currency: string | null;
  status: string; score: number; affiliateDisclosure: string | null;
};

type FormState = Partial<Resource> & { _new?: boolean };

const emptyForm: FormState = {
  title: "", url: "", description: "", logo: "", categoryId: "",
  pricingModel: "Freemium", freeTier: true, status: "ACTIVE", score: 4.5,
  payoutMethods: "", minPayout: null, supportedCountries: "", fees: "", currency: "",
  affiliateDisclosure: "",
};

export default function ResourcesTable({
  initialResources,
  categories,
}: {
  initialResources: Resource[];
  categories: Category[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialResources);
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [form, setForm] = useState<FormState | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((r) => {
      if (q && !`${r.title} ${r.url} ${r.description}`.toLowerCase().includes(q)) return false;
      if (filterCategory && r.categoryId !== filterCategory) return false;
      if (filterStatus && r.status !== filterStatus) return false;
      return true;
    });
  }, [items, query, filterCategory, filterStatus]);

  const openNew = () => { setError(""); setForm({ ...emptyForm }); };
  const openEdit = (r: Resource) => { setError(""); setForm({ ...r }); };
  const close = () => { setForm(null); setBusy(false); setError(""); };

  async function save() {
    if (!form) return;
    setBusy(true); setError("");

    const payload = {
      title: form.title, url: form.url, description: form.description,
      logo: form.logo || null, categoryId: form.categoryId || null,
      pricingModel: form.pricingModel || null, freeTier: !!form.freeTier,
      payoutMethods: form.payoutMethods || null,
      minPayout: form.minPayout != null ? Number(form.minPayout) : null,
      supportedCountries: form.supportedCountries || null,
      fees: form.fees || null, currency: form.currency || null,
      status: form.status || "ACTIVE", score: form.score != null ? Number(form.score) : 0,
      affiliateDisclosure: form.affiliateDisclosure || null,
    };

    try {
      const isNew = !form.id;
      const res = await fetch(
        isNew ? "/api/admin/resources" : `/api/admin/resources/${form.id}`,
        { method: isNew ? "POST" : "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save");
      close();
      router.refresh();
      const listRes = await fetch("/api/admin/resources");
      const listData = await listRes.json();
      setItems(listData.resources);
    } catch (e: any) {
      setError(e.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this resource? This also removes references from any phase and curated collection.")) return;
    const res = await fetch(`/api/admin/resources/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems(items.filter((i) => i.id !== id));
      router.refresh();
    } else {
      alert("Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-sm"
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm">
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="BROKEN">Broken</option>
        </select>
        <button onClick={openNew}
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Plus size={16} /> New Resource
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Pricing</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-zinc-800/70 hover:bg-zinc-900/70">
                <td className="px-4 py-3">
                  <div className="font-semibold">{r.title}</div>
                  <a href={r.url} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1">
                    {r.url.replace(/^https?:\/\//, "").slice(0, 40)} <ExternalLink size={10} />
                  </a>
                </td>
                <td className="px-4 py-3 text-zinc-400">{r.category?.name || "—"}</td>
                <td className="px-4 py-3 text-zinc-400">
                  {r.pricingModel || "—"} {r.freeTier && <span className="text-emerald-400 text-[10px] font-bold ml-1">FREE</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    r.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-400" :
                    r.status === "BROKEN" ? "bg-rose-500/10 text-rose-400" : "bg-zinc-800 text-zinc-400"
                  }`}>{r.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(r)} className="p-2 hover:text-emerald-400 text-zinc-400"><Pencil size={14} /></button>
                  <button onClick={() => remove(r.id)} className="p-2 hover:text-rose-400 text-zinc-400"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center py-12 text-zinc-500">No resources match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
              <h2 className="text-xl font-bold">{form.id ? "Edit Resource" : "New Resource"}</h2>
              <button onClick={close} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-6 space-y-4">
              {error && <div className="bg-rose-500/10 border border-rose-500/40 text-rose-300 p-3 rounded-xl text-sm">{error}</div>}

              <Field label="Title *"><input className={inputCls} value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
              <Field label="URL *"><input className={inputCls} value={form.url || ""} onChange={(e) => setForm({ ...form, url: e.target.value })} /></Field>
              <Field label="Description *"><textarea rows={3} className={inputCls} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
              <Field label="Logo URL"><input className={inputCls} value={form.logo || ""} onChange={(e) => setForm({ ...form, logo: e.target.value })} /></Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select className={inputCls} value={form.categoryId || ""} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                    <option value="">— None —</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </Field>
                <Field label="Pricing Model">
                  <input className={inputCls} value={form.pricingModel || ""} onChange={(e) => setForm({ ...form, pricingModel: e.target.value })} />
                </Field>
                <Field label="Status">
                  <select className={inputCls} value={form.status || "ACTIVE"} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="BROKEN">BROKEN</option>
                  </select>
                </Field>
                <Field label="Score (0–5)">
                  <input type="number" step="0.1" min={0} max={5} className={inputCls} value={form.score ?? 0} onChange={(e) => setForm({ ...form, score: Number(e.target.value) })} />
                </Field>
                <Field label="Free Tier">
                  <label className="flex items-center gap-2 text-sm py-2.5">
                    <input type="checkbox" checked={!!form.freeTier} onChange={(e) => setForm({ ...form, freeTier: e.target.checked })} />
                    Yes, this resource has a real free tier
                  </label>
                </Field>
                <Field label="Currency"><input className={inputCls} value={form.currency || ""} onChange={(e) => setForm({ ...form, currency: e.target.value })} /></Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Payout Methods"><input className={inputCls} value={form.payoutMethods || ""} onChange={(e) => setForm({ ...form, payoutMethods: e.target.value })} /></Field>
                <Field label="Min Payout"><input type="number" className={inputCls} value={form.minPayout ?? ""} onChange={(e) => setForm({ ...form, minPayout: e.target.value === "" ? null : Number(e.target.value) })} /></Field>
                <Field label="Supported Countries"><input className={inputCls} value={form.supportedCountries || ""} onChange={(e) => setForm({ ...form, supportedCountries: e.target.value })} /></Field>
                <Field label="Fees"><input className={inputCls} value={form.fees || ""} onChange={(e) => setForm({ ...form, fees: e.target.value })} /></Field>
              </div>

              <Field label="Affiliate Disclosure"><textarea rows={2} className={inputCls} value={form.affiliateDisclosure || ""} onChange={(e) => setForm({ ...form, affiliateDisclosure: e.target.value })} /></Field>
            </div>

            <div className="p-6 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={close} className="px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white">Cancel</button>
              <button onClick={save} disabled={busy}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-2.5 rounded-xl text-sm disabled:opacity-50">
                {busy ? "Saving..." : form.id ? "Save Changes" : "Create Resource"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}