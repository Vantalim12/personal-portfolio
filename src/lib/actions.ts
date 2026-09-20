"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const contactFromEmail = process.env.RESEND_FROM_EMAIL;
const CONTACT_RATE_LIMIT = 5;
const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000;
const contactAttempts = new Map<string, { count: number; resetAt: number }>();

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

async function getClientKey() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown"
  );
}

function isContactRateLimited(key: string) {
  const now = Date.now();

  if (contactAttempts.size > 1000) {
    contactAttempts.forEach((entry, entryKey) => {
      if (entry.resetAt <= now) {
        contactAttempts.delete(entryKey);
      }
    });
  }

  const current = contactAttempts.get(key);

  if (!current || current.resetAt <= now) {
    contactAttempts.set(key, {
      count: 1,
      resetAt: now + CONTACT_RATE_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  return current.count > CONTACT_RATE_LIMIT;
}

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  if (!resend || !contactFromEmail) {
    return { error: "Contact form is not configured." };
  }

  if (isContactRateLimited(await getClientKey())) {
    return { error: "Too many messages. Please try again later." };
  }

  try {
    const { name, email, message } = result.data;
    const { data, error } = await resend.emails.send({
      from: `jasperswe <${contactFromEmail}>`,
      to: "jaspergumoraa@gmail.com",
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
      // react: ContactFormEmail({ name, email, message }),
    });

    if (!data || error) {
      console.error(error?.message);
      return { error: "Failed to send email." };
    }

    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error(message);
    return { error: "Failed to send email." };
  }
}
