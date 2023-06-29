
  // add comma (,) to the price numbers
export function formatNumber(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}