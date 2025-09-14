import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <span className="inline-block w-16 h-16 border-4 border-t-4 border-primary border-t-white rounded-full animate-spin"></span>
    </div>
  );
}
