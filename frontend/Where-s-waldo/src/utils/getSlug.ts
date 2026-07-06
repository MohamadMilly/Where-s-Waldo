export function getSlug(text: string): string {
  return text
    .toString() // Ensure input is a string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .normalize("NFD") // Split accented characters into baseline characters + diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove all separated diacritical marks (accents)
    .replace(/[^a-z0-9 -]/g, "") // Remove any character that is not a letter, number, space, or hyphen
    .replace(/\s+/g, "-") // Replace one or more spaces with a single hyphen
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end of the text
}
