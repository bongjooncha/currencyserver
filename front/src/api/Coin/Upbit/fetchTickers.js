import axios from "axios";

const UPBIT_URL = "https://api.upbit.com/v1";

// 코인 명 받아오기
export async function fetchTickers() {
  try {
    const response = await axios.get(`${UPBIT_URL}/market/all?isDetails=true`, {
      headers: { accept: "application/json" },
    });
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching tickers:", error);
    throw error;
  }
}
