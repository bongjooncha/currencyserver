import axios from "axios";

const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;

export async function handleFileUpload(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}/recognize`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.text;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data.error;
    } else {
      return "An error occurred while processing the request.";
    }
  }
}
