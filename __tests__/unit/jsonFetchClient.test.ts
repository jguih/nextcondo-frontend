import { FAKE_API } from "@/jest.setup";
import { createJsonFetchClient } from "@/src/data/fetchClient/client";
import { server } from "@/src/mocks/node";
import { z } from "zod";

describe("Auth service", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("works", async () => {
    // Arrange
    const client = createJsonFetchClient(FAKE_API);
    const credentials: FormData = new FormData();
    credentials.append("email", "test@test.com");
    credentials.append("password", "12345678");

    // Act
    const { success, data, statusCode } = await client.post({
      endpoint: "/Auth/login",
      schema: z.object({}),
      body: credentials,
    });

    // Assert
    expect(success).toBeTruthy();
    expect(data).toStrictEqual({});
    expect(statusCode).toBe(200);
  });
});
