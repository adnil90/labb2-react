import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { GeoResult } from "../lib/openMeteo";
import * as api from "../lib/openMeteo";
import Home from "../pages/Home";

describe("App integration", () => {
  it("searches and shows results, then navigates link", async () => {
    const mockedCities: GeoResult[] = [
      {
        id: 1,
        name: "Stockholm",
        country: "Sweden",
        latitude: 59.33,
        longitude: 18.07,
      },
    ];

    vi.spyOn(api, "searchCities").mockResolvedValue(mockedCities);

    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={["/"]}>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    fireEvent.change(screen.getByLabelText("City"), {
      target: { value: "Stockholm" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() =>
      screen.getByRole("link", { name: /Stockholm, Sweden/i }),
    );

    const link = screen.getByRole<HTMLAnchorElement>("link", {
      name: /Stockholm, Sweden/i,
    });

    expect(link).toHaveAttribute("href", expect.stringContaining("/item/1?"));
  });
});
