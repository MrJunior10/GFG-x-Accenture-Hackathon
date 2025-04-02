// Candidate.js
import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String },
  address:   { type: String },
  school10:  { type: String },
  marks10:   { type: Number },
  school12:  { type: String },
  marks12:   { type: Number },
  college:   { type: String },
  cgpa:      { type: Number },
  graduationYear: { type: Number },
  resumePath: { type: String },
  matchScore: { type: Number, default: 0 },
  appliedDate: { type: Date, default: Date.now }
});

export default mongoose.model('Candidate', candidateSchema);
