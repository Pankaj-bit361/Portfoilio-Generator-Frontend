import axios from "axios";
import { config } from "../common/config";

export const GenerateDataFromApi = async (resumeText) => {
  if (!resumeText) return null;
  console.log("Resume Text:", resumeText);
  const json = { resumeText };
  try {
    const response = await axios.post(
      `${config.BASE_URL}api/portfolio/generate`,
      json
    );
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error);
    return null;
  }
};
