import axios from "axios";

export async function getBTCPrice() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin",
          vs_currencies: "usd",
        },
      }
    );

    return response.data.bitcoin.usd;
  } catch (error) {
    console.error(error);
    return null;
  }
}