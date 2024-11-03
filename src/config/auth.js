import axios from "axios";
import { config } from "./api";

export const generateOtp = async ({ email }) => {
  try {
    console.log(email);
    const response = await axios.post(`${config.BASE_URL}api/auth/login`, {
      email,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async ({ email, otp }) => {
  try {
    console.log(email);
    const response = await axios.post(`${config.BASE_URL}api/auth/verify-otp`, {
      email,
      otp,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};


