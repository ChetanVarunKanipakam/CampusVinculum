import { useState } from "react";

export default function EventForm() {
  const [eventName, setEventName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ prevent page reload
    console.log("Event submitted:", eventName);

    // Example API call (connect to backend)
    fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: eventName }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Response:", data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
