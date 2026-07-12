import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Section } from "@/types"

const s = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    fontSize: 10,
    color: "#111827",
    paddingHorizontal: 48,
    paddingVertical: 48,
    backgroundColor: "#fff",
  },
  // header
  name: { fontFamily: "Times-Bold", fontSize: 22, marginBottom: 2 },
  jobTitle: {
    fontFamily: "Times-Bold",
    fontSize: 13,
    color: "#2563eb",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 8,
  },
  contactItem: { fontSize: 9, color: "#6b7280" },
  summary: { fontSize: 10, color: "#4b5563", lineHeight: 1.6, marginTop: 4 },
  headerDivider: {
    borderBottomWidth: 2,
    borderBottomColor: "#1f2937",
    marginTop: 12,
    marginBottom: 14,
  },
  // section
  sectionWrap: { marginBottom: 14 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#1f2937",
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
    marginBottom: 6,
  },
  // block
  blockWrap: { marginBottom: 8 },
  blockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  blockTitle: { fontFamily: "Helvetica-Bold", fontSize: 10, color: "#1f2937" },
  blockSub: { fontSize: 9, color: "#6b7280", marginTop: 1 },
  blockDate: { fontSize: 8, color: "#9ca3af", marginLeft: 8 },
  blockDesc: { fontSize: 9, color: "#4b5563", marginTop: 3, lineHeight: 1.6 },
  // skills
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  tag: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#374151",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: "#374151",
    marginBottom: 3,
  },
  // languages
  langRow: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  langItem: { flexDirection: "row", gap: 4 },
  langName: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  langLevel: { fontFamily: "Helvetica", fontSize: 9, color: "#9ca3af" },
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

function PdfHeader({ section }: { section: Section }) {
  const d = section.data
  return (
    <View>
      {d.name && <Text style={s.name}>{d.name as string}</Text>}
      {d.title && <Text style={s.jobTitle}>{d.title as string}</Text>}
      <View style={s.contactRow}>
        {d.email && <Text style={s.contactItem}>{d.email as string}</Text>}
        {d.phone && <Text style={s.contactItem}>{d.phone as string}</Text>}
        {d.location && (
          <Text style={s.contactItem}>{d.location as string}</Text>
        )}
        {d.website && <Text style={s.contactItem}>{d.website as string}</Text>}
      </View>
      {d.summary && <Text style={s.summary}>{d.summary as string}</Text>}
      <View style={s.headerDivider} />
    </View>
  )
}

function PdfExperience({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Text style={s.sectionTitle}>
        {(section.data.sectionTitle as string) || "Work Experience"}
      </Text>
      {section.blocks.map((block) => {
        const d = block.data
        const start = formatDate(d.startDate as string)
        const end = d.current ? "Present" : formatDate(d.endDate as string)
        return (
          <View key={block.id} style={s.blockWrap}>
            <View style={s.blockRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.blockTitle}>{(d.role as string) || "Role"}</Text>
                <Text style={s.blockSub}>
                  {d.company as string}
                  {d.location ? ` · ${d.location}` : ""}
                </Text>
              </View>
              {(start || end) && (
                <Text style={s.blockDate}>
                  {start}
                  {end ? ` – ${end}` : ""}
                </Text>
              )}
            </View>
            {d.desc && <Text style={s.blockDesc}>{d.desc as string}</Text>}
          </View>
        )
      })}
    </View>
  )
}

function PdfEducation({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Text style={s.sectionTitle}>
        {(section.data.sectionTitle as string) || "Education"}
      </Text>
      {section.blocks.map((block) => {
        const d = block.data
        const start = formatDate(d.startDate as string)
        const end = formatDate(d.endDate as string)
        return (
          <View key={block.id} style={s.blockWrap}>
            <View style={s.blockRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.blockTitle}>
                  {(d.degree as string) || "Degree"}
                </Text>
                <Text style={s.blockSub}>
                  {d.institution as string}
                  {d.gpa ? ` · GPA ${d.gpa}` : ""}
                </Text>
              </View>
              {(start || end) && (
                <Text style={s.blockDate}>
                  {start}
                  {end ? ` – ${end}` : ""}
                </Text>
              )}
            </View>
            {d.desc && <Text style={s.blockDesc}>{d.desc as string}</Text>}
          </View>
        )
      })}
    </View>
  )
}

function PdfSkills({ section }: { section: Section }) {
  const layout = (section.data.layout as string) || "tags"
  return (
    <View style={s.sectionWrap}>
      <Text style={s.sectionTitle}>
        {(section.data.sectionTitle as string) || "Skills"}
      </Text>
      {section.blocks.map((block) => {
        const items = ((block.data.items as string) || "")
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
        return (
          <View key={block.id} style={{ marginBottom: 5 }}>
            {block.data.category && (
              <Text style={s.skillCategory}>
                {block.data.category as string}
              </Text>
            )}
            {layout === "tags" ? (
              <View style={s.tagsRow}>
                {items.map((item) => (
                  <Text key={item} style={s.tag}>
                    {item}
                  </Text>
                ))}
              </View>
            ) : (
              <Text style={s.blockSub}>{items.join(" · ")}</Text>
            )}
          </View>
        )
      })}
    </View>
  )
}

function PdfProjects({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Text style={s.sectionTitle}>
        {(section.data.sectionTitle as string) || "Projects"}
      </Text>
      {section.blocks.map((block) => {
        const d = block.data
        return (
          <View key={block.id} style={s.blockWrap}>
            <View style={s.blockRow}>
              <Text style={s.blockTitle}>{d.name as string}</Text>
              {d.url && (
                <Text style={[s.blockDate, { color: "#2563eb" }]}>
                  {d.url as string}
                </Text>
              )}
            </View>
            {d.stack && <Text style={s.blockSub}>{d.stack as string}</Text>}
            {d.desc && <Text style={s.blockDesc}>{d.desc as string}</Text>}
          </View>
        )
      })}
    </View>
  )
}

function PdfLanguages({ section }: { section: Section }) {
  return (
    <View style={s.sectionWrap}>
      <Text style={s.sectionTitle}>
        {(section.data.sectionTitle as string) || "Languages"}
      </Text>
      <View style={s.langRow}>
        {section.blocks.map((block) => (
          <View key={block.id} style={s.langItem}>
            <Text style={s.langName}>{block.data.language as string}</Text>
            <Text style={s.langLevel}>{block.data.proficiency as string}</Text>
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

export function ModernPdfDocument({ sections }: { sections: Section[] }) {
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
