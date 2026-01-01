import { useEffect, useState } from "react";
import { getBookings } from "../api/booking.api";
import type { Booking } from "../types/booking.types";

export default function BookingList({ refresh }: { refresh: number }) {
  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    getBookings().then(setData);
  }, [refresh]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.name}</td>
                <td style={{ color: "var(--text-muted)" }}>{b.email}</td>
                <td>{new Date(b.date).toLocaleDateString("en-GB")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                No bookings available at the moment.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}