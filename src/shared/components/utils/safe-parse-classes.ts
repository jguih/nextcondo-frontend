export const safeParseClasses = (
  classes: Array<string | undefined | null>
): string => {
  return classes
    .filter((c) => {
      if (typeof c === "string") return c.trim();
    })
    .join(" ")
    .trim();
};
