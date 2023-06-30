export function stringHasDigit(str: string) {
  return /\d/.test(str);
}

export function convertToCurrency(num: string | number): string {
  const str = num.toString();
  return str.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
