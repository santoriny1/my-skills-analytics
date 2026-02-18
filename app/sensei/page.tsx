"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data structure based on the provided tech matrix
interface TechMetric {
  userId: string;
  technologyId: string;
  earnedPoints: number;
  progress: number;
  technology: {
    id: string;
    name: string;
    points: number;
    iconUrl: string;
  };
}

interface TechStack {
  id: string;
  name: string;
  progress: number;
  technologies: Array<{
    id: string;
    name: string;
    points: number;
    iconUrl: string;
    techMetrics: TechMetric[];
  }>;
}

interface TechProfile {
  id: string;
  name: string;
  points: number;
  progress: number;
  techStacks: TechStack[];
}

interface CoworkerProfile {
  userId: string;
  name: string;
  avatar: string;
  role: string;
  seniority: "Junior" | "Mid" | "Senior";
  totalPoints: number;
  overallProgress: number;
  techProfile: TechProfile;
  topSkills: string[];
  expertise: Array<{
    skill: string;
    level: number;
    progress: number;
  }>;
}

// Mock coworker data based on the tech matrix structure
const mockCoworkers: CoworkerProfile[] = [
  {
    userId: "81dac04a-ac45-4c10-976f-7e7f3424ef45",
    name: "David Vargas",
    avatar: "DV",
    role: ".NET Full Stack Developer",
    seniority: "Senior",
    totalPoints: 1016,
    overallProgress: 27,
    techProfile: {
      id: "ad15081a-0b60-4b01-847f-20868c129ace",
      name: ".NET Full Stack Developer",
      points: 1016,
      progress: 27,
      techStacks: [
        {
          id: "js-frameworks",
          name: "JavaScript Frameworks",
          progress: 54,
          technologies: [
            {
              id: "angular",
              name: "Angular",
              points: 91,
              iconUrl: "/tech/angular.png",
              techMetrics: [{ userId: "81dac04a-ac45-4c10-976f-7e7f3424ef45", technologyId: "angular", earnedPoints: 71, progress: 78, technology: { id: "angular", name: "Angular", points: 91, iconUrl: "/tech/angular.png" } }]
            },
            {
              id: "angularjs",
              name: "AngularJS",
              points: 51,
              iconUrl: "/tech/angularjs.png",
              techMetrics: [{ userId: "81dac04a-ac45-4c10-976f-7e7f3424ef45", technologyId: "angularjs", earnedPoints: 43, progress: 84, technology: { id: "angularjs", name: "AngularJS", points: 51, iconUrl: "/tech/angularjs.png" } }]
            },
            {
              id: "vue",
              name: "Vue",
              points: 35,
              iconUrl: "/tech/vue.png",
              techMetrics: [{ userId: "81dac04a-ac45-4c10-976f-7e7f3424ef45", technologyId: "vue", earnedPoints: 35, progress: 100, technology: { id: "vue", name: "Vue", points: 35, iconUrl: "/tech/vue.png" } }]
            },
            {
              id: "bootstrap",
              name: "Bootstrap",
              points: 30,
              iconUrl: "/tech/bootstrap.png",
              techMetrics: [{ userId: "81dac04a-ac45-4c10-976f-7e7f3424ef45", technologyId: "bootstrap", earnedPoints: 30, progress: 100, technology: { id: "bootstrap", name: "Bootstrap", points: 30, iconUrl: "/tech/bootstrap.png" } }]
            }
          ]
        }
      ]
    },
    topSkills: ["Angular", "AngularJS", "Vue", "Bootstrap"],
    expertise: [
      { skill: "Angular", level: 78, progress: 78 },
      { skill: "AngularJS", level: 84, progress: 84 },
      { skill: "Vue", level: 100, progress: 100 },
      { skill: "Bootstrap", level: 100, progress: 100 }
    ]
  },
  {
    userId: "user-2",
    name: "Karol Piñón",
    avatar: "KP",
    role: "React Developer",
    seniority: "Mid",
    totalPoints: 845,
    overallProgress: 68,
    techProfile: {
      id: "react-profile",
      name: "React Developer",
      points: 845,
      progress: 68,
      techStacks: []
    },
    topSkills: ["React", "Node.js", "TypeScript", "GraphQL"],
    expertise: [
      { skill: "React", level: 92, progress: 92 },
      { skill: "Node.js", level: 87, progress: 87 },
      { skill: "TypeScript", level: 75, progress: 75 },
      { skill: "GraphQL", level: 65, progress: 65 }
    ]
  },
  {
    userId: "user-3",
    name: "Inge Zavala",
    avatar: "IZ",
    role: "DevOps Engineer",
    seniority: "Senior",
    totalPoints: 1200,
    overallProgress: 85,
    techProfile: {
      id: "devops-profile",
      name: "DevOps Engineer",
      points: 1200,
      progress: 85,
      techStacks: []
    },
    topSkills: ["Docker", "Kubernetes", "AWS", "Terraform"],
    expertise: [
      { skill: "Docker", level: 95, progress: 95 },
      { skill: "Kubernetes", level: 88, progress: 88 },
      { skill: "AWS", level: 90, progress: 90 },
      { skill: "Terraform", level: 82, progress: 82 }
    ]
  },
  {
    userId: "user-4",
    name: "Pablo Estrada",
    avatar: "PE",
    role: "Python Developer",
    seniority: "Mid",
    totalPoints: 720,
    overallProgress: 45,
    techProfile: {
      id: "python-profile",
      name: "Python Developer",
      points: 720,
      progress: 45,
      techStacks: []
    },
    topSkills: ["Python", "Django", "PostgreSQL", "Redis"],
    expertise: [
      { skill: "Python", level: 85, progress: 85 },
      { skill: "Django", level: 70, progress: 70 },
      { skill: "PostgreSQL", level: 60, progress: 60 },
      { skill: "Redis", level: 55, progress: 55 }
    ]
  },
  {
    userId: "user-5",
    name: "Fernando Cardoso",
    avatar: "FC",
    role: "Full Stack Developer",
    seniority: "Junior",
    totalPoints: 450,
    overallProgress: 35,
    techProfile: {
      id: "fullstack-profile",
      name: "Full Stack Developer",
      points: 450,
      progress: 35,
      techStacks: []
    },
    topSkills: ["JavaScript", "HTML/CSS", "MongoDB", "Express"],
    expertise: [
      { skill: "JavaScript", level: 65, progress: 65 },
      { skill: "HTML/CSS", level: 80, progress: 80 },
      { skill: "MongoDB", level: 45, progress: 45 },
      { skill: "Express", level: 50, progress: 50 }
    ]
  }
];

function getProgressColor(progress: number): string {
  if (progress >= 80) return "bg-green-500";
  if (progress >= 60) return "bg-blue-500";
  if (progress >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

function getSeniorityColor(seniority: string): string {
  switch (seniority) {
    case "Senior": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
    case "Mid": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    case "Junior": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  }
}

// Notification Component
interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

function Notification({ message, type, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const icon = type === 'success' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ) : type === 'error' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="fixed bottom-4 right-4 z-[70] animate-in slide-in-from-right duration-300">
      <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm`}>
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium whitespace-pre-line">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function SenseiCreatiPage() {
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [selectedSeniority, setSelectedSeniority] = useState<string>("All");
  const [selectedCoworker, setSelectedCoworker] = useState<CoworkerProfile | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestingCoworker, setRequestingCoworker] = useState<CoworkerProfile | null>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Get unique skills for filter
  const availableSkills = useMemo(() => {
    const skills = new Set<string>();
    mockCoworkers.forEach(coworker => {
      coworker.topSkills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, []);

  // Filter coworkers based on selected filters
  const filteredCoworkers = useMemo(() => {
    return mockCoworkers.filter(coworker => {
      const skillMatch = selectedSkill === "All" || coworker.topSkills.includes(selectedSkill);
      const seniorityMatch = selectedSeniority === "All" || coworker.seniority === selectedSeniority;
      return skillMatch && seniorityMatch;
    });
  }, [selectedSkill, selectedSeniority]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  const openRequestModal = (coworker: CoworkerProfile) => {
    setRequestingCoworker(coworker);
    setRequestMessage("");
    setShowRequestModal(true);
  };

  const closeRequestModal = () => {
    setShowRequestModal(false);
    setRequestingCoworker(null);
    setRequestMessage("");
  };

  const submitRequest = () => {
    if (!requestingCoworker || !requestMessage.trim()) {
      showNotification("Please write a message explaining why you'd like them as your sensei.", 'error');
      return;
    }
    
    showNotification(`Request sent to ${requestingCoworker.name}! 🎓\n\nThey'll be notified via email.`, 'success');
    closeRequestModal();
    setSelectedCoworker(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Sensei - Creati
        </h1>
        <p className="text-muted-foreground mt-1">
          Find the perfect mentor from your team to accelerate your learning
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Filter by skill:</label>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Skills</SelectItem>
                {availableSkills.map(skill => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Filter by seniority:</label>
            <Select value={selectedSeniority} onValueChange={setSelectedSeniority}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select seniority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Coworkers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoworkers.map((coworker) => (
          <Card key={coworker.userId} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCoworker(coworker)}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                  {coworker.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{coworker.name}</h3>
                  <p className="text-sm text-muted-foreground">{coworker.role}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeniorityColor(coworker.seniority)}`}>
                  {coworker.seniority}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Overall Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Overall Progress</span>
                    <span>{coworker.overallProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(coworker.overallProgress)}`}
                      style={{ width: `${coworker.overallProgress}%` }}
                    />
                  </div>
                </div>

                {/* Top Skills */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Expertise Areas</h4>
                  <div className="flex flex-wrap gap-1">
                    {coworker.topSkills.slice(0, 4).map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skill Progress */}
                <div className="space-y-2">
                  {coworker.expertise.slice(0, 3).map((expertise) => (
                    <div key={expertise.skill}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{expertise.skill}</span>
                        <span>{expertise.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getProgressColor(expertise.level)}`}
                          style={{ width: `${expertise.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openRequestModal(coworker);
                  }}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors text-sm font-medium"
                >
                  Request as Sensei
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCoworkers.length === 0 && (
        <Card className="p-8 text-center rounded-2xl shadow-sm">
          <div className="text-muted-foreground">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8c0 1.081-.213 2.111-.605 3.05M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-medium mb-1">No matches found</h3>
            <p>Try adjusting your filters to find more potential senseis</p>
          </div>
        </Card>
      )}

      {/* Detailed Modal */}
      {selectedCoworker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCoworker(null)}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {selectedCoworker.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{selectedCoworker.name}</h2>
                  <p className="text-muted-foreground">{selectedCoworker.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getSeniorityColor(selectedCoworker.seniority)}`}>
                      {selectedCoworker.seniority} Level
                    </span>
                    <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full">
                      {selectedCoworker.totalPoints} points
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCoworker(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Detailed Skills */}
                <div>
                  <h3 className="font-semibold mb-4">Technical Expertise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCoworker.expertise.map((expertise) => (
                      <div key={expertise.skill} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{expertise.skill}</span>
                          <span className="text-sm text-muted-foreground">{expertise.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(expertise.level)}`}
                            style={{ width: `${expertise.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => openRequestModal(selectedCoworker)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
                  >
                    Request as Sensei
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Request Message Modal */}
      {showRequestModal && requestingCoworker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]" onClick={closeRequestModal}>
          <Card className="max-w-lg w-full rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Request {requestingCoworker.name} as Sensei</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Explain why you'd like them to mentor you
                  </p>
                </div>
                <button 
                  onClick={closeRequestModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sensei Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                    {requestingCoworker.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{requestingCoworker.name}</p>
                    <p className="text-sm text-muted-foreground">{requestingCoworker.role}</p>
                    <div className="flex gap-1 mt-1">
                      {requestingCoworker.topSkills.slice(0, 3).map((skill) => (
                        <span 
                          key={skill}
                          className="px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">Your message</label>
                  <textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Be specific about what you'd like to learn and why you chose them
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={closeRequestModal}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitRequest}
                    disabled={!requestMessage.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
}