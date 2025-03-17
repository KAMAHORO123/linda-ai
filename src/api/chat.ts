// This is where you'll define information about yourself
const PERSONAL_INFO = {
    name: "KAMAHORO Linda Kellia",
    profession: "Student at Rwanda Coding Academy",
    interests: [
      "Cybersecurity",
      "Artificial Intelligence",
      "Software Development",
      "Network Optimization",
      "Machine Learning",
      "Embedded Systems",
      "Ethical Hacking",
      "Mathematics"
    ],
    skills: [
      "Java",
      "Python",
      "Next.js (TypeScript & Tailwind)",
      "PostgreSQL & MySQL",
      "Linux (Kali Linux)",
      "Docker",
      "Gradio & Hugging Face AI",
      "Framer Motion & React",
      "Shell Scripting",
      "CTF Challenges & Reverse Engineering"
    ],
    experience: [
      {
        role: "Hackathon Participant",
        company: "RISA & UN Women",
        duration: "October 2024",
        description: "Participated in the Gender and Family Sector Digital Innovation Challenge with a mentorship-driven approach."
      },
      {
        role: "CTF Competitor",
        company: "Cybersecurity Competitions",
        duration: "Ongoing",
        description: "Engaged in Capture The Flag (CTF) competitions focused on web security, system exploitation, and ethical hacking."
      },
      {
        role: "Network Performance Researcher",
        company: "Rwanda Coding Academy",
        duration: "September 2024 - Present",
        description: "Developing an action plan to improve network efficiency through software-based optimizations and bandwidth management."
      },
      {
        role: "AI & Web Developer",
        company: "Independent Projects",
        duration: "Ongoing",
        description: "Working on AI-powered applications including an AI-driven car, document grading AI, and automation tools for efficiency."
      },
      {
        role: "Embedded Systems Innovator",
        company: "Personal Projects",
        duration: "Ongoing",
        description: "Building AI-driven embedded systems with reinforcement learning, CNNs, and ultrasonic sensor-based obstacle avoidance."
      }
    ],
    education: [
      {
        degree: "High School Diploma (Software Engineering & Embedded Systems)",
        institution: "Rwanda Coding Academy",
        year: "2023 - 2026"
      }
    ],
    achievements: [
      "Top 20 in the National Math Olympiad",
      "Top 30 in the Countrywide Math Olympiad",
      "Certificate Winner at the RCA Hackathon 2024",
      "Co-founder of RCA iLead Foundation – Supporting students with tuition fees and school materials",
      "Lead Developer of a Package Installer to optimize bandwidth usage at RCA"
    ],
    projects: [
      {
        name: "AI-Driven Car",
        description: "Developing an autonomous car with real-time obstacle detection using CNNs and path planning via reinforcement learning."
      },
      {
        name: "Automated Document Grading AI",
        description: "Building an AI that grades student assignments based on handwriting and content analysis."
      },
      {
        name: "Remote Server Automation via SSH",
        description: "Creating a tool for automating network research tasks anonymously through SSH remote control."
      },
      {
        name: "Book App (React & Framer Motion)",
        description: "Developing a smooth, animated UI for a book management application."
      },
      {
        name: "Network Optimization Plan for RCA",
        description: "Drafting solutions to improve RCA's network performance by reducing congestion and improving bandwidth allocation."
      }
    ],
    hobbies: [
      "Solving CTF challenges",
      "Reading tech blogs and research papers",
      "Watching AI and cybersecurity documentaries",
      "Listening to music",
      "Exploring new programming languages",
      "Engaging in deep discussions about AI ethics and innovation"
    ],
    personal_life: {
      dating: "Not currently dating, focused on career and education",
      fasting_practice: "Recently fasted for a week for personal and spiritual reasons"
    },
    additional_info: {
      current_username: "linuxsec",
      preferred_code_editor: "VS Code",
      preferred_operating_systems: ["Linux (Kali Linux)", "Windows"],
      database_experience: ["PostgreSQL", "MySQL (javadb, java_assignment)"],
      past_travel_experience: "South Korea for Global Innovation Race 2024",
      personal_mission: "Bridging the gap between technology and accessibility in education.",
      future_goals: [
        "Build AI models that help automate education and grading",
        "Enhance network security in underprivileged communities",
        "Create more AI-driven solutions for accessibility and inclusion"
      ]
    }
  };
  
  export async function handleChat(message: string) {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, personalInfo: PERSONAL_INFO }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }
  
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to process chat request');
    }
  }