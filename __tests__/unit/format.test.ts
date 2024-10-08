import { format } from "@/src/features/localization/utils";

describe("format", () => {
  it("replaces variables on a string", () => {
    const text =
      "I have {{ orangesCount }} oranges. I will give them to {{ peopleCount }} people tomorrow at {{ time }}.";
    const formatted = format(text, {
      orangesCount: 28,
      peopleCount: 12,
      time: "12pm",
    });
    expect(formatted).toBe(
      "I have 28 oranges. I will give them to 12 people tomorrow at 12pm."
    );
  });
});
