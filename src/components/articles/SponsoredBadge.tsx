export function SponsoredBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block bg-gold text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${className}`}
    >
      Sponsored
    </span>
  );
}
