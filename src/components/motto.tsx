import { MonogramMark } from "@/components/brand";

export function Motto({
  className = "",
  mark = false,
}: {
  className?: string;
  mark?: boolean;
}) {
  return (
    <span className={`relative isolate inline-block ${className}`.trim()}>
      {mark ? <MonogramMark /> : null}
      <span className="relative z-10">
        <span className="only-dark">See dark.</span>
        <span className="only-light">See light.</span>
      </span>
    </span>
  );
}
