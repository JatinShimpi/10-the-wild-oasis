import { API_BASE_URL } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";
import axios from "axios";


//TODO write all the api endpoints for your custom api  3/6

async function refreshAccessToken() {
  //done
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/users/refresh-token`,
      {},
      { withCredentials: true }
    );
    return data?.data ?? null;
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error.response?.data || error
    );
    return null;
  }
}

const data = refreshAccessToken()
console.log(data)


export async function login({ email, password }) {
  //done

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/users/login`,
      { email, password },
      { withCredentials: true } // Important: Allows cookies to be sent/received
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function signup({ fullName, username, email, password }) {
  //done
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/users/register`,
      { fullName, username, email, password },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
}

export async function getCurrentUser() {
  //done
  try {
    const { data } = await axios.get(`${API_BASE_URL}/users/current-user`, {
      withCredentials: true,
    });
    return data?.data ?? null;
  } catch (error) {
    if (error.response?.status === 401) {
      console.warn("Access token expired, attempting to refresh...");
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        try {
          // No need to include Authorization header, as the cookie handles it
          const { data } = await axios.get(
            `${API_BASE_URL}/users/current-user`,
            {
              withCredentials: true,
            }
          );
          return data?.data ?? null;
        } catch (retryError) {
          console.error(
            "Error retrying user fetch after token refresh:",
            retryError.response?.data || retryError
          );
        }
      }
    }
    console.error(
      "Error fetching current user:",
      error.response?.data || error
    );
    return null;
  }
}


export async function logout() {
  //done
  try {
    await axios.post(
      `${API_BASE_URL}/users/logout`,
      {},
      { withCredentials: true }
    );
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.response?.data || error);
  }
}

export async function updateCurrentUser({ password, fullName, email, avatar }) {
  try {
    if (password) {
      await axios.post(
        `${API_BASE_URL}/users/change-password`,
        { password },
        { withCredentials: true }
      );
    }

    if (fullName || email) {
      await axios.patch(
        `${API_BASE_URL}/users/update-account`,
        { fullName, email },
        { withCredentials: true }
      );
    }

    if (avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      await axios.patch(`${API_BASE_URL}/users/avatar`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  } catch (error) {
    console.error("Error updating user:", error.response?.data || error);
    throw new Error(error.response?.data?.message || error.message);
  }
}
