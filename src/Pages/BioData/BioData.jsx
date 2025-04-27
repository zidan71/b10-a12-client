import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const divisions = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];

const BioData = () => {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedAge, setSelectedAge] = useState(0);

  const { data: biodata = [] } = useQuery({
    queryKey: ['biodata'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/biodatas');
      return res.data;
    }
  });

  // Filtering Logic
  const filteredBiodata = biodata.filter(data => {
    const matchesDivision = selectedDivision ? data.permanentDivision === selectedDivision : true;
    const matchesType = selectedType ? data.biodataType === selectedType : true;
    const matchesAge = selectedAge ? data.age >= selectedAge : true;
    return matchesDivision && matchesType && matchesAge;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">All Biodatas: {filteredBiodata.length}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Side - Filters */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Filter</h2>

          {/* Filter by Division */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Division</label>
            <select
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setSelectedDivision(e.target.value)}
              value={selectedDivision}
            >
              <option value="">All</option>
              {divisions.map(division => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
          </div>

          {/* Filter by Biodata Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Biodata Type</label>
            <select
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Filter by Minimum Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Minimum Age</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter minimum age"
              value={selectedAge}
              onChange={(e) => setSelectedAge(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Right Side - Biodata Cards */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBiodata.map(data => (
            <div key={data._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={data.profileImage} alt={data.biodataType} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-purple-700">{data.biodataType}</h3>
                <p className="text-gray-600">Biodata ID: {data.biodataId}</p>
                <p className="text-gray-600">Division: {data.permanentDivision}</p>
                <p className="text-gray-600">Age: {data.age}</p>
                <p className="text-gray-600">Occupation: {data.occupation}</p>
               <Link to={`/biodata/${data._id}`}>
               <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full w-full transition">
                  View Profile
                </button>
               </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BioData;
