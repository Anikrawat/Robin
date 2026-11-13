import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

const SEED_ENQUIRIES = [
  {
    studentName: 'Aarav Sharma',
    parentName: 'Rakesh Sharma',
    phone: '+91 98765 43210',
    email: 'rakesh.sharma@gmail.com',
    collegeName: 'Apex Institute of Technology & Management',
    targetCourse: 'B.Tech CSE',
    state: 'Karnataka',
    message: 'Seeking direct admission for 2026 academic batch with fee cashback offer.',
    status: 'In Discussion',
    fees: 120000,
    cashback: 15000,
    notes: 'Parent verified 12th marks (89%). Scheduled counselor call.',
  },
  {
    studentName: 'Ananya Verma',
    parentName: 'Sunita Verma',
    phone: '+91 91234 56789',
    email: 'sunita.v@yahoo.com',
    collegeName: 'St. Xavier Global International School',
    targetCourse: 'Class 9th (CBSE)',
    state: 'Delhi',
    message: 'Looking for school transfer from Pune to Delhi. Interested in cashback.',
    status: 'Admitted',
    fees: 85000,
    cashback: 10000,
    notes: 'Admission confirmed! First term fees cleared. Cashback transfer initiated.',
  },
  {
    studentName: 'Rohan Deshmukh',
    parentName: 'Vikram Deshmukh',
    phone: '+91 94567 89012',
    email: 'rohan.desh@gmail.com',
    collegeName: 'Symbiosis Metropolis Business Academy',
    targetCourse: 'MBA / PGDM',
    state: 'Maharashtra',
    message: 'Want to confirm if the 30k cashback is disbursed before or after orientation.',
    status: 'New',
    fees: 250000,
    cashback: 30000,
    notes: 'New submission. Needs call to clarify cashback timeline.',
  }
];

export async function GET() {
  try {
    await connectToDatabase();

    let count = await Enquiry.countDocuments();
    if (count === 0) {
      await Enquiry.insertMany(SEED_ENQUIRIES);
    }

    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    if (!data.studentName || !data.phone) {
      return NextResponse.json(
        { error: 'Student name and phone number are required.' },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.create({
      studentName: data.studentName.trim(),
      parentName: data.parentName ? data.parentName.trim() : '',
      phone: data.phone.trim(),
      email: data.email ? data.email.trim() : '',
      collegeId: data.collegeId || null,
      collegeName: data.collegeName || 'General Admission Counselling',
      targetCourse: data.targetCourse || 'Undecided',
      state: data.state || 'All India',
      message: data.message || '',
      status: 'New',
      fees: Number(data.fees) || 100000,
      cashback: Number(data.cashback) || 10000,
      notes: 'Submitted online via admission cashback portal.',
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
