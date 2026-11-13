import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String },
  format: { type: String },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
});

const InstitutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the college/school.'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['College', 'School', 'University'],
      default: 'College',
    },
    fees: {
      type: Number,
      required: [true, 'Please provide the tuition fees.'],
      min: 0,
    },
    cashback: {
      type: Number,
      required: [true, 'Please provide the cashback refund amount.'],
      min: 0,
    },
    state: {
      type: String,
      required: [true, 'Please specify the state where the college is located.'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please provide the address of the school/college.'],
      trim: true,
    },
    documents: [DocumentSchema],
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    },
    courses: {
      type: String,
      default: 'All Major Streams Available',
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    totalCommission: {
      type: Number,
      default: 30000,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Institution || mongoose.model('Institution', InstitutionSchema);
