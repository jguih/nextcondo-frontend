import { getInitials } from "@/src/components/avatar/get-initials";

describe("getInitials", () => {
  it("returns '--' when name is empty string", () => {
    // Arrange
    const name = "";

    // Act
    const initials = getInitials(name);

    // Assert
    expect(initials).toBe("--");
  });

  it("returns initials from single name", () => {
    // Arrange
    const name = "Charlie";

    // Act
    const initials = getInitials(name);

    // Assert
    expect(initials).toBe("CH");
  });

  it("returns initials from composed name", () => {
    // Arrange
    const name = "Charlie Spring";

    // Act
    const initials = getInitials(name);

    // Assert
    expect(initials).toBe("CS");
  });
});
