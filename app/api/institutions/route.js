import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Institution from '@/models/Institution';
import { SEED_INSTITUTIONS } from '@/lib/seedData';

export async function GET(request) {
  try {
    await connectToDatabase();

    let count = await Institution.countDocuments();
    if (count === 0) {
      await Institution.insertMany(SEED_INSTITUTIONS);
    }

    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const type = searchParams.get('type');
    const query = searchParams.get('q');

    let filter = {};
    if (state && state !== 'ALL') {
      filter.state = new RegExp(`^${state}$`, 'i');
    }
    if (type && type !== 'ALL') {
      filter.type = type;
    }
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
        { courses: { $regex: query, $options: 'i' } },
      ];
    }

    let institutions = await Institution.find(filter).sort({ createdAt: -1 });

    if (!institutions || institutions.length === 0) {
      // If collection was empty or query returned empty without filters, fallback to seed
      if (!state && !type && !query) {
        institutions = SEED_INSTITUTIONS;
      }
    }

    return NextResponse.json({ success: true, institutions });
  } catch (error) {
    console.error('Error fetching institutions, returning fallback institutions:', error);
    // Graceful fallback: Never break client on cold start/db latency
    const { searchParams } = new URL(request.url);
    const state = searchParams?.get('state');
    const type = searchParams?.get('type');
    const query = searchParams?.get('q');

    let fallbackList = SEED_INSTITUTIONS;
    if (state && state !== 'ALL') {
      fallbackList = fallbackList.filter(i => i.state.toLowerCase() === state.toLowerCase());
    }
    if (type && type !== 'ALL') {
      fallbackList = fallbackList.filter(i => i.type.toLowerCase() === type.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      fallbackList = fallbackList.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.address.toLowerCase().includes(q) || 
        (i.courses && i.courses.toLowerCase().includes(q))
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        institutions: fallbackList,
        isFallback: true 
      },
      { status: 200 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    if (!data.name || !data.fees || !data.cashback || !data.state || !data.address) {
      return NextResponse.json(
        { error: 'Missing required fields: name, fees, cashback, state, address are required.' },
        { status: 400 }
      );
    }

    const newInstitution = await Institution.create({
      name: data.name.trim(),
      type: data.type || 'College',
      fees: Number(data.fees),
      cashback: Number(data.cashback),
      state: data.state.trim(),
      address: data.address.trim(),
      documents: Array.isArray(data.documents) ? data.documents : [],
      image: data.image || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      courses: data.courses || 'All Major Streams Available',
      totalCommission: Number(data.totalCommission) || Math.round(Number(data.fees) * 0.3) || 30000,
    });

    return NextResponse.json({ success: true, institution: newInstitution }, { status: 201 });
  } catch (error) {
    console.error('Error creating institution:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create institution' },
      { status: 500 }
    );
  }
}
