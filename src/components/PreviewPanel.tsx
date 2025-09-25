import React from 'react';

const previewRows = [
  { AccountCode: '1001', AccountName: 'Debtors Store', Amount: 199 },
  { AccountCode: '1002', AccountName: 'Receivables', Amount: 303 },
  { AccountCode: '1003', AccountName: 'Collections', Amount: 393 },
];

const PreviewPanel = () => (
  <div className="bg-white rounded shadow p-4">
    <h2 className="font-semibold text-lg mb-2">Preview</h2>
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="text-left">AccountCode</th>
          <th className="text-left">AccountName</th>
          <th className="text-left">Amount</th>
        </tr>
      </thead>
      <tbody>
        {previewRows.map((row, idx) => (
          <tr key={idx}>
            <td>{row.AccountCode}</td>
            <td>{row.AccountName}</td>
            <td>{row.Amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="text-xs text-gray-400 mt-2">
      Click Excel details. Ctrl+O fill down details
    </div>
  </div>
);

export default PreviewPanel;