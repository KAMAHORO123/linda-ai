import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Verify API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is not set in environment variables");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This is where you'll define information about yourself
const PERSONAL_INFO = {
  name: "Linda",
  profession: "AI Assistant",
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Natural Language Processing",
    "Web Development",
    "User Experience Design",
  ],
  skills: [
    "ChatGPT",
    "React",
    "TypeScript",
    "Node.js",
    "API Development",
    "Problem Solving",
    "Communication",
  ],
  experience: [
    {
      role: "AI Assistant",
      company: "Personal AI Assistant",
      duration: "Present",
      description:
        "Providing intelligent responses and assistance to users through natural language processing",
    },
  ],
  education: [
    {
      degree: "AI and Machine Learning",
      institution: "OpenAI",
      year: "2024",
    },
  ],
};

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant representing ${PERSONAL_INFO.name}. 
          You have access to the following information about them:
          - Profession: ${PERSONAL_INFO.profession}
          - Interests: ${PERSONAL_INFO.interests.join(", ")}
          - Skills: ${PERSONAL_INFO.skills.join(", ")}
          - Experience: ${JSON.stringify(PERSONAL_INFO.experience)}
          - Education: ${JSON.stringify(PERSONAL_INFO.education)}
          
          Please answer questions about ${
            PERSONAL_INFO.name
          } based on this information.
          Be friendly and professional in your responses.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);

    // Handle API quota exceeded error
    if (error.code === "insufficient_quota") {
      const fallbackResponse = `I apologize, but I'm currently experiencing some technical limitations. 
      Here's what I can tell you about ${
        PERSONAL_INFO.name
      } based on my stored information:
      
      - Profession: ${PERSONAL_INFO.profession}
      - Interests: ${PERSONAL_INFO.interests.join(", ")}
      - Skills: ${PERSONAL_INFO.skills.join(", ")}
      
      Experience:
      ${PERSONAL_INFO.experience
        .map(
          (exp) =>
            `- ${exp.role} at ${exp.company} (${exp.duration}): ${exp.description}`
        )
        .join("\n")}
      
      Education:
      ${PERSONAL_INFO.education
        .map((edu) => `- ${edu.degree} from ${edu.institution} (${edu.year})`)
        .join("\n")}
      
      Please try again later for more detailed responses.`;

      return res.json({ response: fallbackResponse });
    }

    // Handle other errors
    res.status(500).json({
      error: "Failed to process chat request",
      response:
        "I apologize, but I'm having trouble processing your request right now. Please try again later.",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    "OpenAI API Key loaded:",
    process.env.OPENAI_API_KEY ? "Yes" : "No"
  );
});
