import { UserCheck, UserPlus, UserX, Sparkles, Users, User } from "lucide-react";

type ECRMInfoProps = {
    eCRM: any;
    branch?: string;
    trader?: string;
};

export default function EcrmInfo({ eCRM, branch, trader }: ECRMInfoProps) {
    const isArray = Array.isArray(eCRM);

    const get = (obj: any, path: string) => {
        return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    };

    const rawList = isArray ? eCRM : (Array.isArray(eCRM?.data) ? eCRM.data : []);

    const filteredList = rawList.filter((item: any) => {
        if (branch && branch !== "" && branch !== "All") {
            if (String(item.branchCode || item.branch_code || item.branch || item.branchName).trim() !== String(branch).trim()) return false;
        }
        if (trader && trader !== "" && trader !== "All") {
            if (String(item.traderId || item.trader_id || item.trader).trim() !== String(trader).trim()) return false;
        }
        return true;
    });

    const sumField = (arr: any[], path: string) => {
        return arr.reduce((s, it) => {
            const v = get(it, path);
            const n = typeof v === 'number' ? v : Number(v || 0);
            return s + (isNaN(n) ? 0 : n);
        }, 0);
    };

    const totals = {
        totalInProgress: isArray || Array.isArray(eCRM?.data) ? sumField(filteredList, 'totalInProgress') : eCRM?.totalInProgress || 0,
        totalSuccess: isArray || Array.isArray(eCRM?.data) ? sumField(filteredList, 'totalSuccess') : eCRM?.totalSuccess || 0,
        totalDiscard: isArray || Array.isArray(eCRM?.data) ? sumField(filteredList, 'totalDiscard') : eCRM?.totalDiscard || 0,
        totalVisits: isArray || Array.isArray(eCRM?.data) ? sumField(filteredList, 'totalVisits') : eCRM?.totalVisits || 0,
        detailExistingClientVisit: isArray || Array.isArray(eCRM?.data) ? sumField(filteredList, 'detail.totalExistingClientVisit') : eCRM?.detail?.totalExistingClientVisit || 0,
    };
    return (
        <div className="w-full overflow-hidden">
            <div >
                <div className="grid grid-cols-12 gap-4 w-full">
                    <div className="col-span-12 w-full p-4 py-2 rounded-xl shadow-md bg-white/90 backdrop-blur-lg">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1 flex justify-center items-center p-2 text-red-500">
                                <Sparkles size={24} />
                            </div>
                            <div className="col-span-8">
                                <p className="text-gray-600">Electronic Customer Relationship Management</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 w-full mt-2">
                    {/* Green Card */}
                    <div className="w-full p-4 py-2 rounded-xl shadow-md bg-green-100">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex justify-center items-center p-2 rounded-md text-white bg-green-500">
                                <UserPlus size={20} />
                            </div>
                            <div className="col-span-8">
                                <h4 className="text-lg font-bold text-green-800">  {totals.totalInProgress || 0}</h4>
                                <p className="text-gray-600">In Process</p>
                            </div>
                        </div>
                    </div>

                    {/* Yellow Card */}
                    <div className="w-full p-4 py-2 rounded-xl shadow-md bg-yellow-100">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex justify-center items-center p-2 rounded-md text-white bg-yellow-500">
                                <UserCheck size={20} />
                            </div>
                            <div className="col-span-8">
                                <h4 className="text-lg font-bold text-yellow-800">{totals.totalSuccess || 0}</h4>
                                <p className="text-gray-600">Success</p>
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
                                <h4 className="text-lg font-bold text-red-800"> {totals.totalDiscard || 0}</h4>
                                <p className="text-gray-600">Discard</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Purple Card */}
                <div className="grid grid-cols-12 gap-4 mt-2">
                    <div className="col-span-6 w-full p-4 py-2 rounded-xl shadow-md bg-purple-100">
                        <div className="grid grid-cols-6 gap-4 items-center">
                            <div className="col-span-2 flex justify-center items-center p-3 rounded-md text-white bg-purple-500">
                                <User size={20} />
                            </div>
                            <div className="col-span-4">
                                <h4 className="text-lg font-bold text-purple-800">{totals.detailExistingClientVisit || 0}</h4>
                                <p className="text-gray-600">Existing Client Visits</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 w-full p-4 py-2 rounded-xl shadow-md bg-teal-100">
                        <div className="grid grid-cols-6 gap-4 items-center">
                            <div className="col-span-2 flex justify-center items-center p-3 rounded-md text-white bg-teal-500">
                                <Users size={20} />
                            </div>
                            <div className="col-span-4">
                                <h4 className="text-lg font-bold text-teal-800">{totals.totalVisits || 0}</h4>
                                <p className="text-gray-600">Total Visits</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}