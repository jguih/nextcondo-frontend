import {
  ProblemDetails,
  problemDetailsSchema,
} from "@/src/lib/fetchClient/schemas/problem-details";
import { JsonStrategy } from "@/src/lib/fetchClient/json-strategy";
import { JsonStrategyError } from "@/src/lib/fetchClient/json-strategy-error";
import { z } from "zod";

describe("JsonStrategy", () => {
  it("throws when content-type is not json or problem+json", async () => {
    // Arrange
    const response = new Response("", { status: 200 });
    const schema = z.object({});
    const strategy = new JsonStrategy(schema);

    try {
      // Act
      await strategy.handleAsync(response);
    } catch (error) {
      if (error instanceof JsonStrategyError) {
        // Assert
        expect(error.data).toBeFalsy();
        expect(error.statusCode).toBe(response.status);
        return;
      }
    }

    expect(true).toBeFalsy();
  });

  it("throws when content-type is problem+json with invalid response body", async () => {
    // Arrange
    const response = new Response(JSON.stringify({}), {
      status: 404,
      headers: { "content-type": "application/problem+json" },
    });
    const schema = z.object({});
    const strategy = new JsonStrategy(schema);

    try {
      // Act
      await strategy.handleAsync(response);
    } catch (error) {
      if (error instanceof JsonStrategyError) {
        // Assert
        expect(error.data).toBeFalsy();
        expect(error.statusCode).toBe(404);
        return;
      }
    }

    expect(false).toBeTruthy();
  });

  it("throws when content-type is problem+json with valid response body", async () => {
    // Arrange
    const details: ProblemDetails = {
      title: "Something broke",
      detail: "Something is completly broken here",
      status: 500,
      type: "",
    };
    const response = new Response(JSON.stringify(details), {
      status: 500,
      headers: { "content-type": "application/problem+json" },
    });
    const strategy = new JsonStrategy(problemDetailsSchema);

    try {
      // Act
      await strategy.handleAsync(response);
    } catch (error) {
      if (error instanceof JsonStrategyError) {
        // Assert
        expect(error.data).toBeTruthy();
        expect(error.statusCode).toBe(500);
        expect(error.data!.status).toBe(500);
        expect(error.data!.title).toBe(details.title);
        expect(error.data!.detail).toBe(details.detail);
        return;
      }
    }

    expect(false).toBeTruthy();
  });

  it("throws on valid response with invalid body", async () => {
    // Arrange
    const responseBody = {
      name: "Willy Wonka",
      description: "He has an awesome chocolate factory!",
    };
    const response = new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    });
    const strategy = new JsonStrategy(schema);

    try {
      // Act
      await strategy.handleAsync(response);
    } catch (error) {
      if (error instanceof JsonStrategyError) {
        // Assert
        expect(error.data).toBeFalsy();
        expect(error.statusCode).toBe(response.status);
        return;
      }
    }

    expect(false).toBeTruthy();
  });

  it("parses valid json body", async () => {
    // Arrange
    const responseBody = {
      name: "Willy Wonka",
      description: "He has an awesome chocolate factory!",
    };
    const response = new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    const schema = z.object({ name: z.string(), description: z.string() });
    const strategy = new JsonStrategy(schema);

    // Act
    const result = await strategy.handleAsync(response);

    // Assert
    expect(result).toBeTruthy();
    expect(result!.name).toBe(responseBody.name);
    expect(result!.description).toBe(responseBody.description);
  });

  it("parses valid array of json objects", async () => {
    // Arrange
    const responseBody = [
      {
        name: "Willy Wonka",
        description: "He has an awesome chocolate factory!",
      },
    ];
    const response = new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    const schema = z.array(
      z.object({ name: z.string(), description: z.string() })
    );
    const strategy = new JsonStrategy(schema);

    // Act
    const result = await strategy.handleAsync(response);

    // Assert
    expect(result).toBeTruthy();
    expect(result!.length).toBe(1);
    expect(result!.map((r) => r.name).includes("Willy Wonka")).toBeTruthy();
  });

  it("returns undefined when response status is 204 (no content)", async () => {
    // Arrange
    const response = new Response(undefined, {
      status: 204,
    });
    const schema = z.object({});
    const strategy = new JsonStrategy(schema);

    // Act
    const result = await strategy.handleAsync(response);

    // Assert
    expect(result).toBeFalsy();
  });
});
