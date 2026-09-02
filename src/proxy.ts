import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

let runClerk: ReturnType<typeof clerkMiddleware> | null | undefined;

function getClerk() {
  if (runClerk !== undefined) return runClerk;
  if (
    !process.env.CLERK_SECRET_KEY ||
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ) {
    runClerk = null;
    return null;
  }
  runClerk = clerkMiddleware({
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
  });
  return runClerk;
}

export default async function proxy(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const clerk = getClerk();
  if (!clerk) return NextResponse.next();

  const response = await clerk(request, event);
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
    if (
      key === "x-middleware-rewrite" ||
      key === "x-middleware-override-headers"
    ) {
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
