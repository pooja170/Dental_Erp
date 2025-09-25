import React from 'react';

const fields = [
  { name: 'AccountName', count: 11 },
  { name: 'ActualAmount', count: 25 },
  { name: 'PriceInstrument', count: 54 },
  { name: 'Department', count: 84 },
  { name: 'Practice', count: 106 },
];

const LayoutEditorPanel = () => (
  <div className="bg-white rounded shadow p-4 flex flex-col gap-4">
    <h2 className="font-semibold text-lg">Layout Editor</h2>
    <div>
      <div className="font-medium mb-2">Available Fields</div>
      <ul className="space-y-1">
        {fields.map(f => (
          <li key={f.name} className="flex justify-between">
            <span>{f.name}</span>
            <span className="text-gray-400">{f.count}</span>
          </li>
        ))}
      </ul>
    </div>
    <button className="btn btn-secondary mt-2">+ Add Calculated Column</button>
    <div className="mt-4">
      <label className="font-medium">Group By</label>
      <div className="flex gap-2 mt-1">
        <button className="btn btn-outline">AccountCode</button>
        <button className="btn btn-outline">AccountName</button>
      </div>
    </div>
  </div>
);

export default LayoutEditorPanel;