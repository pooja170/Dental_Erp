import React, { useState } from "react";
import { generateReport } from "../utils/api";

interface TemplateCardProps {
  id: string; // Add id to props
  name: string;
  dataset: string;
  onOpenInPowerBI: () => void;
  onGenerateGraph: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  dataset,
  onOpenInPowerBI,
  onGenerateGraph,
  onCopy,
  onEdit,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      // For demonstration, using a placeholder user ID and some dummy data
      const dummyUserData = { userId: "user123", reportType: "monthly" };
      await generateReport(id, dummyUserData);
      alert("Report generation initiated successfully!");
    } catch (err) {
      setError("Failed to generate report.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
      <div className="font-bold text-lg">{name}</div>
      <div className="text-gray-500 text-sm mb-2">{dataset}</div>
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm font-semibold"
          onClick={handleGenerateReport}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
        <button
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-sm font-semibold"
          onClick={onGenerateGraph}
        >
          Generate Graph
        </button>
        <button
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-semibold"
          onClick={onOpenInPowerBI}
        >
          Open in Power BI
        </button>
        <button
          className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 text-sm font-semibold"
          onClick={onCopy}
        >
          Copy Report
        </button>
      </div>
      {error && <p className="text-beige-error text-sm mt-2">{error}</p>}
    </div>
  );
};

export default TemplateCard;