import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AppSidebar } from "./app-sidebar";
import userEvent from "@testing-library/user-event";

describe("<AppSidebar />", () => {
  it("is not rendered by default", async () => {
    render(<AppSidebar title="NextCondo" />);

    const sidebar = screen.queryByTestId("appsidebar");
    expect(sidebar).toBeNull();
  });

  it("closes on backdrop click", async () => {
    const sidebarId = "appsidebar";
    render(
      <>
        <AppSidebar title="NextCondo" />
        <button data-sidebarid={sidebarId}>Open</button>
      </>
    );

    await userEvent.click(screen.getByText(/open/i));
    expect(screen.getByTestId(sidebarId)).toBeInTheDocument();
    expect(screen.getByText(/NextCondo/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(/backdrop/i));
    await waitForElementToBeRemoved(() => screen.getByText(/NextCondo/i));
  });

  it("closes on close button click", async () => {
    const sidebarId = "appsidebar";
    render(
      <>
        <AppSidebar title="NextCondo" />
        <button data-sidebarid={sidebarId}>Open</button>
      </>
    );

    await userEvent.click(screen.getByText(/open/i));
    expect(screen.getByTestId(sidebarId)).toBeInTheDocument();
    expect(screen.getByText(/NextCondo/i)).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText(/close sidebar/i));
    await waitForElementToBeRemoved(() => screen.getByText(/NextCondo/i));
  });
});
