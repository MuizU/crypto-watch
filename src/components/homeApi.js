export async function fetchAssetsApi() {
  const response = await fetch(`https://api.coincap.io/v2/assets`);
  const result = response.json()
  if (!response.ok) throw Error(response.text())
  return result
}
