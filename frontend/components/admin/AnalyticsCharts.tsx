import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function UserGrowthChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 90, 120, 145, 180, 210],
        borderColor: '#C9A96A',
        backgroundColor: 'rgba(201, 169, 106, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="lux-card p-6">
      <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">User Growth</h3>
      <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
}

export function RevenueChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [8500, 11200, 14800, 16500, 18200, 21500],
        backgroundColor: '#C9A96A',
        borderColor: '#B78F4A',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="lux-card p-6">
      <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">Revenue Trend</h3>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
}

export function ListingStatusChart() {
  const data = {
    labels: ['Active', 'Pending', 'Sold', 'Expired'],
    datasets: [
      {
        label: 'Listings',
        data: [485, 142, 189, 40],
        backgroundColor: ['#C9A96A', '#f39c12', '#27ae60', '#e74c3c'],
        borderColor: ['#B78F4A', '#d68910', '#229954', '#c0392b'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="lux-card p-6">
      <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">Listing Status</h3>
      <div className="flex justify-center">
        <div style={{ width: '200px', height: '200px' }}>
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: { legend: { position: 'bottom' } },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function PropertyCategoryChart() {
  const data = {
    labels: ['Residential', 'Commercial', 'Industrial', 'Land'],
    datasets: [
      {
        label: 'Properties by Type',
        data: [425, 189, 95, 147],
        backgroundColor: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c'],
        borderColor: ['#2980b9', '#27ae60', '#d68910', '#c0392b'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="lux-card p-6">
      <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">Properties by Type</h3>
      <div className="flex justify-center">
        <div style={{ width: '200px', height: '200px' }}>
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: { legend: { position: 'bottom' } },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function OffersChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Offers Received',
        data: [45, 52, 68, 73, 85, 92],
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Offers Accepted',
        data: [12, 18, 24, 28, 32, 38],
        borderColor: '#C9A96A',
        backgroundColor: 'rgba(201, 169, 106, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="lux-card p-6">
      <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">Offers Overview</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
}
