import { TemplateDef, SectionDef } from "@/types"

const headerSection: SectionDef = {
  label: "Header",
  icon: "user-circle",
  hasBlock: false,
  settings: [
    {
      key: "name",
      label: "Full name",
      type: "text",
      placeholder: "John Doe",
      default: "",
    },
    {
      key: "title",
      label: "Job title",
      type: "text",
      placeholder: "Frontend Developer",
      default: "",
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
      default: "",
    },
    {
      key: "phone",
      label: "Phone",
      type: "phone",
      placeholder: "+62 812 3456 7890",
      default: "",
    },
    {
      key: "location",
      label: "Location",
      type: "location",
      placeholder: "Yogyakarta, Indonesia",
      default: "",
    },
    {
      key: "website",
      label: "Website/URL",
      type: "url",
      placeholder: "rizkyemha.xyz",
      default: "",
    },
    {
      key: "summary",
      label: "Summary",
      type: "textarea",
      placeholder: "Brief professional summary...",
      default: "",
    },
  ],
  defaultData: {
    name: "Your Name",
    title: "Job Title",
    email: "email@example.com",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
}

const experienceSection: SectionDef = {
  label: "Experience",
  icon: "briefcase",
  hasBlock: true,
  settings: [
    {
      key: "sectionTitle",
      label: "Section title",
      type: "text",
      default: "Work Experience",
    },
  ],
  defaultData: { sectionTitle: "Work Experience" },
  blockDef: {
    settings: [
      {
        key: "company",
        label: "Company",
        type: "text",
        placeholder: "Company name",
        default: "",
      },
      {
        key: "role",
        label: "Role",
        type: "text",
        placeholder: "Job title",
        default: "",
      },
      {
        key: "location",
        label: "Location",
        type: "location",
        placeholder: "City or Remote",
        default: "",
      },
      {
        key: "startDate",
        label: "Start date",
        type: "date",
        placeholder: "2022-01",
        default: "",
      },
      {
        key: "endDate",
        label: "End date",
        type: "date",
        placeholder: "2024-06",
        default: "",
      },
      { key: "current", label: "Current job", type: "toggle", default: false },
      {
        key: "desc",
        label: "Description",
        type: "textarea",
        placeholder: "- Achievement...",
        default: "",
      },
    ],
    defaultData: {
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      desc: "",
    },
    maxBlocks: 10,
  },
  defaultBlocks: [
    {
      id: "exp-1",
      data: {
        company: "Company Name",
        role: "Your Role",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        desc: "",
      },
    },
  ],
}

const educationSection: SectionDef = {
  label: "Education",
  icon: "school",
  hasBlock: true,
  settings: [
    {
      key: "sectionTitle",
      label: "Section title",
      type: "text",
      default: "Education",
    },
  ],
  defaultData: { sectionTitle: "Education" },
  blockDef: {
    settings: [
      {
        key: "institution",
        label: "Institution",
        type: "text",
        placeholder: "University name",
        default: "",
      },
      {
        key: "degree",
        label: "Degree",
        type: "text",
        placeholder: "Bachelor of CS",
        default: "",
      },
      {
        key: "startDate",
        label: "Start date",
        type: "date",
        placeholder: "2018-08",
        default: "",
      },
      {
        key: "endDate",
        label: "End date",
        type: "date",
        placeholder: "2022-07",
        default: "",
      },
      {
        key: "gpa",
        label: "GPA",
        type: "text",
        placeholder: "3.8 / 4.0",
        default: "",
      },
      {
        key: "desc",
        label: "Notes",
        type: "textarea",
        placeholder: "Relevant courses...",
        default: "",
      },
    ],
    defaultData: {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      gpa: "",
      desc: "",
    },
    maxBlocks: 5,
  },
  defaultBlocks: [
    {
      id: "edu-1",
      data: {
        institution: "University Name",
        degree: "Degree",
        startDate: "",
        endDate: "",
        gpa: "",
        desc: "",
      },
    },
  ],
}

const skillsSection: SectionDef = {
  label: "Skills",
  icon: "tool",
  hasBlock: true,
  settings: [
    {
      key: "sectionTitle",
      label: "Section title",
      type: "text",
      default: "Skills",
    },
  ],
  defaultData: { sectionTitle: "Skills" },
  blockDef: {
    settings: [
      {
        key: "category",
        label: "Category",
        type: "text",
        placeholder: "Frontend",
        default: "",
      },
      {
        key: "items",
        label: "Skills",
        type: "textarea",
        placeholder: "React, TypeScript, Tailwind CSS",
        default: "",
      },
    ],
    defaultData: { category: "", items: "" },
    maxBlocks: 10,
  },
  defaultBlocks: [
    {
      id: "skill-1",
      data: { category: "Frontend", items: "React, TypeScript, Tailwind CSS" },
    },
    {
      id: "skill-2",
      data: { category: "Tools", items: "Git, Figma, VS Code" },
    },
  ],
}

const projectsSection: SectionDef = {
  label: "Projects",
  icon: "folder",
  hasBlock: true,
  settings: [
    {
      key: "sectionTitle",
      label: "Section title",
      type: "text",
      default: "Projects",
    },
  ],
  defaultData: { sectionTitle: "Projects" },
  blockDef: {
    settings: [
      {
        key: "name",
        label: "Project name",
        type: "text",
        placeholder: "My App",
        default: "",
      },
      {
        key: "url",
        label: "URL",
        type: "url",
        placeholder: "github.com/user/repo",
        default: "",
      },
      {
        key: "stack",
        label: "Tech stack",
        type: "text",
        placeholder: "Next.js, Prisma",
        default: "",
      },
      {
        key: "desc",
        label: "Description",
        type: "textarea",
        placeholder: "What you built...",
        default: "",
      },
    ],
    defaultData: { name: "", url: "", stack: "", desc: "" },
    maxBlocks: 8,
  },
  defaultBlocks: [],
}

const languagesSection: SectionDef = {
  label: "Languages",
  icon: "language",
  hasBlock: true,
  settings: [
    {
      key: "sectionTitle",
      label: "Section title",
      type: "text",
      default: "Languages",
    },
  ],
  defaultData: { sectionTitle: "Languages" },
  blockDef: {
    settings: [
      {
        key: "language",
        label: "Language",
        type: "text",
        placeholder: "English",
        default: "",
      },
      {
        key: "proficiency",
        label: "Proficiency",
        type: "select",
        options: [
          "Native",
          "Fluent",
          "Professional",
          "Conversational",
          "Basic",
        ],
        default: "Fluent",
      },
    ],
    defaultData: { language: "", proficiency: "Fluent" },
    maxBlocks: 6,
  },
  defaultBlocks: [
    { id: "lang-1", data: { language: "English", proficiency: "Fluent" } },
  ],
}

export const atsTemplate: TemplateDef = {
  id: "ats",
  label: "ATS Friendly",
  sectionTypes: [
    "header",
    "experience",
    "education",
    "skills",
    "projects",
    "languages",
  ],
  sections: {
    header: headerSection,
    experience: experienceSection,
    education: educationSection,
    skills: skillsSection,
    projects: projectsSection,
    languages: languagesSection,
  },
  defaultSections: [
    {
      id: "s-header",
      type: "header",
      label: "Header",
      visible: true,
      data: headerSection.defaultData,
      blocks: [],
    },
    {
      id: "s-experience",
      type: "experience",
      label: "Experience",
      visible: true,
      data: experienceSection.defaultData,
      blocks: experienceSection.defaultBlocks!,
    },
    {
      id: "s-education",
      type: "education",
      label: "Education",
      visible: true,
      data: educationSection.defaultData,
      blocks: educationSection.defaultBlocks!,
    },
    {
      id: "s-skills",
      type: "skills",
      label: "Skills",
      visible: true,
      data: skillsSection.defaultData,
      blocks: skillsSection.defaultBlocks!,
    },
  ],
}
