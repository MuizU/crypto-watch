export async function fetchCoinApi(id) {
  const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
  const result = response.json()
  if (!response.ok) throw Error(response.error)
  return result
}

export async function fetchCoinHistory(id) {
  const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
  const result = response.json()
  if (!response.ok) throw Error(response.error)
  return result
}
