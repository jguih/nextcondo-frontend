import { User } from "@/src/data/schemas/users";
import { joinUrlAndEndpoint } from "@/src/data/utils";
import { http, HttpResponse } from "msw";

export const getHandlers = (url: string) => {
  return [
    http.post(joinUrlAndEndpoint(url, "/Auth/login"), () => {
      return HttpResponse.json({ status: "Ok" });
    }),
    http.get(joinUrlAndEndpoint(url, "/Users/me"), () => {
      return HttpResponse.json({
        id: "1",
        email: "test@test.com",
        role: { name: "Tenant" },
      } as User);
    }),
  ];
};
