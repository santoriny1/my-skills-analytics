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
  },
  {
    id: "33",
    name: "Benjamin Lee",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "US",
    certifications: []
  },
  {
    id: "34",
    name: "Maria Hernandez",
    seniority: "Mid",
    skills: [".NET", "Azure", "React"],
    industries: ["Fintech", "Healthcare"],
    region: "LATAM",
    certifications: ["Azure Developer"]
  },
  {
    id: "35",
    name: "Viktor Petrov",
    seniority: "Senior",
    skills: ["DevOps", "AWS", "Node.js", "AI/ML"],
    industries: ["Logistics", "Fintech"],
    region: "EU",
    certifications: ["AWS DevOps Professional", "Kubernetes"]
  },
  {
    id: "36",
    name: "Lily Zhang",
    seniority: "Mid",
    skills: ["Data Science", "AI/ML", "Azure"],
    industries: ["Healthcare", "Retail"],
    region: "US",
    certifications: ["Azure Data Scientist"]
  },
  {
    id: "37",
    name: "Jorge Ramirez",
    seniority: "Junior",
    skills: [".NET", "React"],
    industries: ["Retail"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "38",
    name: "Sophie Dubois",
    seniority: "Senior",
    skills: [".NET", "Azure", "DevOps", "Data Science"],
    industries: ["Fintech", "Healthcare"],
    region: "EU",
    certifications: ["Azure Solutions Architect", "Microsoft Certified"]
  },
  {
    id: "39",
    name: "Ryan Murphy",
    seniority: "Mid",
    skills: ["React", "Node.js", "AWS"],
    industries: ["Retail", "Logistics"],
    region: "US",
    certifications: ["AWS Developer"]
  },
  {
    id: "40",
    name: "Valentina Rossi",
    seniority: "Senior",
    skills: ["AI/ML", "Data Science", "Azure"],
    industries: ["Healthcare", "Fintech"],
    region: "EU",
    certifications: ["Azure AI Engineer", "Data Science Professional"]
  },
  {
    id: "41",
    name: "Diego Vargas",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "42",
    name: "Mei Lin",
    seniority: "Mid",
    skills: [".NET", "Azure", "DevOps"],
    industries: ["Fintech"],
    region: "US",
    certifications: ["Azure DevOps Expert"]
  },
  {
    id: "43",
    name: "Oscar Nilsson",
    seniority: "Senior",
    skills: ["DevOps", "AWS", "Node.js"],
    industries: ["Logistics", "Healthcare"],
    region: "EU",
    certifications: ["AWS DevOps Professional", "Kubernetes Certified"]
  },
  {
    id: "44",
    name: "Patricia Sanchez",
    seniority: "Mid",
    skills: ["React", "AWS", "Data Science"],
    industries: ["Retail", "Fintech"],
    region: "LATAM",
    certifications: ["AWS Solutions Architect"]
  },
  {
    id: "45",
    name: "William Thompson",
    seniority: "Junior",
    skills: [".NET", "React"],
    industries: ["Healthcare"],
    region: "US",
    certifications: []
  },
  {
    id: "46",
    name: "Anastasia Popov",
    seniority: "Senior",
    skills: [".NET", "Azure", "AI/ML", "DevOps"],
    industries: ["Fintech", "Healthcare"],
    region: "EU",
    certifications: ["Azure Solutions Architect", "Azure AI Engineer"]
  },
  {
    id: "47",
    name: "Fernando Lopez",
    seniority: "Mid",
    skills: ["Node.js", "AWS", "React"],
    industries: ["Retail", "Logistics"],
    region: "LATAM",
    certifications: ["AWS Developer"]
  },
  {
    id: "48",
    name: "Grace Kim",
    seniority: "Senior",
    skills: ["Data Science", "AI/ML", "Azure"],
    industries: ["Healthcare", "Fintech"],
    region: "US",
    certifications: ["Azure Data Engineer", "Data Science Expert"]
  },
  {
    id: "49",
    name: "Nikolai Ivanov",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "EU",
    certifications: []
  },
  {
    id: "50",
    name: "Carmen Diaz",
    seniority: "Mid",
    skills: [".NET", "Azure", "React"],
    industries: ["Fintech", "Healthcare"],
    region: "LATAM",
    certifications: ["Microsoft Certified Developer"]
  },
  {
    id: "51",
    name: "Jack Wilson",
    seniority: "Senior",
    skills: ["DevOps", "AWS", ".NET"],
    industries: ["Logistics", "Fintech"],
    region: "US",
    certifications: ["AWS DevOps Professional", "Microsoft Certified"]
  },
  {
    id: "52",
    name: "Isabella Ferrari",
    seniority: "Mid",
    skills: ["React", "Node.js", "AWS"],
    industries: ["Retail", "Fintech"],
    region: "EU",
    certifications: ["AWS Developer"]
  },
  {
    id: "53",
    name: "Mateo Garcia",
    seniority: "Junior",
    skills: [".NET", "Azure"],
    industries: ["Healthcare"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "54",
    name: "Olivia Chen",
    seniority: "Senior",
    skills: ["AI/ML", "Data Science", "Azure", ".NET"],
    industries: ["Healthcare", "Fintech"],
    region: "US",
    certifications: ["Azure AI Engineer", "Microsoft Certified"]
  },
  {
    id: "55",
    name: "Pierre Martin",
    seniority: "Mid",
    skills: ["DevOps", "Azure", "Node.js"],
    industries: ["Logistics", "Retail"],
    region: "EU",
    certifications: ["Azure DevOps Expert"]
  },
  {
    id: "56",
    name: "Ana Paula Silva",
    seniority: "Senior",
    skills: [".NET", "Azure", "DevOps", "React"],
    industries: ["Fintech", "Healthcare"],
    region: "LATAM",
    certifications: ["Azure Solutions Architect", "DevOps Expert"]
  },
  {
    id: "57",
    name: "Noah Davis",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "US",
    certifications: []
  },
  {
    id: "58",
    name: "Ekaterina Sokolov",
    seniority: "Mid",
    skills: ["Data Science", "AI/ML", "AWS"],
    industries: ["Healthcare", "Logistics"],
    region: "EU",
    certifications: ["AWS Machine Learning"]
  },
  {
    id: "59",
    name: "Rafael Torres",
    seniority: "Senior",
    skills: [".NET", "Azure", "Data Science"],
    industries: ["Fintech", "Healthcare"],
    region: "LATAM",
    certifications: ["Azure Data Engineer", "Microsoft Certified"]
  },
  {
    id: "60",
    name: "Emma Martinez",
    seniority: "Mid",
    skills: ["React", "AWS", "DevOps"],
    industries: ["Retail", "Fintech"],
    region: "US",
    certifications: ["AWS DevOps"]
  },
  {
    id: "61",
    name: "Andreas Wagner",
    seniority: "Junior",
    skills: [".NET", "React"],
    industries: ["Retail"],
    region: "EU",
    certifications: []
  },
  {
    id: "62",
    name: "Lucia Morales",
    seniority: "Senior",
    skills: ["AI/ML", "Data Science", "Azure"],
    industries: ["Healthcare", "Fintech"],
    region: "LATAM",
    certifications: ["Azure AI Engineer", "Data Science Professional"]
  },
  {
    id: "63",
    name: "Ethan Brown",
    seniority: "Mid",
    skills: ["Node.js", "AWS", "React"],
    industries: ["Logistics", "Retail"],
    region: "US",
    certifications: ["AWS Solutions Architect"]
  },
  {
    id: "64",
    name: "Freya Andersen",
    seniority: "Senior",
    skills: ["DevOps", "Azure", ".NET"],
    industries: ["Fintech", "Logistics"],
    region: "EU",
    certifications: ["Azure DevOps Expert", "Kubernetes Certified"]
  },
  {
    id: "65",
    name: "Santiago Rivera",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "66",
    name: "Zoe Wang",
    seniority: "Mid",
    skills: [".NET", "Azure", "AI/ML"],
    industries: ["Healthcare", "Fintech"],
    region: "US",
    certifications: ["Azure AI Engineer"]
  },
  {
    id: "67",
    name: "Luca Bianchi",
    seniority: "Senior",
    skills: [".NET", "Azure", "DevOps", "Data Science"],
    industries: ["Healthcare", "Fintech"],
    region: "EU",
    certifications: ["Azure Solutions Architect", "Microsoft Certified"]
  },
  {
    id: "68",
    name: "Valentina Perez",
    seniority: "Mid",
    skills: ["React", "Node.js", "AWS"],
    industries: ["Retail", "Fintech"],
    region: "LATAM",
    certifications: ["AWS Developer"]
  },
  {
    id: "69",
    name: "Mason Garcia",
    seniority: "Junior",
    skills: [".NET", "React"],
    industries: ["Healthcare"],
    region: "US",
    certifications: []
  },
  {
    id: "70",
    name: "Nadia Kovalenko",
    seniority: "Senior",
    skills: ["Data Science", "AI/ML", "Azure"],
    industries: ["Healthcare", "Fintech"],
    region: "EU",
    certifications: ["Azure Data Engineer", "Data Science Expert"]
  },
  {
    id: "71",
    name: "Pablo Castillo",
    seniority: "Mid",
    skills: ["DevOps", "AWS", "Node.js"],
    industries: ["Logistics", "Retail"],
    region: "LATAM",
    certifications: ["AWS DevOps Professional"]
  },
  {
    id: "72",
    name: "Chloe Martin",
    seniority: "Senior",
    skills: [".NET", "Azure", "React", "DevOps"],
    industries: ["Fintech", "Healthcare"],
    region: "US",
    certifications: ["Azure Solutions Architect", "DevOps Expert"]
  },
  {
    id: "73",
    name: "Dimitri Volkov",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "EU",
    certifications: []
  },
  {
    id: "74",
    name: "Daniela Ortiz",
    seniority: "Mid",
    skills: [".NET", "Azure", "Data Science"],
    industries: ["Healthcare", "Fintech"],
    region: "LATAM",
    certifications: ["Azure Data Scientist"]
  },
  {
    id: "75",
    name: "Liam Anderson",
    seniority: "Senior",
    skills: ["AI/ML", "Data Science", "AWS"],
    industries: ["Healthcare", "Fintech"],
    region: "US",
    certifications: ["AWS Machine Learning", "Data Science Professional"]
  },
  {
    id: "76",
    name: "Elsa Johansson",
    seniority: "Mid",
    skills: ["React", "AWS", "DevOps"],
    industries: ["Retail", "Logistics"],
    region: "EU",
    certifications: ["AWS DevOps"]
  },
  {
    id: "77",
    name: "Javier Reyes",
    seniority: "Junior",
    skills: [".NET", "React"],
    industries: ["Retail"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "78",
    name: "Ava Taylor",
    seniority: "Senior",
    skills: [".NET", "Azure", "DevOps", "AI/ML"],
    industries: ["Fintech", "Healthcare"],
    region: "US",
    certifications: ["Azure Solutions Architect", "Azure AI Engineer"]
  },
  {
    id: "79",
    name: "Francois Leroy",
    seniority: "Mid",
    skills: ["Node.js", "AWS", "React"],
    industries: ["Retail", "Fintech"],
    region: "EU",
    certifications: ["AWS Developer"]
  },
  {
    id: "80",
    name: "Mariana Santos",
    seniority: "Senior",
    skills: ["Data Science", "AI/ML", "Azure"],
    industries: ["Healthcare", "Fintech"],
    region: "LATAM",
    certifications: ["Azure Data Engineer", "Data Science Expert"]
  },
  {
    id: "81",
    name: "Jackson White",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "US",
    certifications: []
  },
  {
    id: "82",
    name: "Klara Novotny",
    seniority: "Mid",
    skills: [".NET", "Azure", "DevOps"],
    industries: ["Fintech", "Healthcare"],
    region: "EU",
    certifications: ["Azure DevOps Expert"]
  },
  {
    id: "83",
    name: "Alejandro Fernandez",
    seniority: "Senior",
    skills: ["DevOps", "AWS", ".NET"],
    industries: ["Logistics", "Healthcare"],
    region: "LATAM",
    certifications: ["AWS DevOps Professional", "Microsoft Certified"]
  },
  {
    id: "84",
    name: "Sophia Lee",
    seniority: "Mid",
    skills: ["React", "Node.js", "AWS"],
    industries: ["Retail", "Fintech"],
    region: "US",
    certifications: ["AWS Developer"]
  },
  {
    id: "85",
    name: "Matteo Conti",
    seniority: "Junior",
    skills: [".NET", "React"],
    industries: ["Healthcare"],
    region: "EU",
    certifications: []
  },
  {
    id: "86",
    name: "Catalina Mendoza",
    seniority: "Senior",
    skills: ["AI/ML", "Data Science", "Azure", ".NET"],
    industries: ["Healthcare", "Fintech"],
    region: "LATAM",
    certifications: ["Azure AI Engineer", "Data Science Professional"]
  },
  {
    id: "87",
    name: "Lucas Brown",
    seniority: "Mid",
    skills: ["DevOps", "Azure", "Node.js"],
    industries: ["Logistics", "Retail"],
    region: "US",
    certifications: ["Azure DevOps Expert"]
  },
  {
    id: "88",
    name: "Nina Kuznetsova",
    seniority: "Senior",
    skills: [".NET", "Azure", "Data Science"],
    industries: ["Fintech", "Healthcare"],
    region: "EU",
    certifications: ["Azure Solutions Architect", "Azure Data Engineer"]
  },
  {
    id: "89",
    name: "Gabriel Ramos",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "LATAM",
    certifications: []
  },
  {
    id: "90",
    name: "Hannah Wilson",
    seniority: "Mid",
    skills: ["React", "AWS", "Data Science"],
    industries: ["Healthcare", "Retail"],
    region: "US",
    certifications: ["AWS Solutions Architect"]
  },
  {
    id: "91",
    name: "Otto Fischer",
    seniority: "Senior",
    skills: ["DevOps", "AWS", "Node.js", "AI/ML"],
    industries: ["Logistics", "Fintech"],
    region: "EU",
    certifications: ["AWS DevOps Professional", "Kubernetes Certified"]
  },
  {
    id: "92",
    name: "Laura Gonzalez",
    seniority: "Mid",
    skills: [".NET", "Azure", "React"],
    industries: ["Fintech", "Healthcare"],
    region: "LATAM",
    certifications: ["Microsoft Certified Developer"]
  },
  {
    id: "93",
    name: "Logan Martinez",
    seniority: "Junior",
    skills: [".NET", "React"],
    industries: ["Retail"],
    region: "US",
    certifications: []
  },
  {
    id: "94",
    name: "Petra Hoffman",
    seniority: "Senior",
    skills: ["AI/ML", "Data Science", "Azure"],
    industries: ["Healthcare", "Fintech"],
    region: "EU",
    certifications: ["Azure AI Engineer", "Data Science Expert"]
  },
  {
    id: "95",
    name: "Felipe Castro",
    seniority: "Mid",
    skills: ["Node.js", "AWS", "DevOps"],
    industries: ["Logistics", "Retail"],
    region: "LATAM",
    certifications: ["AWS DevOps"]
  },
  {
    id: "96",
    name: "Mia Johnson",
    seniority: "Senior",
    skills: [".NET", "Azure", "DevOps", "Data Science"],
    industries: ["Fintech", "Healthcare"],
    region: "US",
    certifications: ["Azure Solutions Architect", "Azure Data Engineer"]
  },
  {
    id: "97",
    name: "Sergei Korolev",
    seniority: "Junior",
    skills: ["React", "Node.js"],
    industries: ["Retail"],
    region: "EU",
    certifications: []
  },
  {
    id: "98",
    name: "Beatriz Moreno",
    seniority: "Mid",
    skills: ["React", "AWS", "Data Science"],
    industries: ["Healthcare", "Fintech"],
    region: "LATAM",
    certifications: ["AWS Machine Learning"]
  },
  {
    id: "99",
    name: "Tyler Harris",
    seniority: "Senior",
    skills: ["DevOps", "Azure", ".NET"],
    industries: ["Logistics", "Healthcare"],
    region: "US",
    certifications: ["Azure DevOps Expert", "Kubernetes Certified"]
  },
  {
    id: "100",
    name: "Amelie Bernard",
    seniority: "Mid",
    skills: [".NET", "Azure", "AI/ML"],
    industries: ["Fintech", "Healthcare"],
    region: "EU",
    certifications: ["Azure AI Engineer"]
  }
];
