export async function fetchExchangesApi() {
  const res = await fetch('https://api.coincap.io/v2/exchanges');
  if (!res.data) {
    throw new Error("Err")
  }
  return res.data
}

