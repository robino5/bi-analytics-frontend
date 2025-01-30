import React from "react";
import { UserCheck, UserPlus, UserX, Sparkles, Users, User } from "lucide-react";

// Define the type for visitedata
type Visitedata = {
    total_Visits: number;
    success: number;
    inProgress: number;
    discard: number;
    existingClientVisit: number;
};

const EcrmDetails = ({ visitedata }: { visitedata: Visitedata }) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-span-12 w-full p-4 rounded-xl shadow-md bg-white/90 backdrop-blur-lg">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1 flex justify-center items-center p-3 text-red-500">
              <Sparkles size={30} />
            </div>
            <div className="col-span-8">
              <h2 className="text-2xl font-bold text-black">eCRM</h2>
              <p className="text-gray-600">Electronic Customer Relationship Management</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full mt-4">
        {/* Green Card */}
        <div className="w-full p-4 rounded-xl shadow-md bg-green-100">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4 flex justify-center items-center p-3 rounded-md text-white bg-green-500">
              <UserPlus size={24} />
            </div>
            <div className="col-span-8">
              <h2 className="text-2xl font-bold text-green-800">{visitedata.inProgress}</h2>
              <p className="text-gray-600">In Process</p>
            </div>
          </div>
        </div>

        {/* Yellow Card */}
        <div className="w-full p-4 rounded-xl shadow-md bg-yellow-100">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4 flex justify-center items-center p-3 rounded-md text-white bg-yellow-500">
              <UserCheck size={24} />
            </div>
            <div className="col-span-8">
              <h2 className="text-2xl font-bold text-yellow-800">{visitedata.success}</h2>
              <p className="text-gray-600">Success</p>
            </div>
          </div>
        </div>

        {/* Red Card */}
        <div className="w-full p-4 rounded-xl shadow-md bg-red-100">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4 flex justify-center items-center p-3 rounded-md text-white bg-red-500">
              <UserX size={24} />
            </div>
            <div className="col-span-8">
              <h2 className="text-2xl font-bold text-red-800">{visitedata.discard}</h2>
              <p className="text-gray-600">Discard</p>
            </div>
          </div>
        </div>
      </div>
      {/* Purple Card */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-6 w-full p-4 rounded-xl shadow-md bg-purple-100">
          <div className="grid grid-cols-6 gap-4 items-center">
            <div className="col-span-2 flex justify-center items-center p-3 rounded-md text-white bg-purple-500">
              <User size={24} />
            </div>
            <div className="col-span-4">
              <h2 className="text-2xl font-bold text-purple-800">{visitedata.existingClientVisit}</h2>
              <p className="text-gray-600">Existing Client Visits</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 w-full p-4 rounded-xl shadow-md bg-teal-100">
          <div className="grid grid-cols-6 gap-4 items-center">
            <div className="col-span-2 flex justify-center items-center p-3 rounded-md text-white bg-teal-500">
              <Users size={24} />
            </div>
            <div className="col-span-4">
              <h2 className="text-2xl font-bold text-teal-800">{visitedata.total_Visits}</h2>
              <p className="text-gray-600">Total Visits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcrmDetails;
