import { joinUrlAndEndpoint } from "@/src/data/utils";

describe("joinUrlAndEndpoint", () => {
  it("joins /endpoint with url/", () => {
    const url = "https://myurl.domain/api/";
    const endpoint = "/Endpoint";

    const joined = joinUrlAndEndpoint(url, endpoint);

    expect(joined).toBe("https://myurl.domain/api/Endpoint");
  });

  it("joins endpoint with url", () => {
    const url = "https://myurl.domain/api";
    const endpoint = "Endpoint";

    const joined = joinUrlAndEndpoint(url, endpoint);

    expect(joined).toBe("https://myurl.domain/api/Endpoint");
  });

  it("joins endpoint with url/", () => {
    const url = "https://myurl.domain/api/";
    const endpoint = "Endpoint";

    const joined = joinUrlAndEndpoint(url, endpoint);

    expect(joined).toBe("https://myurl.domain/api/Endpoint");
  });

  it("joins /endpoint with url", () => {
    const url = "https://myurl.domain/api";
    const endpoint = "/Endpoint";

    const joined = joinUrlAndEndpoint(url, endpoint);

    expect(joined).toBe("https://myurl.domain/api/Endpoint");
  });

  it("returns url if endpoint is undefined", () => {
    const url = "https://myurl.domain/api";
    const endpoint = undefined;

    const joined = joinUrlAndEndpoint(url, endpoint);

    expect(joined).toBe("https://myurl.domain/api");
  });
});
