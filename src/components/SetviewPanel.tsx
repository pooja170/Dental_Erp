import React from 'react';

const setviews = [
  { name: 'AccountName', value: 1 },
  { name: 'Balance Sheet', value: 2 },
  { name: 'Cashflow', value: 5 },
];

const SetviewPanel = () => (
  <div className="bg-white rounded shadow p-4">
    <h2 className="font-semibold text-lg mb-2">Setview</h2>
    <ul>
      {setviews.map(sv => (
        <li key={sv.name} className="flex justify-between">
          <span>{sv.name}</span>
          <span className="text-gray-400">{sv.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default SetviewPanel;