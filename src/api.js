const URL = "https://api.coincap.io/v2";

async function getAssets() {
  const response = await fetch(`${URL}/assets?limit=20`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.log(error.message));
  return response;
}

async function getAsset(coin) {
  const response = await fetch(`${URL}/assets/${coin}`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.log(error.message));
  return response;
}

async function getAssetHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();

  const response = await fetch(
    `${URL}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  )
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.log(error.message));
  return response;
}

async function getMarkets(coin) {
  const response = await fetch(`${URL}/assets/${coin}/markets?limit=5`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
}

async function getExchange(id) {
  const response = await fetch(`${URL}/exchanges/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
  return response;
}

export default {
  getAssets,
  getAsset,
  getAssetHistory,
  getMarkets,
  getExchange,
};
