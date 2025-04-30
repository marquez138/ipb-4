import clientPromise from '../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const uploads = await db.collection('uploads')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const urls = uploads.map((item) => ({
    ...item,
    url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.key}`,
  }));

  return NextResponse.json(urls);
}
