import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Please provide the student name.'],
      trim: true,
    },
    parentName: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Please provide the contact phone number.'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution',
    },
    collegeName: {
      type: String,
      default: 'General Admission Counselling',
    },
    targetCourse: {
      type: String,
      default: 'Undecided',
    },
    state: {
      type: String,
      default: 'All India',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'In Discussion', 'Admitted', 'Cashback Disbursed'],
      default: 'New',
    },
    fees: {
      type: Number,
      default: 100000,
    },
    cashback: {
      type: Number,
      default: 10000,
    },
    notes: {
      type: String,
      default: 'Received online through portal.',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
