import { UserCheck, UserPlus, UserX, Sparkles } from "lucide-react";

export default function EkycInfo({ eKYC }: { eKYC: any }) {
    return (
        <div className="w-full">
             <div >
                <div className="grid grid-cols-12 gap-4 w-full">
                    <div className="col-span-12 w-full p-4 py-2 rounded-xl shadow-md bg-white/90 backdrop-blur-lg">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1 flex justify-center items-center p-2 text-red-500">
                                <Sparkles size={24} />
                            </div>
                            <div className="col-span-8">
                                <p className="text-gray-600">Electronic Know Your Customer </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 w-full mt-2">
                    {/* Green Card */}
                    <div className="w-full p-4 py-2 rounded-xl shadow-md bg-teal-100">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex justify-center items-center p-2 rounded-md text-white bg-teal-500">
                                <UserPlus size={20} />
                            </div>
                            <div className="col-span-8">
                                <h4 className="text-lg font-bold text-teal-800">  {eKYC?.detail?.sumOfTotalInvestor || 0}</h4>
                                <p className="text-gray-600">Total</p>
                            </div>
                        </div>
                    </div>

                    {/* Yellow Card */}
                    <div className="w-full p-4 py-2 rounded-xl shadow-md bg-green-100">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex justify-center items-center p-2 rounded-md text-white bg-green-500">
                                <UserCheck size={20} />
                            </div>
                            <div className="col-span-8">
                                <h4 className="text-lg font-bold text-green-800">{eKYC?.detail?.sumOfTotalSubmitted || 0}</h4>
                                <p className="text-gray-600">Submitted</p>
                            </div>
                        </div>
                    </div>

                    {/* Red Card */}
                    <div className="w-full p-4 py-2 rounded-xl shadow-md bg-red-100">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex justify-center items-center p-2 rounded-md text-white bg-red-500">
                                <UserX size={20} />
                            </div>
                            <div className="col-span-8">
                                <h4 className="text-lg font-bold text-red-800"> {eKYC?.detail?.sumOfDue || 0}</h4>
                                <p className="text-gray-600">Due</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}