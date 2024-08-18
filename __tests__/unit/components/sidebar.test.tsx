/** @jest-environment jsdom */
import { useSidebar } from "@/src/shared/components/sidebar/hooks/useSidebar";
import { Sidebar } from "@/src/shared/components/sidebar/sidebar";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, Fragment } from "react";

const sidebarId = "test-sidebar";
const mockHandleOnUnmount = jest.fn();
const TestSidebar: FC = () => {
  const { register } = useSidebar({ id: sidebarId });
  return (
    <Fragment>
      <Sidebar
        {...register}
        data-testid={sidebarId}
        onUnMount={() => {
          mockHandleOnUnmount();
          register.onUnMount();
        }}
      >
        <h1>Testing</h1>
      </Sidebar>
      <button data-sidebarid={sidebarId}>Open</button>
    </Fragment>
  );
};

describe("<AppSidebar />", () => {
  it("is not rendered by default", async () => {
    // Arrange
    render(<TestSidebar />);

    // Assert
    expect(screen.queryByTestId(sidebarId)).not.toBeInTheDocument();
  });

  it("opens", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<TestSidebar />);

    // Act
    await user.click(screen.getByRole("button", { name: /open/i }));

    // Assert
    expect(
      screen.getByRole("heading", { name: /Testing/i })
    ).toBeInTheDocument();
  });

  it("requests to be closed on animation end event", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<TestSidebar />);

    // Act
    await user.click(screen.getByText(/open/i));
    /**
     * Trying to close it by user actions doesn't work.
     * JSDOM does not support onAnimationEnd.
     */
    fireEvent.animationEnd(screen.getByTestId(sidebarId));

    // Assert
    expect(
      screen.getByRole("heading", { name: /Testing/i })
    ).toBeInTheDocument();
    expect(mockHandleOnUnmount).toHaveBeenCalled();
  });
});
