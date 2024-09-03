import { useNumberFormatter, useDateFormatter } from "@react-aria/i18n";

export function useCurrencyFormatter() {
  const formatter = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    // minimumFractionDigits: 2,
    minimumFractionDigits: 0,
    // trailingZeroDisplay: "stripIfInteger",
    // roundingPriority: "auto",
  });

  return formatter;
}

export function useAccountingFormatter() {
  const formatter = useNumberFormatter({
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "accounting",
    style: "currency",
    minimumFractionDigits: 2,
  });

  return formatter;
}

export function useDateMediumFormatter() {
  const formatter = useDateFormatter({ dateStyle: "medium" });

  return formatter;
}

export function useDateFullFormatter() {
  const formatter = useDateFormatter({ dateStyle: "full" });

  return formatter;
}
