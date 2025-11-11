import { describe, it, expect } from "vitest";
import { calculateTotalAmount } from "./calculateTotalAmount";

describe("calculateTotalAmount", () => {
  it("should return 0 for empty string", () => {
    expect(calculateTotalAmount("")).toBe(0);
  });

  it("should handle simple comma-separated values", () => {
    expect(calculateTotalAmount("10,20,30")).toBe(60);
  });

  it("should handle newline-separated values", () => {
    expect(calculateTotalAmount("10\n20\n30")).toBe(60);
  });

  it("should handle mixed commas and newlines", () => {
    expect(calculateTotalAmount("10, 20\n30,40\n50")).toBe(150);
  });

  it("should ignore invalid entries (like text or symbols)", () => {
    expect(calculateTotalAmount("10, abc, 20, $, 30")).toBe(60);
  });

  it("should trim spaces around numbers", () => {
    expect(calculateTotalAmount("  5 , 10 ,   15 ")).toBe(30);
  });

  it("should handle decimal numbers", () => {
    expect(calculateTotalAmount("10.5, 20.25, 30.25")).toBeCloseTo(61);
  });

  it("should handle negative numbers correctly", () => {
    expect(calculateTotalAmount("10, -5, 20, -10")).toBe(15);
  });

  it("should handle complex combination of commas, spaces, newlines and invalid text", () => {
    const input = `
      10, 20
      30, abc, 40
      -5, , 50.5
      test
      100
    `;
    expect(calculateTotalAmount(input)).toBeCloseTo(245.5);
  });

  it("should return 0 if all values are invalid", () => {
    expect(calculateTotalAmount("abc, xyz, test, --")).toBe(0);
  });
});
