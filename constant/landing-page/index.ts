export const features = [
  {
    id: "multi-template",
    emoji: "🎨",
    iconName: "LayoutTemplate",
    title: "Multi Template",
    tagline: "Modern, ATS Friendly.",
    description: "Ganti kapan saja, data tetap aman.",
    hoverColor:
      "hover:border-purple-500 hover:shadow-purple-500/10 dark:hover:shadow-purple-400/5",
    iconColor: "text-purple-500",
    bgIconColor: "bg-purple-500/10",
  },
  {
    id: "live-preview",
    emoji: "⚡",
    iconName: "Zap",
    title: "Live Preview",
    tagline: "",
    description: "Langsung keliatan hasilnya. Tidak perlu klik Save dulu.",
    hoverColor:
      "hover:border-amber-500 hover:shadow-amber-500/10 dark:hover:shadow-amber-400/5",
    iconColor: "text-amber-500",
    bgIconColor: "bg-amber-500/10",
  },
  {
    id: "export-bebas",
    emoji: "📄",
    iconName: "Download",
    title: "Bebas Export",
    tagline: "PDF, gambar, HTML, JSON.",
    description: "Tidak ada yang dikunci di balik paywall.",
    hoverColor:
      "hover:border-blue-500 hover:shadow-blue-500/10 dark:hover:shadow-blue-400/5",
    iconColor: "text-blue-500",
    bgIconColor: "bg-blue-500/10",
  },
  {
    id: "undo-redo",
    emoji: "🔁",
    iconName: "Undo2",
    title: "Undo / Redo",
    tagline: "Salah ketik? Ctrl+Z. Sudah.",
    description:
      "Kemudahan penuh dalam menyunting tanpa takut kehilangan progres.",
    hoverColor:
      "hover:border-emerald-500 hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/5",
    iconColor: "text-emerald-500",
    bgIconColor: "bg-emerald-500/10",
  },
  {
    id: "privacy-focused",
    emoji: "🔒",
    iconName: "ShieldCheck",
    title: "Berjalan 100% di Browsermu",
    tagline: "",
    description:
      "Tidak ada data yang pergi ke mana-mana. Servernya tidak tahu kamu ada.",
    hoverColor:
      "hover:border-red-500 hover:shadow-red-500/10 dark:hover:shadow-red-400/5",
    iconColor: "text-red-500",
    bgIconColor: "bg-red-500/10",
  },
  {
    id: "save-resume",
    emoji: "💾",
    iconName: "Save",
    title: "Simpan & Lanjutkan",
    tagline: "Export JSON, buka lagi kapan saja.",
    description: "Gratis juga.",
    hoverColor:
      "hover:border-cyan-500 hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/5",
    iconColor: "text-cyan-500",
    bgIconColor: "bg-cyan-500/10",
  },
]

export type FeatureType = (typeof features)[0]
