import type { Message } from "ai";

const ABOUT_JASPER =
  /\b(jas(?:per)?|gumora|jasperswe|portfolio|iplan|esihagba|e-?sihag|maxyield|largo|internship|msu-?iit|icnhs|contact (?:jas|him)|his (?:work|projects|stack|skills))\b/i;

const CODE_HELP =
  /\b(for\s*loops?|while\s*loops?|snippet|boilerplate|leetcode|hello world|pseudocode|sample (?:code|snippet)|example (?:code|snippet)|write (?:me )?(?:a |an )?(?:function|class|script|component|hook|loop)|how (?:do|to) (?:i|you) (?:write|code|implement|loop))\b/i;

const GENERAL_ASSISTANT =
  /\b(homework|solve this|weather|news|recipe|translate (?:this|the)|write (?:me )?(?:an? )?(?:essay|email|poem|story|cover letter)|ignore (?:all |the )?(?:previous|prior|above) instructions)\b/i;

const REFUSAL_MESSAGE =
  "I only answer questions about Jasper, his work, and this portfolio — not general coding help or unrelated topics. Ask about his projects, stack, or how to get in touch.";

export function getLastUserMessage(messages: Message[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === "user") {
      return messages[i].content.trim();
    }
  }
  return "";
}

export function isOffTopicQuestion(text: string): boolean {
  if (!text) {
    return true;
  }

  const asksForCode = CODE_HELP.test(text);
  const generalTask = GENERAL_ASSISTANT.test(text);
  const aboutJasper = ABOUT_JASPER.test(text);

  if (asksForCode || generalTask) {
    return true;
  }

  if (aboutJasper) {
    return false;
  }

  return false;
}

export { REFUSAL_MESSAGE };
