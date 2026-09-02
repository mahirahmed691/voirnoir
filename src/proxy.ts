import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const runClerk = clerkMiddleware({
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
});

export default async function proxy(
  request: Parameters<typeof runClerk>[0],
  event: Parameters<typeof runClerk>[1],
) {
  const response = await runClerk(request, event);
  if (!response) return NextResponse.next();
  const rewrite = response.headers.get("x-middleware-rewrite");
  if (!rewrite) return response;

  try {
    const destination = new URL(rewrite);
    if (destination.origin !== request.nextUrl.origin) return response;
  } catch {
    return response;
  }

  const next = NextResponse.next({ request });
  response.headers.forEach((value, key) => {
    if (key === "x-middleware-rewrite" || key === "x-middleware-override-headers") {
      return;
    }
    next.headers.append(key, value);
  });
  return next;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
