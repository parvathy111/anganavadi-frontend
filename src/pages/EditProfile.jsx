import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBirthdayCake, FaHome, FaTransgender, FaBaby, FaChild } from "react-icons/fa";
import api from "../config/axiosinstance";

const EditProfile = () => {
    const { userType } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullname: "",
        localBody: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
        anganwadiNo: "",
        childname: "",
        fathername: "",
        mothername: "",
        dob: "",
        prevNumPreg: "",
        deliveryDate: ""
    });

    useEffect(() => {
        api.get(`/supervisor/profile/${userType}`)
            .then(response => {
                setFormData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching profile data:", error);
                setLoading(false);
            });
    }, [userType]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/supervisor/edit-profile/${userType}`, formData);
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    };

    const icons = {
        fullname: <FaUser className="text-orange-500" />,
        name: <FaUser className="text-orange-500" />,
        localBody: <FaMapMarkerAlt className="text-orange-500" />, 
        gender: <FaTransgender className="text-orange-500" />,
        address: <FaHome className="text-orange-500" />,
        phone: <FaPhone className="text-orange-500" />,
        email: <FaEnvelope className="text-orange-500" />,
        anganwadiNo: <FaMapMarkerAlt className="text-orange-500" />,
        childname: <FaChild className="text-orange-500" />,
        fathername: <FaUser className="text-orange-500" />,
        mothername: <FaUser className="text-orange-500" />,
        dob: <FaBirthdayCake className="text-orange-500" />,
        prevNumPreg: <FaBaby className="text-orange-500" />,
        deliveryDate: <FaBirthdayCake className="text-orange-500" />
    };

    const renderInputs = (fields) =>
        fields.map(({ name, type, placeholder }) => (
            <div key={name} className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">{placeholder}</label>
                <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-500">{icons[name]}</span>
                    <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="border rounded-lg pl-10 pr-4 py-2 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 w-full"
                        required
                        disabled={name === "email"}
                    />
                </div>
            </div>
        ));

    const inputGroups = {
        supervisor: [
            { name: "fullname", type: "text", placeholder: "Full Name" },
            { name: "localBody", type: "text", placeholder: "Local Body" },
            { name: "gender", type: "text", placeholder: "Gender" },
            { name: "address", type: "text", placeholder: "Address" },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "email", type: "email", placeholder: "Email" }
        ],
        worker: [
            { name: "name", type: "text", placeholder: "Name" },
            { name: "anganwadiNo", type: "text", placeholder: "Anganwadi Number" },
            { name: "gender", type: "text", placeholder: "Gender" },
            { name: "address", type: "text", placeholder: "Address" },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "dob", type: "date", placeholder: "Date of Birth" },
            { name: "email", type: "email", placeholder: "Email" }
        ],
        parent: [
            { name: "childname", type: "text", placeholder: "Child's Name" },
            { name: "dob", type: "date", placeholder: "Date of Birth" },
            { name: "gender", type: "text", placeholder: "Gender" },
            { name: "fathername", type: "text", placeholder: "Father's Name" },
            { name: "mothername", type: "text", placeholder: "Mother's Name" },
            { name: "address", type: "text", placeholder: "Address" },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "anganwadiNo", type: "text", placeholder: "Anganwadi Number" },
            { name: "email", type: "email", placeholder: "Email" }
        ],
        preglac: [ 
            { name: "fullname", type: "text", placeholder: "Full Name" },
            { name: "deliveryDate", type: "date", placeholder: "Expected Delivery Date" },
            { name: "prevNumPreg", type: "number", placeholder: "Number of Previous Pregnancies" },
            { name: "address", type: "text", placeholder: "Address" },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "anganwadiNo", type: "text", placeholder: "Anganwadi Number" },
            { name: "email", type: "email", placeholder: "Email" }
        ]
    };

    return (
        <>
        <div>
             <h2 className="text-2xl font-bold text-orange-500 mt-2 ml-5 mb-2 text-left flex items-center gap-2">
                <FaUser className="text-orange-500 text-3xl" /> Edit Profile
            </h2>
            <p className="ml-15 text-gray-400">You can edit your profile here.</p>
        </div>
        
        <div className="max-w-2xl mt-4 mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200">
           
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {renderInputs(inputGroups[userType] || [])}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
        </>
    );
};

export default EditProfile;
