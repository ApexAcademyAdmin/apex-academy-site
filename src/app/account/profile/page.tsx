"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const inputCls = "w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/90 placeholder-white/20 focus:outline-none focus:border-[#17FC13]/30 transition-colors";
const labelCls = "block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-1.5";

// All editable player_profiles columns, as strings in form state.
const FIELDS = [
  "first_name", "last_name", "graduation_year", "school", "city", "state", "date_of_birth", "photo_url",
  "primary_position", "secondary_position", "bats", "throws", "height", "weight", "jersey_number",
  "exit_velocity", "pitching_velocity", "sixty_yard", "pop_time", "infield_velocity", "outfield_velocity",
  "highlight_url", "social_instagram", "social_twitter",
  "gpa", "sat_score", "act_score",
  "recruiting_status", "committed_school",
] as const;

type Field = (typeof FIELDS)[number];
type FormState = Record<Field, string>;

const emptyForm = Object.fromEntries(FIELDS.map((f) => [f, ""])) as FormState;

type FieldDef = { key: Field; label: string; placeholder?: string; type?: string; options?: string[] };

const SECTIONS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Personal",
    fields: [
      { key: "first_name", label: "First Name", placeholder: "First" },
      { key: "last_name", label: "Last Name", placeholder: "Last" },
      { key: "graduation_year", label: "Graduation Year", placeholder: "2027" },
      { key: "school", label: "School", placeholder: "High school" },
      { key: "city", label: "City", placeholder: "City" },
      { key: "state", label: "State", placeholder: "MA" },
      { key: "date_of_birth", label: "Date of Birth", type: "date" },
      { key: "photo_url", label: "Photo URL", placeholder: "https://..." },
    ],
  },
  {
    title: "Baseball",
    fields: [
      { key: "primary_position", label: "Primary Position", placeholder: "SS" },
      { key: "secondary_position", label: "Secondary Position", placeholder: "2B" },
      { key: "bats", label: "Bats", options: ["", "R", "L", "S"] },
      { key: "throws", label: "Throws", options: ["", "R", "L"] },
      { key: "height", label: "Height", placeholder: `6'1"` },
      { key: "weight", label: "Weight", placeholder: "180 lbs" },
      { key: "jersey_number", label: "Jersey #", placeholder: "12" },
    ],
  },
  {
    title: "Metrics",
    fields: [
      { key: "exit_velocity", label: "Exit Velo", placeholder: "95 mph" },
      { key: "pitching_velocity", label: "Pitching Velo", placeholder: "88 mph" },
      { key: "sixty_yard", label: "60 Yard", placeholder: "6.8s" },
      { key: "pop_time", label: "Pop Time", placeholder: "1.95s" },
      { key: "infield_velocity", label: "Infield Velo", placeholder: "82 mph" },
      { key: "outfield_velocity", label: "Outfield Velo", placeholder: "85 mph" },
    ],
  },
  {
    title: "Media",
    fields: [
      { key: "highlight_url", label: "Highlight Video URL", placeholder: "https://..." },
      { key: "social_instagram", label: "Instagram", placeholder: "@handle" },
      { key: "social_twitter", label: "Twitter / X", placeholder: "@handle" },
    ],
  },
  {
    title: "Academic",
    fields: [
      { key: "gpa", label: "GPA", placeholder: "3.8" },
      { key: "sat_score", label: "SAT", placeholder: "1300" },
      { key: "act_score", label: "ACT", placeholder: "28" },
    ],
  },
  {
    title: "Recruiting",
    fields: [
      { key: "recruiting_status", label: "Status", options: ["", "uncommitted", "committed", "signed"] },
      { key: "committed_school", label: "Committed School", placeholder: "University" },
    ],
  },
];

export default function ProfilePage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState("draft");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/signin"); return; }

      const { data } = await supabase
        .from("player_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        const next = { ...emptyForm };
        for (const f of FIELDS) next[f] = data[f] ?? "";
        setForm(next);
        setStatus(data.status || "draft");
      }
      setLoaded(true);
    }
    load();
  }, [router]);

  function update(key: Field, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/signin"); return; }

    // Convert blanks to null so check constraints (bats/throws/etc.) aren't violated.
    const payload: Record<string, unknown> = { user_id: user.id };
    for (const f of FIELDS) payload[f] = form[f].trim() === "" ? null : form[f].trim();

    const { error: upsertError } = await supabase
      .from("player_profiles")
      .upsert(payload, { onConflict: "user_id" });

    setSaving(false);
    if (upsertError) { setError(upsertError.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-[#17FC13]/30 border-t-[#17FC13] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/40 mb-2">Player Profile</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {[form.first_name, form.last_name].filter(Boolean).join(" ") || "My Profile"}
          </h1>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-white/10 text-white/40 capitalize">
          {status.replace(/_/g, " ")}
        </span>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-6 mb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-5">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section.fields.map((f) => (
              <div key={f.key}>
                <label className={labelCls}>{f.label}</label>
                {f.options ? (
                  <select value={form[f.key]} onChange={(e) => update(f.key, e.target.value)} className={inputCls}>
                    {f.options.map((o) => (
                      <option key={o} value={o}>{o === "" ? "—" : o.charAt(0).toUpperCase() + o.slice(1)}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type || "text"}
                    value={form[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    className={inputCls}
                    placeholder={f.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 mb-4 border border-red-500/20 bg-red-500/[0.04] rounded-lg">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
          <span className="text-xs text-red-400/80">{error}</span>
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 mb-4 border border-[#17FC13]/20 bg-[#17FC13]/[0.04] rounded-lg">
          <span className="w-1.5 h-1.5 bg-[#17FC13] rounded-full shrink-0" />
          <span className="text-xs text-[#17FC13]/80">Profile saved.</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-3 rounded-full border border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white text-xs font-bold uppercase tracking-wide cursor-pointer hover:shadow-[0_0_20px_rgba(23,252,19,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {saving ? "Saving..." : "Save Profile"}
        </button>
        <a href="/account" className="px-6 py-3 rounded-full border border-[#404040] bg-gradient-to-t from-white/[0.06] to-transparent text-white text-xs font-bold uppercase tracking-wide no-underline hover:border-[#17FC13]/50 transition-all">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
