import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const updateFields = {};
    if (data.status) updateFields.status = data.status;
    if (data.notes !== undefined) updateFields.notes = data.notes;

    const updated = await Enquiry.findByIdAndUpdate(params.id, updateFields, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deleted = await Enquiry.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
