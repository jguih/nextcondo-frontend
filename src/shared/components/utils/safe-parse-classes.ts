export const safeParseClasses = (
  classes: Array<string | undefined | null>
): string => {
  return (
    classes
      .filter((c) => typeof c === "string")
      .join(" ")
      .trim() + " "
  );
};
