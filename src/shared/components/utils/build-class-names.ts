export const buildClassNames = (
  classes: Record<string, boolean>,
  ...staticClasses: Array<string | undefined | null>
) => {
  const newClasses: string[] = Object.entries(classes)
    .filter((obj) => {
      const [, value] = obj;
      return value;
    })
    .map((obj) => obj[0].trim());

  staticClasses
    .filter((c) => typeof c === "string")
    .forEach((c) => newClasses.push(c));

  return newClasses.join(" ").trim();
};
