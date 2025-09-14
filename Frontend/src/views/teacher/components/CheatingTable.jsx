import React, { useState } from 'react';

function createData(
  name,
  email,
  tabChange,
  prohibitedKeyPress,
  multipleFaceDetected,
  mobileFound,
  prohibitedObjectDetected,
) {
  return {
    name,
    email,
    tabChange,
    prohibitedKeyPress,
    multipleFaceDetected,
    mobileFound,
    prohibitedObjectDetected,
  };
}

const users = [
  createData('User 1', 'user1@example.com', 4, 2, 5, 1, 3),
  createData('User 2', 'user2@example.com', 2, 3, 1, 5, 4),
  createData('User 3', 'user3@example.com', 5, 1, 3, 2, 4),
  createData('User 4', 'user4@example.com', 3, 4, 2, 4, 5),
  createData('User 5', 'user5@example.com', 1, 5, 4, 3, 2),
];

export default function CheatingTable() {
  const [filter, setFilter] = useState('');
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <input
        type="text"
        placeholder="Filter by Name or Email"
        className="w-full p-2 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Sno</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Tab Change</th>
              <th className="px-4 py-2 text-left">Prohibited Key Press</th>
              <th className="px-4 py-2 text-left">Multiple Face Detected</th>
              <th className="px-4 py-2 text-left">Mobile Found</th>
              <th className="px-4 py-2 text-left">Prohibited Object Detected</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.tabChange}</td>
                <td className="px-4 py-2">{user.prohibitedKeyPress}</td>
                <td className="px-4 py-2">{user.multipleFaceDetected}</td>
                <td className="px-4 py-2">{user.mobileFound}</td>
                <td className="px-4 py-2">{user.prohibitedObjectDetected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
