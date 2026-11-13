import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadedDocs = [];

    for (const file of files) {
      if (typeof file === 'string') continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload buffer directly to Cloudinary
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'robin_education_docs',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      const result = await uploadPromise;

      uploadedDocs.push({
        name: file.name || result.original_filename || 'document',
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format || result.resource_type || 'file',
        size: result.bytes || buffer.length,
        uploadedAt: new Date(),
      });
    }

    return NextResponse.json({
      success: true,
      documents: uploadedDocs,
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload document to Cloudinary' },
      { status: 500 }
    );
  }
}
