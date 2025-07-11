import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  feePaid: Number,
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);

