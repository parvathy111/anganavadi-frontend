import React, { useEffect, useState } from 'react';
import { useUser } from '../store/useUser';
import BeneficiaryLayout from "../layouts/BeneficiaryLayout";
import api from '../config/axiosinstance';

const ChildDetails = () => {
  const { user } = useUser(); 
  const [tracks, setTracks] = useState([]);
  const [message, setMessage] = useState('');
  const [childName, setChildName] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 30;

  useEffect(() => {
    if (!user) return;

    if (user.role?.toLowerCase() === 'preglactwomen') {
      setMessage('Child details are not available for Pregnant/Lactating women.');
      setLoading(false);
      return;
    }

    const fetchChildDetails = async () => {
      try {
        const res = await api.get('/dailytracks/beneficiary-view');
        if (res.data.message && !res.data.dailyTracks) {
          setMessage(res.data.message);
        } else {
          setTracks(res.data.dailyTracks);
          setChildName(res.data.childname);
        }
      } catch (err) {
        console.error(err);
        setMessage('Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchChildDetails();
  }, [user]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tracks.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(tracks.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <BeneficiaryLayout>
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600 font-medium">Loading report...</p>
        </div>
      </BeneficiaryLayout>
    );
  }

  return (
    <BeneficiaryLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Child Activity Report</h1>
              {childName && (
                <p className="text-lg text-orange-400 mt-1">{childName}'s Daily Activities</p>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, tracks.length)} of {tracks.length} records
              </p>
            </div>
          </div>
        </div>

        {/* Message or No Records */}
        {message ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-md shadow-sm mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-yellow-700">{message}</p>
              </div>
            </div>
          </div>
        ) : tracks.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-900">No records available</h3>
            <p className="mt-1 text-gray-600">Your child's daily activities will appear here once recorded.</p>
          </div>
        ) : (
          <div>
            {/* Activity Cards */}
            <div className="space-y-6 mb-8">
              {currentRecords.map((track, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {new Date(track.createdAt).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Timing</p>
                      <p className="font-medium">{track.openingTime} - {track.closingTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Meal Served</p>
                      <p className="font-medium">{track.todayMeal}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Learning Topic</p>
                      <p className="font-medium">{track.topicLearned}</p>
                    </div>
                  </div>
                  {track.otherActivities && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">Additional Activities</p>
                      <p className="font-medium mt-1">{track.otherActivities}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700'}`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>
    </BeneficiaryLayout>
  );
};

export default ChildDetails;
