import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartData: any; // Chart.js data object
  chartOptions: any; // Chart.js options object
  chartType: 'bar' | 'line';
}

const ChartModal: React.FC<ChartModalProps> = ({ isOpen, onClose, chartData, chartOptions, chartType }) => {
  if (!isOpen) return null;

  const ChartComponent = chartType === 'bar' ? Bar : Line;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Generated Chart</h2>
        <div className="relative h-96">
          {chartData && chartData.labels && chartData.datasets ? (
            chartType === 'bar' ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <Line data={chartData} options={chartOptions} />
            )
          ) : (
            <p className="text-center text-gray-500">No data available to display chart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartModal;