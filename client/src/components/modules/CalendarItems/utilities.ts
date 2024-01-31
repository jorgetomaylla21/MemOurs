import JournalEntry from "../../../../../shared/JournalEntry";

export function groupEntriesByDate(entries: JournalEntry[]): Map<string, JournalEntry[]> {
  return entries.reduce((map, entry) => {
    const { dateMentioned } = entry;
    const dateString = new Date(dateMentioned).toLocaleDateString();
    map.set(dateString, [...(map.get(dateString) ?? []), entry]);
    return map;
  }, new Map<string, JournalEntry[]>());
}
