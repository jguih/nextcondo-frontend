import { FAKE_API } from "@/jest.setup";
import { createFetchClient } from "@/src/lib/fetchClient/client";
import { JsonStrategy } from "@/src/lib/fetchClient/strategy";
import { server } from "@/src/test/mocks/node";
import { z } from "zod";

describe("Auth service", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("parses successfull login response", async () => {
    // Arrange
    const client = createFetchClient(FAKE_API);
    const schema = z.object({ status: z.string() });
    const credentials: FormData = new FormData();
    credentials.append("email", "test@test.com");
    credentials.append("password", "12345678");

    // Act
    const result = await client.postAsync({
      endpoint: "/Auth/login",
      strategy: new JsonStrategy(schema),
      body: credentials,
    });
    const { success, response } = result;

    // Assert
    expect(success).toBeTruthy();
    expect(response?.data).toBeTruthy();
    expect(response?.statusCode).toBe(200);
  });
});
