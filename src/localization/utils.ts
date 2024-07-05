export const format = (
  entry: string,
  props: Record<string, string | number>
): string => {
  let newEntry = entry;
  for (var prop in props) {
    newEntry = newEntry.replace(
      new RegExp("{{ " + prop + " }}", "g"),
      String(props[prop])
    );
  }
  return newEntry;
};
