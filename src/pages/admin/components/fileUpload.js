import axios from "axios";
import { config } from "../../../common/config";

export const GenerateDataFromApi = async ({ resumeText }) => {
  console.log(resumeText);
  if (!resumeText) return;

  const json = {
    resumeText,
  };

  try {
    const response = await axios.post(
      `${config.BASE_URL}api/generate-portfolio`,
      json
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
