/**
 * Utility function to build class list dynamically based on boolean values.
 * @param classes `Object` with the class name as `key` and a boolean as `value`. If `value` is `true` the class will be included.
 * @param staticClasses Classes to be included without a condition.
 * @returns `String` containing all classes.
 */
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