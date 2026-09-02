export function Motto({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span className="only-dark">See dark.</span>
      <span className="only-light">See light.</span>
    </span>
  );
}
