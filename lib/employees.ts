export interface Employee {
  id: string;
  name: string;
  seniority: "Junior" | "Mid" | "Senior";
  skills: string[];
  industries: string[];
  region: "US" | "LATAM" | "EU";
  certifications: string[];
}

export const employees: Employee[] = [
  {
    id: "1",
    name: "Sarah Chen",
    seniority: "Senior",
    skills: [".NET", "Azure", "DevOps"],
    industries: ["Fintech", "Healthcare"],
    region: "US",
    certifications: ["Azure Solutions Architect", "AWS Certified"]
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    seniority: "Senior",
    skills: ["React", "Node.js", "AWS"],
    industries: ["Retail", "Fintech"],
    region: "LATAM",
    certifications: ["AWS Developer"]
  },
  {
    id: "3",
    name: "Elena Volkov",
    seniority: "Mid",
    skills: ["Data Science", "AI/ML", "Azure"],
    industries: ["Healthcare", "Logistics"],
    region: "EU",
    certifications: ["Azure Data Scientist"]
  },
  {
    id: "4",
    name: "James O'Brien",
    seniority: "Junior",
    skills: ["React", ".NET"],
    industries: ["Retail"],
    region: "US",
    certifications: []
  },
  {
    id: "5",
    name: "Priya Sharma",
    seniority: "Senior",
    skills: [".NET", "Azure", "AI/ML", "DevOps"],
    industries: ["Fintech", "Healthcare"],
    region: "US",
    certifications: ["Azure AI Engineer", "Microsoft Certified"]
  },
  {
    id: "6",
    name: "Lucas Silva",
    seniority: "Mid",
    skills: ["Node.js", "React", "AWS"],
    industries: ["Retail", "Logistics"],
    region: "LATAM",
    certifications: ["AWS Solutions Architect"]
  },
  {
    id: "7",
    name: "Anna Kowalski",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "EU",
    certifications: []
  },
  {
    id: "8",
    name: "David Kim",
    seniority: "Senior",
    skills: ["Data Science", "AI/ML", "Azure"],
    industries: ["Healthcare", "Fintech"],
    region: "US",
    certifications: ["Azure Data Engineer"]
  },
  {
    id: "9",
    name: "Sofia Martinez",
    seniority: "Mid",
    skills: [".NET", "Azure", "React"],
    industries: ["Fintech"],
    region: "LATAM",
    certifications: ["Microsoft Certified Developer"]
  },
  {
    id: "10",
    name: "Thomas Mueller",
    seniority: "Senior",
    skills: ["DevOps", "AWS", "Node.js"],
    industries: ["Logistics", "Retail"],
    region: "EU",
    certifications: ["AWS DevOps Professional", "Kubernetes"]
  },
  {
    id: "11",
    name: "Aisha Patel",
    seniority: "Mid",
    skills: ["React", "Node.js", "AWS"],
    industries: ["Retail", "Fintech"],
    region: "US",
    certifications: ["AWS Developer"]
  },
  {
    id: "12",
    name: "Carlos Mendez",
    seniority: "Junior",
    skills: [".NET", "Azure"],
    industries: ["Healthcare"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "13",
    name: "Ingrid Hansen",
    seniority: "Senior",
    skills: [".NET", "Azure", "DevOps", "AI/ML"],
    industries: ["Healthcare", "Fintech"],
    region: "EU",
    certifications: ["Azure Solutions Architect", "DevOps Expert"]
  },
  {
    id: "14",
    name: "Robert Taylor",
    seniority: "Mid",
    skills: ["Data Science", "Node.js", "AWS"],
    industries: ["Logistics"],
    region: "US",
    certifications: ["AWS Data Analytics"]
  },
  {
    id: "15",
    name: "Gabriela Santos",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "16",
    name: "Yuki Tanaka",
    seniority: "Senior",
    skills: [".NET", "Azure", "Data Science"],
    industries: ["Fintech", "Healthcare"],
    region: "US",
    certifications: ["Azure Data Engineer", "Microsoft Certified"]
  },
  {
    id: "17",
    name: "Miguel Flores",
    seniority: "Mid",
    skills: ["React", "AWS", "DevOps"],
    industries: ["Retail", "Logistics"],
    region: "LATAM",
    certifications: ["AWS DevOps"]
  },
  {
    id: "18",
    name: "Katarina Novak",
    seniority: "Senior",
    skills: ["AI/ML", "Data Science", "Azure"],
    industries: ["Healthcare", "Fintech"],
    region: "EU",
    certifications: ["Azure AI Engineer", "Data Science Professional"]
  },
  {
    id: "19",
    name: "Ahmed Hassan",
    seniority: "Junior",
    skills: [".NET", "React"],
    industries: ["Fintech"],
    region: "EU",
    certifications: []
  },
  {
    id: "20",
    name: "Jennifer Wong",
    seniority: "Mid",
    skills: ["Node.js", "AWS", "React"],
    industries: ["Retail", "Fintech"],
    region: "US",
    certifications: ["AWS Developer"]
  },
  {
    id: "21",
    name: "Ricardo Gomez",
    seniority: "Senior",
    skills: [".NET", "Azure", "DevOps"],
    industries: ["Logistics", "Healthcare"],
    region: "LATAM",
    certifications: ["Azure DevOps Expert", "Microsoft Certified"]
  },
  {
    id: "22",
    name: "Olivia Anderson",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "US",
    certifications: []
  },
  {
    id: "23",
    name: "Hans Schmidt",
    seniority: "Mid",
    skills: ["Data Science", "AI/ML", "AWS"],
    industries: ["Healthcare"],
    region: "EU",
    certifications: ["AWS Machine Learning"]
  },
  {
    id: "24",
    name: "Isabella Costa",
    seniority: "Senior",
    skills: [".NET", "Azure", "React", "DevOps"],
    industries: ["Fintech", "Retail"],
    region: "LATAM",
    certifications: ["Azure Solutions Architect"]
  },
  {
    id: "25",
    name: "Daniel Park",
    seniority: "Mid",
    skills: ["Node.js", "AWS", "DevOps"],
    industries: ["Logistics", "Retail"],
    region: "US",
    certifications: ["AWS Solutions Architect"]
  },
  {
    id: "26",
    name: "Natasha Ivanova",
    seniority: "Junior",
    skills: ["React", ".NET"],
    industries: ["Healthcare"],
    region: "EU",
    certifications: []
  },
  {
    id: "27",
    name: "Antonio Ruiz",
    seniority: "Senior",
    skills: ["Data Science", "AI/ML", "Azure", ".NET"],
    industries: ["Healthcare", "Fintech"],
    region: "LATAM",
    certifications: ["Azure AI Engineer", "Data Science Expert"]
  },
  {
    id: "28",
    name: "Emily Johnson",
    seniority: "Mid",
    skills: ["React", "Node.js", "AWS"],
    industries: ["Retail", "Fintech"],
    region: "US",
    certifications: ["AWS Developer"]
  },
  {
    id: "29",
    name: "Lars Bergstrom",
    seniority: "Senior",
    skills: ["DevOps", "Azure", ".NET"],
    industries: ["Logistics", "Healthcare"],
    region: "EU",
    certifications: ["Azure DevOps Expert", "Kubernetes Certified"]
  },
  {
    id: "30",
    name: "Camila Torres",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "31",
    name: "Alexander Wright",
    seniority: "Mid",
    skills: [".NET", "Azure", "DevOps"],
    industries: ["Fintech", "Healthcare"],
    region: "US",
    certifications: ["Azure Developer"]
  },
  {
    id: "32",
    name: "Fatima Al-Rashid",
    seniority: "Senior",
    skills: ["AI/ML", "Data Science", "AWS"],
    industries: ["Healthcare", "Fintech"],
    region: "EU",
    certifications: ["AWS Machine Learning", "Data Science Professional"]
  }
];
