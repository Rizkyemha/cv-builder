import { Section } from "@/types"
import { SectionInspector } from "@/components/builder/SectionInspector"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(val: string) {
  if (!val) return ""
  const [year, month] = val.split("-")
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return month ? `${months[parseInt(month) - 1]} ${year}` : year
}

// ─── Section renderers ────────────────────────────────────────────────────────

function HeaderSection({ section }: { section: Section }) {
  const d = section.data
  return (
    <div className="mb-5 border-b-2 border-gray-800 pb-4">
      <h1 className="text-2xl leading-tight font-bold text-gray-900">
        {(d.name as string) || "Your Name"}
      </h1>
      {d.title && (
        <p className="mt-0.5 text-base font-medium text-blue-600">
          {d.title as string}
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-gray-500">
        {d.email && <span>{d.email as string}</span>}
        {d.phone && <span>{d.phone as string}</span>}
        {d.location && <span>{d.location as string}</span>}
        {d.website && <span>{d.website as string}</span>}
      </div>
      {d.summary && (
        <p className="mt-2 text-[12px] leading-relaxed text-gray-600">
          {d.summary as string}
        </p>
      )}
    </div>
  )
}

function ExperienceSection({ section }: { section: Section }) {
  return (
    <div className="mb-4">
      <h2 className="mb-2 border-b border-gray-200 pb-1 text-[13px] font-bold tracking-wider text-gray-800 uppercase">
        {(section.data.sectionTitle as string) || "Work Experience"}
      </h2>
      <div className="space-y-3">
        {section.blocks.map((block) => {
          const d = block.data
          const start = formatDate(d.startDate as string)
          const end = d.current ? "Present" : formatDate(d.endDate as string)
          return (
            <div key={block.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-semibold text-gray-800">
                    {(d.role as string) || "Role"}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {d.company as string}
                    {d.location ? ` · ${d.location}` : ""}
                  </p>
                </div>
                {(start || end) && (
                  <p className="mt-0.5 ml-2 shrink-0 text-[10px] text-gray-400">
                    {start}
                    {end ? ` – ${end}` : ""}
                  </p>
                )}
              </div>
              {d.desc && (
                <p className="mt-1 text-[11px] leading-relaxed whitespace-pre-line text-gray-600">
                  {d.desc as string}
                </p>
              )}
            </div>
          )
        })}
        {section.blocks.length === 0 && (
          <p className="text-[11px] text-gray-300 italic">No items yet.</p>
        )}
      </div>
    </div>
  )
}

function EducationSection({ section }: { section: Section }) {
  return (
    <div className="mb-4">
      <h2 className="mb-2 border-b border-gray-200 pb-1 text-[13px] font-bold tracking-wider text-gray-800 uppercase">
        {(section.data.sectionTitle as string) || "Education"}
      </h2>
      <div className="space-y-3">
        {section.blocks.map((block) => {
          const d = block.data
          const start = formatDate(d.startDate as string)
          const end = formatDate(d.endDate as string)
          return (
            <div key={block.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-semibold text-gray-800">
                    {(d.degree as string) || "Degree"}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {d.institution as string}
                    {d.gpa ? ` · GPA ${d.gpa}` : ""}
                  </p>
                </div>
                {(start || end) && (
                  <p className="mt-0.5 ml-2 shrink-0 text-[10px] text-gray-400">
                    {start}
                    {end ? ` – ${end}` : ""}
                  </p>
                )}
              </div>
              {d.desc && (
                <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
                  {d.desc as string}
                </p>
              )}
            </div>
          )
        })}
        {section.blocks.length === 0 && (
          <p className="text-[11px] text-gray-300 italic">No items yet.</p>
        )}
      </div>
    </div>
  )
}

function SkillsSection({ section }: { section: Section }) {
  const layout = (section.data.layout as string) || "tags"
  return (
    <div className="mb-4">
      <h2 className="mb-2 border-b border-gray-200 pb-1 text-[13px] font-bold tracking-wider text-gray-800 uppercase">
        {(section.data.sectionTitle as string) || "Skills"}
      </h2>
      <div className="space-y-1.5">
        {section.blocks.map((block) => {
          const items = ((block.data.items as string) || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
          return (
            <div key={block.id}>
              {block.data.category && (
                <p className="mb-1 text-[11px] font-semibold text-gray-700">
                  {block.data.category as string}
                </p>
              )}
              {layout === "tags" && (
                <div className="flex flex-wrap gap-1">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
              {layout !== "tags" && (
                <p className="text-[11px] text-gray-600">{items.join(" · ")}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ProjectsSection({ section }: { section: Section }) {
  return (
    <div className="mb-4">
      <h2 className="mb-2 border-b border-gray-200 pb-1 text-[13px] font-bold tracking-wider text-gray-800 uppercase">
        {(section.data.sectionTitle as string) || "Projects"}
      </h2>
      <div className="space-y-3">
        {section.blocks.map((block) => {
          const d = block.data
          return (
            <div key={block.id}>
              <div className="flex items-baseline gap-2">
                <p className="text-[12px] font-semibold text-gray-800">
                  {(d.name as string) || "Project"}
                </p>
                {d.url && (
                  <span className="text-[10px] text-blue-500">
                    {d.url as string}
                  </span>
                )}
              </div>
              {d.stack && (
                <p className="text-[10px] text-gray-400">{d.stack as string}</p>
              )}
              {d.desc && (
                <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
                  {d.desc as string}
                </p>
              )}
            </div>
          )
        })}
        {section.blocks.length === 0 && (
          <p className="text-[11px] text-gray-300 italic">No items yet.</p>
        )}
      </div>
    </div>
  )
}

function LanguagesSection({ section }: { section: Section }) {
  return (
    <div className="mb-4">
      <h2 className="mb-2 border-b border-gray-200 pb-1 text-[13px] font-bold tracking-wider text-gray-800 uppercase">
        {(section.data.sectionTitle as string) || "Languages"}
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {section.blocks.map((block) => (
          <div key={block.id} className="flex items-center gap-1.5">
            <span className="text-[12px] font-medium text-gray-700">
              {block.data.language as string}
            </span>
            <span className="text-[10px] text-gray-400">
              {block.data.proficiency as string}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

const RENDERERS: Record<string, React.FC<{ section: Section }>> = {
  header: HeaderSection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  languages: LanguagesSection,
}

// ─── Main preview ─────────────────────────────────────────────────────────────

interface ModernPreviewProps {
  sections: Section[]
}

export function ModernPreview({ sections }: ModernPreviewProps) {
  return (
    <div
      id="cv-preview-root"
      style={{
        width: "794px",
        minHeight: "1123px",
        fontFamily: "Georgia, serif",
      }}
      className="bg-white p-12 text-gray-900 shadow-sm"
    >
      {sections
        .filter((s) => s.visible)
        .map((section, idx) => {
          const Renderer = RENDERERS[section.type]
          if (!Renderer) return null

          return (
            <SectionInspector
              key={idx}
              idx={idx}
              sectionName={section.data.sectionTitle as string}
            >
              <Renderer section={section} />
            </SectionInspector>
          )
        })}
    </div>
  )
}
