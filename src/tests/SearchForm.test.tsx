import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchForm } from "../components/SearchForm";

describe("SearchForm", () => {
  it("calls onSubmit when submitted", () => {
    const onSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) =>
      e.preventDefault(),
    );
    const onChange = vi.fn();

    render(
      <SearchForm
        value="Stock"
        loading={false}
        onChange={onChange}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("calls onChange when typing", () => {
    const onSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) =>
      e.preventDefault(),
    );
    const onChange = vi.fn();

    render(
      <SearchForm
        value=""
        loading={false}
        onChange={onChange}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("City"), {
      target: { value: "Stockholm" },
    });
    expect(onChange).toHaveBeenCalledWith("Stockholm");
  });
});
