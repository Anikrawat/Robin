import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide admin email.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password.'],
    },
    name: {
      type: String,
      default: 'Administrator',
    },
    role: {
      type: String,
      default: 'superadmin',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
