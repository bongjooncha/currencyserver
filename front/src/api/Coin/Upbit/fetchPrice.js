import axios from "axios";

const UPBIT_URL = "https://api.upbit.com/v1";

export async function fetchPrice(coin) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  let url = `${UPBIT_URL}/ticker?markets=${coin}`;
  try {
    const response = await axios.get(url, options);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching price data:", error);
    throw error;
  }
}
