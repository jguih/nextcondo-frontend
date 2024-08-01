import { render } from "@testing-library/react";
import { Toggler } from "./toggler";
import { Button } from "@mui/joy";

describe("Toggler", () => {
  it("renders", () => {
    render(
      <Toggler
        renderToggle={({ open, setOpen }) => (
          <Button onClick={() => setOpen(!open)}>Open</Button>
        )}
      >
        <div></div>
      </Toggler>
    );
  });
});
