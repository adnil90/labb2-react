import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "../hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("persists and rehydrates", async () => {
    const { result } = renderHook(() => useLocalStorage<number>("x", 1));
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);

    await waitFor(() => {
      expect(localStorage.getItem("x")).toBe("2"); // JSON.stringify(2) === "2"
    });

    const { result: result2 } = renderHook(() =>
      useLocalStorage<number>("x", 0),
    );
    expect(result2.current[0]).toBe(2);
  });
});
