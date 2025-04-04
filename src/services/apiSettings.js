import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export async function getSettings() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/settings`, {
      withCredentials: true,
    });
    
    return data.data;
  } catch (error) {
    console.error("Error fetching settings:", error.response?.data || error);
    throw new Error("Settings could not be loaded");
  }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/settings`,
      newSetting,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return data.data;
  } catch (error) {
    console.error("Error updating settings:", error.response?.data || error);
    throw new Error("Settings could not be updated");
  }
}
