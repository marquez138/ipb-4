'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/list-uploads')
      .then((res) => res.json())
      .then(setImages);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin - Uploaded Images</h1>
      <div className="grid grid-cols-2 gap-4">
        {images.map((img: any) => (
          <div key={img._id}>
            <img src={img.url} alt={img.filename} className="rounded w-full" />
            <p className="text-sm text-gray-500">{img.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
