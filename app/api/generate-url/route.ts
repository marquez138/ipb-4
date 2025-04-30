import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import clientPromise from '../../lib/mongodb';
import { NextResponse } from 'next/server';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(req: Request) {
  const { filename, type } = await req.json();
  const key = `${Date.now()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: type
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  const client = await clientPromise;
  const db = client.db();
  await db.collection('uploads').insertOne({
    key,
    createdAt: new Date(),
    contentType: type,
    filename
  });

  return NextResponse.json({ url, key });
}