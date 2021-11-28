export async function fetchRatesApi() {
  const response = await fetch(`https://api.coincap.io/v2/rates`);
  const result = response.json()
  if (!response.ok) throw Error(response.json())
  return result
}
