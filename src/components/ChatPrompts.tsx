import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

interface ChatPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const allPrompts = [
  "Tell me about Jas's experience",
  "What projects has Jas worked on?",
  "What technologies does Jas use?",
  "What is Jas's current role?",
  "Tell me about Jas's skills",
  "What companies has Jas worked at?",

  // Portfolio & career
  "What is Jas currently working on?",
  "What kind of developer is Jas?",
  "What problems does Jas like solving?",
  "What areas is Jas strongest in?",
  "What is Jas focusing on learning now?",

  // Projects & blog
  "Which project best represents Jas's work?",
  "What was the motivation behind Jas's projects?",
  "What technical challenges has Jas written about?",
  "What tools or frameworks does Jas frequently mention?",
  "What has Jas built outside of work?",

  // Engineering approach
  "How does Jas approach system design?",
  "What does Jas care about in clean architecture?",
  "How does Jas balance speed vs correctness?",
  "What engineering principles does Jas follow?",
  "What tradeoffs does Jas often discuss?",

  // Practical / conversational
  "What can you help me with?",
  "Where should I start if I want to explore Jas's work?",
  "What should I read to understand Jas's thinking?",
  "Is Jas more backend or frontend focused?",
  "How can I contact Jas?"
];

function getRandomPrompts(prompts: string[], count: number): string[] {
  const shuffled = [...prompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function ChatPrompts({ onPromptClick }: ChatPromptsProps) {
  const [randomPrompts, setRandomPrompts] = useState<string[]>([]);

  useEffect(() => {
    setRandomPrompts(getRandomPrompts(allPrompts, 3));
  }, []);

  return (
    <div className="mt-2 flex w-full max-w-[200px] flex-col gap-1.5 sm:mt-3 sm:max-w-[250px] sm:gap-2">
      <p className="text-center text-xs text-muted-foreground">Try asking:</p>
      <div className="flex flex-col gap-1 sm:gap-1.5">
        {randomPrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => onPromptClick(prompt)}
            className="h-auto min-h-[32px] w-full justify-start whitespace-normal break-words px-2 py-1.5 text-left text-xs leading-normal sm:min-h-[36px] sm:px-3 sm:py-2"
          >
            <span className="line-clamp-2">{prompt}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
