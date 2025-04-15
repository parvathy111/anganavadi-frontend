import React, { useState, useEffect } from 'react';
import { useUser } from '../store/useUser';
import api from '../config/axiosinstance';
import WorkerLayout from '../layouts/WorkerLayout';
import { 
  FaUsers, 
  FaBaby, 
  FaFemale, 
  FaInfoCircle, 
  FaUserTie, 
  FaHome,
  FaChartBar,
  FaChartPie
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const WorkerViewAnganwadi = () => {
  const { user, anganwadiNo } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeChart, setActiveChart] = useState('bar'); // 'bar' or 'pie'

  useEffect(() => {
    const fetchAnganwadi = async () => {
      try {
        const res = await api.get(`/anganavadi/worker/view-anganwadi/${anganwadiNo}`);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching anganwadi:', err);
        if (err.response && err.response.status === 400) {
          setError('Authentication error or missing Anganwadi number');
        } else if (err.response && err.response.status === 404) {
          setError('Anganwadi center not found');
        } else {
          setError('Failed to load Anganwadi details. Please try again later.');
        }
        setLoading(false);
      }
    };

    if (anganwadiNo) {
      fetchAnganwadi();
    } else {
      setError('Anganwadi number is required');
      setLoading(false);
    }
  }, [anganwadiNo]);

  if (loading) return (
    <WorkerLayout>
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    </WorkerLayout>
  );

  if (error) return (
    <WorkerLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
          <div className="flex items-center">
            <FaInfoCircle className="mr-2" />
            <p className="font-bold">Error</p>
          </div>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    </WorkerLayout>
  );

  if (!data || !data.anganwadi) return (
    <WorkerLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
          <div className="flex items-center">
            <FaInfoCircle className="mr-2" />
            <p>No Anganwadi data available</p>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );

  const { anganwadi, parentCount, pregLacCount, beneficiaryCount } = data;
  const supervisor = anganwadi.createdBy;

  // Chart Data
  const chartData = {
    labels: ['Total Beneficiaries', 'Pregnant/Lactating', 'Parents'],
    datasets: [
      {
        label: 'Beneficiary Count',
        data: [beneficiaryCount, pregLacCount, parentCount],
        backgroundColor: [
          'rgba(249, 115, 22, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(234, 179, 8, 0.7)'
        ],
        borderColor: [
          'rgba(249, 115, 22, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(234, 179, 8, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <WorkerLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500 mb-7">Anganwadi Center Dashboard</h1>
          {/* <div className="w-24 h-1 bg-orange-500 mx-auto mt-1"></div> */}
        </div>

        {/* Main Content with Side-by-Side Layout */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Column - Anganwadi Details */}
          <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Anganwadi Info Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
              <div className="flex items-center">
                <FaHome className="text-3xl mr-4" />
                <div>
                  <h2 className="text-2xl font-bold">Anganwadi #{anganwadi.anganwadiNo}</h2>
                  <p className="text-orange-100">{anganwadi.localBodyName}, Ward {anganwadi.wardNumber}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Details Grid */}
              <div className="flex grid-cols-1 gap-6 mb-8">
                <div className="bg-pink-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-500 mb-3 flex items-center">
                    <FaInfoCircle className="mr-2" /> Center Information
                  </h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Local Body:</span> {anganwadi.localBody}</p>
                    <p><span className="font-medium">Ward Number:</span> {anganwadi.wardNumber}</p>
                    <p><span className="font-medium">Address:</span> {anganwadi.address || 'Not specified'}</p>
                  </div>
                </div>

                {/* Supervisor Card */}
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-500 mb-3 flex items-center">
                    <FaUserTie className="mr-2" /> Supervisor Details
                  </h3>
                  {supervisor ? (
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {supervisor.fullname}</p>
                      <p><span className="font-medium">Contact:</span> {supervisor.phone || 'Not available'}</p>
                      <p><span className="font-medium">Email:</span> {supervisor.email}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Supervisor information not available</p>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
                  <FaChartBar className="mr-2" /> Beneficiary Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <div className="flex items-center mb-2">
                      <FaUsers className="text-orange-600 mr-2" />
                      <h4 className="font-semibold text-gray-800">Total Beneficiaries</h4>
                    </div>
                    <p className="text-3xl font-bold text-orange-500">{beneficiaryCount}</p>
                  </div>

                  <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                    <div className="flex items-center mb-2">
                      <FaFemale className="text-pink-600 mr-2" />
                      <h4 className="font-semibold text-gray-800">Pregnant/Lactating</h4>
                    </div>
                    <p className="text-3xl font-bold text-pink-500">{pregLacCount}</p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex items-center mb-2">
                      <FaBaby className="text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-gray-800">Parents</h4>
                    </div>
                    <p className="text-3xl font-bold text-yellow-500">{parentCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visualization */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-orange-500">Visualization</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveChart('bar')}
                  className={`px-3 py-1 rounded-md ${activeChart === 'bar' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  <FaChartBar className="inline mr-1" /> Bar
                </button>
                <button
                  onClick={() => setActiveChart('pie')}
                  className={`px-3 py-1 rounded-md ${activeChart === 'pie' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  <FaChartPie className="inline mr-1" /> Pie
                </button>
              </div>
            </div>
            
            <div className="h-96 w-full">
              {activeChart === 'bar' ? (
                <Bar data={chartData} options={options} />
              ) : (
                <Pie data={chartData} options={options} />
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-orange-500 mb-4">Additional Information</h3>
          <p className="text-gray-600">
            For any updates or corrections to this information, please contact your district supervisor.
          </p>
        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerViewAnganwadi;