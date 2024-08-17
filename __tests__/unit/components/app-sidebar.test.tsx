/** @jest-environment jsdom */
import { AppSidebar } from "@/src/shared/components/sidebar/app/app-sidebar";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<AppSidebar />", () => {
  it("is not rendered by default", async () => {
    render(<AppSidebar title="NextCondo" />);

    const sidebar = screen.queryByTestId("appsidebar");
    expect(sidebar).toBeNull();
  });

  it("closes on backdrop click", async () => {
    const sidebarId = "appsidebar";
    const user = userEvent.setup();
    render(
      <>
        <AppSidebar title="NextCondo" />
        <button data-sidebarid={sidebarId}>Open</button>
      </>
    );

    await user.click(screen.getByText(/open/i));
    expect(screen.getByTestId(sidebarId)).toBeInTheDocument();
    expect(screen.getByText(/NextCondo/i)).toBeInTheDocument();

    await user.click(screen.getByTestId(/backdrop/i));
    await waitForElementToBeRemoved(() => screen.getByText(/NextCondo/i));
  });

  it("closes on close button click", async () => {
    const sidebarId = "appsidebar";
    const user = userEvent.setup();
    render(
      <>
        <AppSidebar title="NextCondo" />
        <button data-sidebarid={sidebarId}>Open</button>
      </>
    );

    await user.click(screen.getByText(/open/i));
    expect(screen.getByTestId(sidebarId)).toBeInTheDocument();
    expect(screen.getByText(/NextCondo/i)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/close sidebar/i));
    await waitForElementToBeRemoved(() => screen.getByText(/NextCondo/i));
  });
});
