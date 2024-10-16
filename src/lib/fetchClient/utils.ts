/**
 * Safely joins url and endpoint considering any slash position.
 * @param url Server's url.
 * @param endpoint The endpoint.
 * @returns `string` with url and endpoint joined.
 */
export const joinUrlAndEndpoint = (url: string, endpoint?: string) => {
  if (!endpoint) return url;
  const parsedEndpoint = endpoint.startsWith("/")
    ? endpoint.substring(1, endpoint.length)
    : endpoint;
  const parsedApiUrl = url.endsWith("/") ? url : `${url}/`;
  return `${parsedApiUrl}${parsedEndpoint}`;
};

/** Checks if error has a message */
export const errorHasMessage = (
  error: unknown
): error is { message: string } => {
  return error && typeof error === "object" && Object.hasOwn(error, "message")
    ? true
    : false;
};
