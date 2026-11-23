import { getDb } from "../../../db";
import { inquiries } from "../../../db/schema";

const maxPayloadLength = 8192;

function respond(request: Request, message: string, status: number) {
  const headers = { "Cache-Control": "no-store" };
  if (request.headers.get("accept")?.includes("application/json")) {
    return Response.json({ message }, { status, headers });
  }

  return new Response(
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>CalltheSaul</title><link rel="icon" href="/favicon.svg"><main><h1>CalltheSaul</h1><p>${message}</p><p><a href="/#waitlist">Return to CalltheSaul</a></p></main></html>`,
    { status, headers: { ...headers, "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return respond(request, "Please submit the form from the CalltheSaul page.", 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) {
    return respond(request, "Please submit the form from the CalltheSaul page.", 415);
  }
  if (Number(request.headers.get("content-length")) > maxPayloadLength) {
    return respond(request, "This submission is too long.", 413);
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    return respond(request, "We couldn’t read your submission. Please try again.", 400);
  }
  if (body.length > maxPayloadLength) {
    return respond(request, "This submission is too long.", 413);
  }

  const fields = new URLSearchParams(body);
  const name = fields.get("name")?.trim() ?? "";
  const company = fields.get("company")?.trim() ?? "";
  const email = fields.get("email")?.trim().toLowerCase() ?? "";
  const interest = fields.get("interest");
  if (!name || name.length > 100 || !company || company.length > 120) {
    return respond(request, "Enter your full name and company.", 400);
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond(request, "Enter a valid work email address.", 400);
  }
  if (interest !== "waitlist" && interest !== "investor") {
    return respond(request, "Select early access or investor inquiry.", 400);
  }

  try {
    await getDb()
      .insert(inquiries)
      .values({ email, interest, name, company, submittedAt: new Date().toISOString() })
      .onConflictDoNothing();
  } catch {
    return respond(request, "We couldn’t save your request. Please try again.", 503);
  }

  const message = interest === "investor"
    ? "Thanks. We’ve received your investor inquiry."
    : "You’re on the waitlist. Thanks for signing up.";
  return respond(request, message, 200);
}
