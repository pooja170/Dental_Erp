import Navbar from "../components/Navbar";
import TemplateGrid from "../components/TemplateGrid";
import SettingsPanel from "../components/SettingsPanel";
import LayoutEditorPanel from "../components/LayoutEditorPanel";
import SetviewPanel from "../components/SetviewPanel";
import PreviewPanel from "../components/PreviewPanel";
import Button from "../components/Button";
import ChartModal from "../components/ChartModal"; // Import ChartModal
import useSWR from "swr";
import { saveAs } from "file-saver";
import { useState } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  dataset: string;
  columns: string[];
  calculations: any[];
  layout: any;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const mockStores = [
  { id: "store1", name: "Store A" },
  { id: "store2", name: "Store B" },
  { id: "store3", name: "Store C" },
];

export default function Home() {
  const { data: templates, error } = useSWR<Template[]>("/api/templates", fetcher);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [currentChartData, setCurrentChartData] = useState<any>(null);
  const [currentChartOptions, setCurrentChartOptions] = useState<any>(null);
  const [currentChartType, setCurrentChartType] = useState<'bar' | 'line'>('bar');

  const handleEditTemplate = (id: string) => {
    alert(`Edit template ${id}`);
  };

  const handleOpenInPowerBI = (templateId: string) => {
    console.log(`Open in Power BI clicked for template ID: ${templateId}. Placeholder for Power BI integration.`);
    alert(`Prepare data for Power BI for template ${templateId}.`);
  };

  const handleGenerateGraph = async (templateId: string) => {
    console.log(`Generate Graph clicked for template ID: ${templateId}. Fetching data...`);
    try {
      const response = await fetch(`/api/getTemplateData?templateId=${templateId}`); // Assuming this API exists
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data for graph:", data);

      if (!Array.isArray(data) || data.length === 0) {
        alert("No valid data available for this template to generate a graph.");
        return;
      }

      // Process data for Chart.js
      const labels = data.map((item: any) => {
        const label = item.label || item.category || item.date;
        return label !== undefined && label !== null ? String(label) : ''; // Ensure label is a string
      }).filter(label => label !== ''); // Remove empty labels

      const datasets = [
        {
          label: 'Value',
          data: data.map((item: any) => {
            const value = item.value || item.amount;
            return typeof value === 'number' ? value : 0; // Ensure value is a number, default to 0
          }),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ];

      // Ensure labels and datasets are not empty, otherwise Chart.js might still error
      if (labels.length === 0 || datasets[0].data.length === 0) {
        alert("Processed data is empty or invalid for graph generation.");
        return;
      }

      setCurrentChartData({ labels, datasets });
      setCurrentChartOptions({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' as const },
          title: { display: true, text: `Data for Template ${templateId}` },
        },
      });
      setCurrentChartType('bar'); // Or 'line' based on data
      setIsChartModalOpen(true);

    } catch (error) {
      console.error("Error generating graph:", error);
      alert("Failed to generate graph. Check console for details.");
    }
  };

  if (error) return <div>Failed to load templates</div>;
  if (!templates) return <div>Loading templates...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Templates</h1>
          <Button variant="primary">+ Create New Template</Button>
        </div>

        {/* Filter Inputs */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">Filter Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="storeSelect" className="block text-sm font-medium text-gray-700">Store/Department</label>
              <select
                id="storeSelect"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
              >
                <option value="">All</option>
                {mockStores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Templates List */}
          <div className="lg:col-span-1 overflow-auto">
            <TemplateGrid
              templates={templates}
              onEdit={handleEditTemplate}
              onOpenInPowerBI={handleOpenInPowerBI} // Pass renamed prop
              onGenerateGraph={handleGenerateGraph} // Pass new prop
            />
          </div>
          {/* Middle: Settings & Layout */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <SettingsPanel />
            <LayoutEditorPanel />
          </div>
          {/* Right: Setview & Preview */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <SetviewPanel />
            <PreviewPanel />
            <div className="flex gap-2 mt-2">
              <Button variant="primary">Save Template</Button>
              <Button variant="success">Generate Report</Button>
              <Button variant="outline">Export to Excel</Button>
            </div>
          </div>
        </div>
      </main>
      <ChartModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
        chartData={currentChartData}
        chartOptions={currentChartOptions}
        chartType={currentChartType}
      />
    </div>
  );
}