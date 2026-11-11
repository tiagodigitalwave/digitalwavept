import { describe, it, expect } from "vitest";
import { calculate, parseNum } from "./calculator";

describe("calculadora", () => {
  it("2 em 10, 2.500€, 4 clientes/mês dá 5.000, 10.000, 20.000, 120.000", () => {
    expect(calculate(2, 2500, 4)).toEqual({ tenMeetings: 5000, monthlyGoal: 10000, fourMonths: 20000, yearGoal: 120000 });
  });
  it("aceita vírgula decimal", () => {
    expect(parseNum("2,5")).toBe(2.5);
    expect(parseNum("2.500")).toBe(2500);
  });
});
