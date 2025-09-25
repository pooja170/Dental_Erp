import React from 'react';

const SettingsPanel = () => (
  <div className="bg-white rounded shadow p-4 flex flex-col gap-4">
    <h2 className="font-semibold text-lg">Settings</h2>
    <input className="input" placeholder="Template Name" />
    <input className="input" placeholder="Description" />
    <select className="input">
      <option>Balance Sheet</option>
      <option>Cashflow</option>
    </select>
    <select className="input">
      <option>@Store</option>
      <option>Other Dataset</option>
    </select>
    <button className="btn btn-primary">Save as Default</button>
    <div>
      <label className="font-medium">Drill-down</label>
      <select className="input mt-1">
        <option>Clinician</option>
        <option>Practice</option>
      </select>
    </div>
  </div>
);

export default SettingsPanel;