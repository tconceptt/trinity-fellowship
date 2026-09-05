/**
 * Ethiopian mobile numbers are stored as +2519XXXXXXXX. Grouped as
 * +251 9X XXX XXXX they read the way people say them aloud; anything in
 * another shape is left untouched rather than guessed at.
 */
export function formatPhone(phone: string) {
  const compact = phone.replace(/[\s-]/g, "");
  const m = compact.match(/^\+251(\d)(\d)(\d{3})(\d{4})$/);
  if (!m) return phone;
  return `+251 ${m[1]}${m[2]} ${m[3]} ${m[4]}`;
}

/**
 * Digits only, with a local leading 0 promoted to the country code so
 * "0942" finds "+251942…" the way a member would expect.
 */
export function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("0") ? `251${digits.slice(1)}` : digits;
}
