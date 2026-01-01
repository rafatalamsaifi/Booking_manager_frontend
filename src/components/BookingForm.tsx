import { useState } from "react";
import { createBooking } from "../api/booking.api";

type Errors = {
  name?: string;
  email?: string;
  date?: string;
  api?: string;
};

export default function BookingForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      setErrors({});
      await createBooking(form);
      setForm({ name: "", email: "", date: "" });
      onSuccess();
    } catch (err: any) {
      setErrors({
        api: err?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Create Booking</h2>
      {errors.api && <p className="api-error">{errors.api}</p>}

      <div className="field">
        <label>Full Name</label>
        <input
          placeholder="Enter name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="field">
        <label>Email Address</label>
        <input
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="field">
        <label>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>

      <button onClick={submit} disabled={loading}>
        {loading ? "Saving..." : "Create Booking"}
      </button>
    </div>
  );
}