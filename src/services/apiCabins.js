import { API_BASE_URL } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";
import axios from "axios";

export async function getCabins() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/cabins/get-all-cabins`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error fetching cabins:", error.response?.data || error);
    throw new Error("Cabins could not be loaded");
  }
}

export async function createCabin(newCabin) {
  try {
    const formData = new FormData();
    formData.append("cabinImage", newCabin.image);
    formData.append("cabinNum", newCabin.name);
    formData.append("price", newCabin.regularPrice);
    formData.append("discount", newCabin.discount);
    formData.append("description", newCabin.description);
    formData.append("capacity", newCabin.maxCapacity);

    const { data } = await axios.post(
      `${API_BASE_URL}/cabins/create-cabin`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating cabin:", error.response?.data || error);
    throw new Error("Cabin could not be created");
  }
}

export async function getCabinById(id) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/cabins/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error fetching cabin:", error.response?.data || error);
    throw new Error("Cabin could not be loaded");
  }
}


//i am so fucking stupid man i spent almost 2 hours on this🤦🤔 i was passing updatedcabin in the id and videverca 
export async function updateCabin(updatedCabin,id) {

  try {
    const formData = new FormData();
    if (updatedCabin.image) {
      formData.append("cabinImage", updatedCabin.image);
    }
    formData.append("cabinNum", updatedCabin.name);
    formData.append("price", updatedCabin.regularPrice);
    formData.append("discount", updatedCabin.discount);
    formData.append("description", updatedCabin.description);
    formData.append("capacity", updatedCabin.maxCapacity);

    const { data } = await axios.patch(
      `${API_BASE_URL}/cabins/${id}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating cabin:", error.response?.data || error);
    throw new Error("Cabin could not be updated");
  }
}

export async function deleteCabin(id) {
  try {
    await axios.delete(`${API_BASE_URL}/cabins/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error deleting cabin:", error.response?.data || error);
    throw new Error("Cabin could not be deleted");
  }
}
