/** @jest-environment jsdom */
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { ActionAddOccurrenceAsync } from "@/src/features/page/occurrences/actions";
import { Form } from "@/src/features/page/occurrences/add/components/form/client";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { FC } from "react";

jest.mock("next/navigation");

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

const actionAddMock = jest.fn();

const TestForm: FC = () => {
  const message = useAppSnackbar((state) => state.message);
  const shouldMount = useAppSnackbar((state) => state.shouldMount);
  return (
    <Form addOccurrenceAsync={actionAddMock}>
      <button type="submit">submit</button>
      {shouldMount && <h1>{message.text}</h1>}
      {shouldMount && <h1>{message.level}</h1>}
    </Form>
  );
};

describe("Add occurrence form tests", () => {
  it("shows snack and redirect on success", async () => {
    // Arrange
    const user = userEvent.setup();
    const occurrenceId = "123";
    const fetchResult: Awaited<ReturnType<typeof ActionAddOccurrenceAsync>> = {
      result: {
        success: true,
        hasData: true,
        method: "POST",
        response: { statusCode: 200, data: { id: occurrenceId } },
        url: process.env.NEXTCONDO_BACKEND_URL!,
      },
      message: "created occurrence",
    };
    actionAddMock.mockReturnValue(fetchResult);
    render(<TestForm />);

    // Act
    const submit = screen.getByRole("button", { name: /submit/i });
    await user.click(submit);

    // Assert
    expect(pushMock).toHaveBeenCalledWith(`/occurrences/${occurrenceId}`);
    expect(actionAddMock).toHaveBeenCalled();
    screen.getByRole("heading", { name: /created occurrence/i });
    screen.getByRole("heading", { name: /success/i }); // Message level
  });

  it("shows error snack on failure", async () => {
    // Arrange
    const user = userEvent.setup();
    const fetchResult: Awaited<ReturnType<typeof ActionAddOccurrenceAsync>> = {
      result: {
        success: false,
        method: "POST",
        response: { statusCode: 401 },
        url: process.env.NEXTCONDO_BACKEND_URL!,
      },
      message: "failed",
    };
    actionAddMock.mockReturnValue(fetchResult);
    render(<TestForm />);

    // Act
    const submit = screen.getByRole("button", { name: /submit/i });
    await user.click(submit);

    // Assert
    expect(actionAddMock).toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
    screen.getByRole("heading", { name: /failed/i });
    screen.getByRole("heading", { name: /error/i }); // Message level
  });
});
