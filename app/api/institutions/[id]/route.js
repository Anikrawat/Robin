import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Institution from '@/models/Institution';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const institution = await Institution.findById(params.id);
    if (!institution) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, institution });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const updated = await Institution.findByIdAndUpdate(
      params.id,
      {
        name: data.name,
        type: data.type,
        fees: Number(data.fees),
        cashback: Number(data.cashback),
        state: data.state,
        address: data.address,
        documents: data.documents || [],
        image: data.image,
        courses: data.courses,
        totalCommission: data.totalCommission,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, institution: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deleted = await Institution.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Institution deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
