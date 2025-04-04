import { PAGE_SIZE } from "../utils/constants";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export async function getBookings({ filter, sortBy, page }) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/bookings/get-bookings`, {
      params: {
        filter: JSON.stringify(filter),
        sortBy: JSON.stringify(sortBy),
        page,
        pageSize: PAGE_SIZE,
      },
      withCredentials: true,
    });

    return {
      data: data.data,
      count: data.total,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Bookings could not be loaded"
    );
  }
}

export async function getBooking(id) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/bookings/get-bookings`, {
      params: { id },
      withCredentials: true,
    });
    return data.data[0];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Booking not found");
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
//date :ISOString
export async function getBookingsAfterDate(date) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/bookings/get-bookings`, {
      params: { date },
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Bookings could not get loaded"
    );
  }
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/bookings/get-bookings`, {
      params: {
        startDate: date,
        fields: "startDate,status",
      },
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Bookings could not get loaded"
    );
  }
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/bookings/get-bookings`, {
      params: {
        activity: "today",
        fields: "status,startDate,endDate",
      },
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Bookings could not get loaded"
    );
  }
}

export async function updateBooking(id, obj) {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/bookings/checkin-booking/${id}`,
      obj,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Booking could not be updated"
    );
  }
}

export async function deleteBooking(id) {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/bookings/delete-booking/${id}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Booking could not be deleted"
    );
  }
}
