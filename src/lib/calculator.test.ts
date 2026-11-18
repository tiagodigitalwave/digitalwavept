import { describe, it, expect } from "vitest";
import { calculate, formatEuro, formatContribution, parseNum } from "./calculator";

describe("calculadora", () => {
  it.each([
    [3, 3000, 6, 9000, 18000, 36000, 216000, 16.7],
    [2, 2500, 4, 5000, 10000, 20000, 120000, 16.7],
    [5, 2000, 2, 10000, 4000, 40000, 48000, 83.3],
  ])("calcula as cinco fases para %s em 10, %s euros e %s clientes", (close, value, clients, tenMeetings, monthlyGoal, fourMonths, yearGoal, contribution) => {
    const result = calculate(close, value, clients);
    expect(result).toMatchObject({ tenMeetings, monthlyGoal, fourMonths, yearGoal });
    expect(Number(result.contribution?.toFixed(1))).toBe(contribution);
  });
  it("agrupa os milhares de forma consistente", () => {
    expect(formatEuro(9000, "pt-PT")).toBe("9 000 €");
    expect(formatEuro(18000, "pt-PT")).toBe("18 000 €");
  });
  it("formata a contribuição em ambos os idiomas", () => {
    expect(formatContribution(100 / 6, "pt-PT")).toBe("16,7 %");
    expect(formatContribution(100 / 6, "en-GB")).toBe("16.7%");
  });
  it("limita a contribuição a 100 por cento", () => {
    expect(calculate(10, 2000, 1).contribution).toBe(100);
  });
  it("não divide por zero quando não há objetivo anual", () => {
    expect(calculate(3, 3000, 0).contribution).toBeNull();
    expect(calculate(3, 0, 6).contribution).toBeNull();
  });
  it("um campo vazio não é um número válido", () => {
    expect(parseNum("")).toBeNull();
  });
  it("aceita vírgula decimal", () => {
    expect(parseNum("2,5")).toBe(2.5);
    expect(parseNum("2.500")).toBe(2500);
  });
});
