export const ACCENT_PAIRS = [
  ["bg-[#1f3b53]/10", "text-[#1f3b53]"],
  ["bg-[#7f5b34]/10", "text-[#7f5b34]"],
  ["bg-[#506d83]/10", "text-[#506d83]"],
  ["bg-[#8b6f47]/10", "text-[#8b6f47]"],
  ["bg-[#3d5a6e]/10", "text-[#3d5a6e]"],
] as const;

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getAccent(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return ACCENT_PAIRS[Math.abs(hash) % ACCENT_PAIRS.length];
}
