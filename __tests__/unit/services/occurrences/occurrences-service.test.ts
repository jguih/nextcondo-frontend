import { ProblemDetails } from "@/src/lib/fetchClient/schemas/problem-details";
import { joinUrlAndEndpoint } from "@/src/lib/fetchClient/utils";
import { NextCondoOccurrencesService } from "@/src/services/nextcondo/occurrences/server";
import { server } from "@/src/test/mocks/node";
import { http, HttpResponse } from "msw";

describe("OccurrencesService", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("get occurrences | parses problem details on 404 response", async () => {
    // Arrange
    server.use(
      http.get(
        joinUrlAndEndpoint(process.env.NEXTCONDO_BACKEND_URL!, "/Occurrences"),
        () => {
          const problems: ProblemDetails = {
            status: 404,
            title: "Failed",
            type: "404",
            detail: "Failed beautifully!",
          };
          return HttpResponse.json(problems, {
            status: 404,
            headers: { ["content-type"]: "application/problem+json" },
          });
        }
      )
    );
    const occurrencesService = new NextCondoOccurrencesService();
    jest.spyOn(occurrencesService, "GetCookies").mockReturnValue("");

    // Act
    const result = await occurrencesService.GetAsync();

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.response?.statusCode).toBe(404);
    expect(result.response?.data).toBeTruthy();
  });

  it("get occurrences | parses response body and return data", async () => {
    // Arrange
    const occurrencesService = new NextCondoOccurrencesService();
    jest.spyOn(occurrencesService, "GetCookies").mockReturnValue("");

    // Act
    const result = await occurrencesService.GetAsync();
    const length =
      result.success && result.hasData
        ? result.response.data.length
        : undefined;

    // Assert
    expect(result.success).toBeTruthy();
    expect(result.response?.statusCode).toBe(200);
    expect(length).toBeGreaterThan(0);
  });

  it("get occurrence types | parses response body and return data", async () => {
    // Arrange
    const occurrencesService = new NextCondoOccurrencesService();
    jest.spyOn(occurrencesService, "GetCookies").mockReturnValue("");

    // Act
    const result = await occurrencesService.GetTypesAsync();
    const length =
      result.success && result.hasData
        ? result.response.data.length
        : undefined;

    // Assert
    expect(result.success).toBeTruthy();
    expect(result.response?.statusCode).toBe(200);
    expect(length).toBeGreaterThan(0);
  });
});
