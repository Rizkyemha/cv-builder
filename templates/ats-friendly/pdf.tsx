import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Section } from "@/types"

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111",
    paddingHorizontal: 52,
    paddingVertical: 48,
    backgroundColor: "#fff",
  },
  // header
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#4b5563",
    marginBottom: 4,
  },
  contacts: {
    fontSize: 9,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 10,
  },
  summary: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 14,
  },
  // section heading
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  headingText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#111",
  },
  headingLine: { flex: 1, borderBottomWidth: 0.75, borderBottomColor: "#111" },
  // block
  sectionWrap: { marginBottom: 12 },
  blockWrap: { marginBottom: 7 },
  blockRow: { flexDirection: "row", justifyContent: "space-between" },
  boldText: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  subText: { fontSize: 9, color: "#4b5563" },
  dateText: { fontSize: 9, color: "#6b7280" },
  desc: { fontSize: 9, color: "#374151", lineHeight: 1.6, marginTop: 2 },
  // skills
  skillRow: { flexDirection: "row", gap: 4, marginBottom: 3 },
  skillCat: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  skillItems: { fontSize: 9, color: "#374151", flex: 1 },
  // languages
  langRow: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  langItem: { flexDirection: "row", gap: 3 },
})

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

function Heading({ title }: { title: string }) {
  return (
    <View style={s.headingRow}>
      <Text style={s.headingText}>{title}</Text>
      <View style={s.headingLine} />
    </View>
  )
}

function PdfHeader({ section }: { section: Section }) {
  const d = section.data
  const contacts = [d.email, d.phone, d.location, d.website]
    .filter(Boolean)
    .join("  |  ")
  return (
    <View style={{ marginBottom: 12 }}>
      {d.name && <Text style={s.name}>{d.name as string}</Text>}
      {d.title && <Text style={s.jobTitle}>{d.title as string}</Text>}
      {contacts && <Text style={s.contacts}>{contacts}</Text>}
      {d.summary && <Text style={s.summary}>{d.summary as string}</Text>}
    </View>
  )
}

function PdfExperience({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Heading
        title={(section.data.sectionTitle as string) || "Work Experience"}
      />
      {section.blocks.map((block) => {
        const d = block.data
        const start = formatDate(d.startDate as string)
        const end = d.current ? "Present" : formatDate(d.endDate as string)
        return (
          <View key={block.id} style={s.blockWrap}>
            <View style={s.blockRow}>
              <Text style={s.boldText}>{d.role as string}</Text>
              <Text style={s.dateText}>
                {start}
                {end ? ` – ${end}` : ""}
              </Text>
            </View>
            <View style={s.blockRow}>
              <Text style={s.subText}>{d.company as string}</Text>
              {d.location && (
                <Text style={s.dateText}>{d.location as string}</Text>
              )}
            </View>
            {d.desc && <Text style={s.desc}>{d.desc as string}</Text>}
          </View>
        )
      })}
    </View>
  )
}

function PdfEducation({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Heading title={(section.data.sectionTitle as string) || "Education"} />
      {section.blocks.map((block) => {
        const d = block.data
        const start = formatDate(d.startDate as string)
        const end = formatDate(d.endDate as string)
        return (
          <View key={block.id} style={s.blockWrap}>
            <View style={s.blockRow}>
              <Text style={s.boldText}>{d.degree as string}</Text>
              <Text style={s.dateText}>
                {start}
                {end ? ` – ${end}` : ""}
              </Text>
            </View>
            <Text style={s.subText}>
              {d.institution as string}
              {d.gpa ? ` — GPA: ${d.gpa}` : ""}
            </Text>
            {d.desc && <Text style={s.desc}>{d.desc as string}</Text>}
          </View>
        )
      })}
    </View>
  )
}

function PdfSkills({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Heading title={(section.data.sectionTitle as string) || "Skills"} />
      {section.blocks.map((block) => {
        const items = ((block.data.items as string) || "")
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
          .join(", ")
        return (
          <View key={block.id} style={s.skillRow}>
            {block.data.category && (
              <Text style={s.skillCat}>{block.data.category as string}:</Text>
            )}
            <Text style={s.skillItems}>{items}</Text>
          </View>
        )
      })}
    </View>
  )
}

function PdfProjects({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Heading title={(section.data.sectionTitle as string) || "Projects"} />
      {section.blocks.map((block) => {
        const d = block.data
        return (
          <View key={block.id} style={s.blockWrap}>
            <View style={s.blockRow}>
              <Text style={s.boldText}>{d.name as string}</Text>
              {d.url && <Text style={s.dateText}>{d.url as string}</Text>}
            </View>
            {d.stack && <Text style={s.subText}>{d.stack as string}</Text>}
            {d.desc && <Text style={s.desc}>{d.desc as string}</Text>}
          </View>
        )
      })}
    </View>
  )
}

function PdfLanguages({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Heading title={(section.data.sectionTitle as string) || "Languages"} />
      <View style={s.langRow}>
        {section.blocks.map((block) => (
          <View key={block.id} style={s.langItem}>
            <Text style={s.boldText}>{block.data.language as string}</Text>
            <Text style={s.subText}> — {block.data.proficiency as string}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const PDF_RENDERERS: Record<string, React.FC<{ section: Section }>> = {
  header: PdfHeader,
  experience: PdfExperience,
  education: PdfEducation,
  skills: PdfSkills,
  projects: PdfProjects,
  languages: PdfLanguages,
}

export function AtsPdfDocument({ sections }: { sections: Section[] }) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {sections
          .filter((s) => s.visible)
          .map((section) => {
            const Renderer = PDF_RENDERERS[section.type]
            if (!Renderer) return null
            return <Renderer key={section.id} section={section} />
          })}
      </Page>
    </Document>
  )
}
