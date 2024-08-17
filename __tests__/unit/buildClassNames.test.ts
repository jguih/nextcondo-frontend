import { buildClassNames } from "@/src/shared/components/utils/build-class-names";

describe("buildClassNames", () => {
  it("builds class string list considering boolean expressions", () => {
    const classes = buildClassNames({ class1: true, class2: false }, "class3");
    expect(classes).toContain("class1");
    expect(classes).not.toContain("class2");
    expect(classes).toContain("class3");
  });
});
