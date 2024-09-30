import { http, HttpResponse } from "msw";
import { joinUrlAndEndpoint } from "@/src/lib/fetchClient/utils";
import occurrences from "@/src/test/mocks/nextcondoapi/occurrences/get.json";
import occurrencesTypes from "@/src/test/mocks/nextcondoapi/occurrences/get-types.json";

export const handlers = [
  http.post(
    joinUrlAndEndpoint(process.env.NEXTCONDO_BACKEND_URL!, "/Auth/login"),
    () => {
      return HttpResponse.json({ status: "Ok" });
    }
  ),

  http.get(
    joinUrlAndEndpoint(process.env.NEXTCONDO_BACKEND_URL!, "/Occurrences"),
    () => {
      return HttpResponse.json(occurrences, {
        status: 200,
      });
    }
  ),

  http.get(
    joinUrlAndEndpoint(
      process.env.NEXTCONDO_BACKEND_URL!,
      "/Occurrences/types"
    ),
    () => {
      return HttpResponse.json(occurrencesTypes, {
        status: 200,
      });
    }
  ),
];
