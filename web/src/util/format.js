import { parseISO, format } from "date-fns";

export const formatNumber = (value) => {
  if (!value) {
    return "R$ 0,00";
  }
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const parseStringMoneyToDouble = (value) => {
  if (!value) {
    return 0.0;
  }

  return value.split(".").join("").replace(",", ".");
};

export const formatAmericanToBrazillianDate = (input) => {
  return format(parseISO(input), "dd/MM/yyyy");
};
export const formatAmericanToBrazillianDateAndTime = (input) => {
  if (!input) {
    return "00/00/0000";
  }
  return format(parseISO(input), "dd/MM/yyyy HH:mm:ss");
};
export const formatBrazillianToAmericanDate = (input) => {
  let parsedValue = parse(input);
  return format(parsedValue, "yyyy-MM-dd");
};

function parse(str) {
  const [date, month, year] = str.split("/").map((n) => parseInt(n));
  return new Date(year, month - 1, date);
}
