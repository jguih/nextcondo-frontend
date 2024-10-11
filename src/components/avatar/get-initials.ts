/**
 * Get the initials from a user's name.
 * @param name User's name.
 * @returns Initials string.
 */
export const getInitials = (name: string): string => {
  if (name === "") {
    return "--";
  }

  let initials = name
    .split(" ")
    .map((s) => s.slice(0, 1))
    .join("");

  if (initials.length > 1) {
    return initials.slice(0, 2);
  }

  if (name.length > 1) {
    initials = `${initials}${name.slice(1, 2)}`;
  } else {
    initials = `${initials}-`;
  }

  return initials.toUpperCase();
};
