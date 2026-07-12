import { SectionInspector } from "@/components/builder/SectionInspector"
import { Section } from "@/types"

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

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="text-[11px] font-bold tracking-widest text-gray-900 uppercase">
        {title}
      </span>
      <div className="flex-1 border-t border-gray-900" />
    </div>
  )
}

function HeaderSection({ section }: { section: Section }) {
  const d = section.data
  const contacts = [d.email, d.phone, d.location, d.website].filter(
    Boolean
  ) as string[]

  return (
    <div className="mb-5 text-center">
      <h1 className="text-[22px] font-bold tracking-tight text-gray-900 uppercase">
        {(d.name as string) || "Your Name"}
      </h1>
      {d.title && (
        <p className="mt-0.5 text-[11px] tracking-wide text-gray-600">
          {d.title as string}
        </p>
      )}
      {contacts.length > 0 && (
        <p className="mt-1.5 text-[10px] text-gray-500">
          {contacts.join("  |  ")}
        </p>
      )}
      {d.summary && (
        <p className="mt-3 text-left text-[11px] leading-relaxed text-gray-700">
          {d.summary as string}
        </p>
      )}
    </div>
  )
}

function ExperienceSection({ section }: { section: Section }) {
  return (
    <div className="mb-4">
      <SectionHeading
        title={(section.data.sectionTitle as string) || "Work Experience"}
      />
      <div className="space-y-3">
        {section.blocks.map((block) => {
          const d = block.data
          const start = formatDate(d.startDate as string)
          const end = d.current ? "Present" : formatDate(d.endDate as string)
          return (
            <div key={block.id}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold text-gray-900">
                  {(d.role as string) || "Role"}
                </span>
                <span className="ml-2 shrink-0 text-[10px] text-gray-500">
                  {start}
                  {end ? ` – ${end}` : ""}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-gray-600 italic">
                  {d.company as string}
                </span>
                {d.location && (
                  <span className="text-[10px] text-gray-400">
                    {d.location as string}
                  </span>
                )}
              </div>
              {d.desc && (
                <p className="mt-1 text-[11px] leading-relaxed whitespace-pre-line text-gray-700">
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
      <SectionHeading
        title={(section.data.sectionTitle as string) || "Education"}
      />
      <div className="space-y-3">
        {section.blocks.map((block) => {
          const d = block.data
          const start = formatDate(d.startDate as string)
          const end = formatDate(d.endDate as string)
          return (
            <div key={block.id}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold text-gray-900">
                  {(d.degree as string) || "Degree"}
                </span>
                <span className="ml-2 shrink-0 text-[10px] text-gray-500">
                  {start}
                  {end ? ` – ${end}` : ""}
                </span>
              </div>
              <span className="text-[11px] text-gray-600 italic">
                {d.institution as string}
                {d.gpa ? ` — GPA: ${d.gpa}` : ""}
              </span>
              {d.desc && (
                <p className="mt-1 text-[11px] leading-relaxed text-gray-700">
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
  return (
    <div className="mb-4">
      <SectionHeading
        title={(section.data.sectionTitle as string) || "Skills"}
      />
      <div className="space-y-1">
        {section.blocks.map((block) => {
          const items = ((block.data.items as string) || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
          return (
            <div key={block.id} className="flex gap-2 text-[11px]">
              {block.data.category && (
                <span className="shrink-0 font-bold text-gray-900">
                  {block.data.category as string}:
                </span>
              )}
              <span className="text-gray-700">{items.join(", ")}</span>
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
      <SectionHeading
        title={(section.data.sectionTitle as string) || "Projects"}
      />
      <div className="space-y-3">
        {section.blocks.map((block) => {
          const d = block.data
          return (
            <div key={block.id}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold text-gray-900">
                  {(d.name as string) || "Project"}
                </span>
                {d.url && (
                  <span className="text-[10px] text-gray-500">
                    {d.url as string}
                  </span>
                )}
              </div>
              {d.stack && (
                <span className="text-[11px] text-gray-600 italic">
                  {d.stack as string}
                </span>
              )}
              {d.desc && (
                <p className="mt-1 text-[11px] leading-relaxed text-gray-700">
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
      <SectionHeading
        title={(section.data.sectionTitle as string) || "Languages"}
      />
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {section.blocks.map((block) => (
          <div key={block.id} className="text-[11px]">
            <span className="font-bold text-gray-900">
              {block.data.language as string}
            </span>
            <span className="text-gray-500">
              {" "}
              — {block.data.proficiency as string}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const RENDERERS: Record<string, React.FC<{ section: Section }>> = {
  header: HeaderSection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  languages: LanguagesSection,
}

interface AtsPreviewProps {
  sections: Section[]
}

export function AtsPreview({ sections }: AtsPreviewProps) {
  return (
    <div
      id="cv-preview-root"
      style={{
        width: "794px",
        minHeight: "1123px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
      className="bg-white px-14 py-12 text-gray-900"
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
              <Renderer key={section.id} section={section} />
            </SectionInspector>
          )
        })}
    </div>
  )
}
