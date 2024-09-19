/** @jest-environment jsdom */
import { Sidebar } from "@/src/components/sidebar/sidebar";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, Fragment, useState } from "react";

const sidebarId = "test-sidebar";
const mockHandleOnUnmount = jest.fn();
const TestSidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);
  const open = () => {
    setIsOpen(true);
    setShouldMount(true);
  };
  const close = () => setIsOpen(false);
  const unmount = () => setShouldMount(false);
  return (
    <Fragment>
      <Sidebar
        isOpen={isOpen}
        onClose={close}
        shouldMount={shouldMount}
        onUnMount={() => {
          mockHandleOnUnmount();
          unmount();
        }}
        data-testid={sidebarId}
      >
        <h1>Testing</h1>
      </Sidebar>
      <button data-sidebarid={sidebarId} onClick={open}>
        Open
      </button>
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
    expect(mockHandleOnUnmount).toHaveBeenCalled();
  });
});
