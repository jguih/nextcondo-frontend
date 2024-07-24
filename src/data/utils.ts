import { RequestInit } from "next/dist/server/web/spec-extension/request";
import "server-only";

export const parseNextCondoApiAddress = (endpoint: string) => {
  if (!process.env.NEXTCONDO_API) {
    throw new Error("PROJECT_SIMPLIFY_API env empty, check .env vars");
  }
  return `${process.env.NEXTCONDO_API}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

export const fetchNextCondoApi = <Body extends object = {}>({
  endpoint,
  token,
  body,
  options,
}: {
  endpoint: string;
  token: string;
  body?: Body;
  options?: RequestInit;
}) => {
  return fetch(parseNextCondoApiAddress(endpoint), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });
};
