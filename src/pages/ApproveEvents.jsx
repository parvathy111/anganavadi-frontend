import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApproveEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/events/all');
            setEvents(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching events:', err);
            setEvents([]);
            setLoading(false);
        }
    };

    const approveEvent = async (eventId) => {
        try {
            await axios.put(`/api/events/approve/${eventId}`);
            fetchEvents();
        } catch (err) {
            console.error('Error approving event:', err);
        }
    };

    const rejectEvent = async (eventId) => {
        try {
            await axios.put(`/api/events/reject/${eventId}`);
            fetchEvents();
        } catch (err) {
            console.error('Error rejecting event:', err);
        }
    };

    if (loading) return <p>Loading events...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">All Events</h1>
            {events.length === 0 ? (
                <p>No events found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border-b text-left">Event Name</th>
                                <th className="p-3 border-b text-left">Date</th>
                                <th className="p-3 border-b text-left">Time</th>
                                <th className="p-3 border-b text-left">Status</th>
                                <th className="p-3 border-b text-left">Participants</th>
                                <th className="p-3 border-b text-left">Conducted By</th>
                                <th className="p-3 border-b text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event._id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{event.eventName}</td>
                                    <td className="p-3 border-b">{new Date(event.date).toLocaleDateString()}</td>
                                    <td className="p-3 border-b">{event.time}</td>
                                    <td className="p-3 border-b">{event.status}</td>
                                    <td className="p-3 border-b">{event.participantCount}</td>
                                    <td className="p-3 border-b">{event.conductedBy}</td>
                                    <td className="p-3 border-b">
                                        {event.status === 'Pending Approval' && (
                                            <div className="flex space-x-2">
                                                <button 
                                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                                    onClick={() => approveEvent(event._id)}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                    onClick={() => rejectEvent(event._id)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApproveEvents;
