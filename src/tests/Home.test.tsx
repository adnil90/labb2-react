import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Home from "../pages/Home";

function wrapper(ui: React.ReactElement) {
  const qc = new QueryClient();
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("Home", () => {
  it("renders search form", () => {
    wrapper(<Home />);
    expect(screen.getByLabelText(/city search/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });
});
