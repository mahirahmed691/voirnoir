"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileFromForm, saveProfile } from "@/lib/house";

export async function saveAccount(formData: FormData) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    "";
  const profile = profileFromForm(userId, email, formData);

  await saveProfile(profile);

  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      firstName: profile.givenName || undefined,
      lastName: profile.familyName || undefined,
    });
  } catch (error) {
    console.error("Clerk name update failed", error);
  }

  revalidatePath("/account");
  redirect("/account?kept=1");
}
