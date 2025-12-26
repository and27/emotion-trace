// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SensationChoice } from "./SensationChoice";

describe("SensationChoice", () => {
  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();

    render(
      <SensationChoice label="Heat" selected={false} onSelect={onSelect} />
    );

    fireEvent.click(screen.getByRole("button", { name: /heat/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});