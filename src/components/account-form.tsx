"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { saveAccount } from "@/app/account/actions";
import { GENDERS, type HouseProfile } from "@/lib/house";

const fieldClass =
  "min-h-12 rounded-2xl border border-bone/15 bg-ink px-4 text-bone outline-none transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]";
const labelClass = "text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim";

function KeepButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-3 rounded-full bg-bone py-2 pl-5 pr-2 text-sm text-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:opacity-60"
    >
      <span>{pending ? "Keeping" : "Keep these"}</span>
      <span
        className="grid size-8 place-items-center rounded-full bg-ink/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
        aria-hidden="true"
      >
        →
      </span>
    </button>
  );
}

export function AccountForm({
  profile,
  email,
  kept,
}: {
  profile: HouseProfile;
  email: string;
  kept?: boolean;
}) {
  const [gender, setGender] = useState(profile.gender);

  return (
    <form action={saveAccount} className="space-y-6">
      {kept ? (
        <p className="text-sm text-clay" role="status">
          Kept.
        </p>
      ) : null}

      <p className="text-sm leading-relaxed text-bone-dim">
        Signed in as {email}. Birthday and gender stay on this house. They are
        not sent to Stripe or Printful. You can leave them blank.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="givenName" className={labelClass}>
            Given name
          </label>
          <input
            id="givenName"
            name="givenName"
            autoComplete="given-name"
            defaultValue={profile.givenName}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="familyName" className={labelClass}>
            Family name
          </label>
          <input
            id="familyName"
            name="familyName"
            autoComplete="family-name"
            defaultValue={profile.familyName}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={profile.phone}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="birthday" className={labelClass}>
            Birthday
          </label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            autoComplete="bday"
            defaultValue={profile.birthday}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className={labelClass}>
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            className={fieldClass}
          >
            {GENDERS.map((entry) => (
              <option key={entry.value || "blank"} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {gender === "self-describe" ? (
        <div className="flex flex-col gap-2">
          <label htmlFor="genderSelf" className={labelClass}>
            Your words
          </label>
          <input
            id="genderSelf"
            name="genderSelf"
            defaultValue={profile.genderSelf}
            className={fieldClass}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="addressLine1" className={labelClass}>
          Address
        </label>
        <input
          id="addressLine1"
          name="addressLine1"
          autoComplete="address-line1"
          defaultValue={profile.addressLine1}
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="addressLine2" className="sr-only">
          Address line two
        </label>
        <input
          id="addressLine2"
          name="addressLine2"
          autoComplete="address-line2"
          defaultValue={profile.addressLine2}
          placeholder="Flat, floor, if you need it"
          className={`${fieldClass} placeholder:text-bone-dim/70`}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            defaultValue={profile.city}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="region" className={labelClass}>
            County
          </label>
          <input
            id="region"
            name="region"
            autoComplete="address-level1"
            defaultValue={profile.region}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="postalCode" className={labelClass}>
            Postcode
          </label>
          <input
            id="postalCode"
            name="postalCode"
            autoComplete="postal-code"
            defaultValue={profile.postalCode}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <select
            id="country"
            name="country"
            defaultValue={profile.country === "IE" ? "IE" : "GB"}
            autoComplete="country"
            className={fieldClass}
          >
            <option value="GB">United Kingdom</option>
            <option value="IE">Ireland</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <KeepButton />
        <SignOutButton>
          <button
            type="button"
            className="text-sm text-bone-dim underline underline-offset-4 hover:text-bone"
          >
            Leave
          </button>
        </SignOutButton>
      </div>
    </form>
  );
}
