import React from 'react';
import img1 from 'src/assets/images/backgrounds/rocket.png';

export const Upgrade = () => {
  return (
    <div className="flex items-center gap-4 m-6 p-6 bg-blue-100 dark:bg-blue-900 rounded-lg">
      <div>
        <h6 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Unlimited Access</h6>
        <a
          href="https://adminmart.com/product/modernize-react-mui-dashboard-template/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700 text-sm transition"
          aria-label="logout"
        >
          Upgrade
        </a>
      </div>
      <div className="-mt-9">
        <img alt="Remy Sharp" src={img1} width={100} />
      </div>
    </div>
  );
};
