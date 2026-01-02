import type { Booking } from "../types/booking.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${BASE_URL}/api/bookings`;

export const getBookings = async (): Promise<Booking[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const data = await res.json();
  return data.data;
};

export const createBooking = async (
  payload: Omit<Booking, "id" | "createdAt">
) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create booking");
  }

  return res.json();
};