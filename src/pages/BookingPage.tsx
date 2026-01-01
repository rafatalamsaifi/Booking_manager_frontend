import { useState } from "react";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import "./BookingPage.css";

export default function BookingPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="booking-page">
      <h1 className="title">Booking Manager</h1>

      <div className="content">
        <BookingForm onSuccess={() => setRefresh((p) => p + 1)} />        
        <BookingList refresh={refresh} />
      </div>
    </div>
  );
}