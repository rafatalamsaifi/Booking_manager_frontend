import type { Booking } from "../types/booking.types";

const API_URL = "http://localhost:5000/api/bookings";

export const getBookings = async (): Promise<Booking[]> => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.data;
};

export const createBooking = async (
  payload: Omit<Booking, "id" | "createdAt">
) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
};