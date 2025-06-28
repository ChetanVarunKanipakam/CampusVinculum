import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  timeSlots: {
    type: [String], // e.g., ["09:00 - 10:00", ...]
    required: true,
  },
  days: {
    type: [String], // e.g., ["Monday", "Tuesday", ...]
    required: true,
  },
  timetable: {
    type: Map,
    of: [String], // e.g., { Monday: ["Maths", "Physics", ...] }
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Timetable", timetableSchema);
