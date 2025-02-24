import { API_BASE_URL } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";
import axios from "axios";


//TODO write all the api endpoints for your custom api  2/5

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
  // done
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/users/current-user`,
      {
        withCredentials: true,
      }
    );

    console.log(data);
    //swear to god spend so much time here finally figured it was fetching nonexisti=ent fiedl from the response 🤦
    return data?.data ?? null;
  } catch (error) {
    console.error(
      "Error fetching current user:",
      error.response?.data || error
    );
    return null;
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. update the password or fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(error.message);

  //3. update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error) throw new Error(error2.message);
  return updatedUser;
}
