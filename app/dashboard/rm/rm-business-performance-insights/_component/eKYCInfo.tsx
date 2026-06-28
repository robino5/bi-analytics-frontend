import { UserCheck, UserPlus, UserX, Sparkles } from "lucide-react";
type EkycInfoProps = {  
    eKYC: any;
    branch?: string;
    trader?: string;
};
export default function EkycInfo({ eKYC, branch, trader }: EkycInfoProps) {
    const isArray = Array.isArray(eKYC);

    const get = (obj: any, path: string) => {
        return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    };

    const rawList = isArray ? eKYC : (Array.isArray(eKYC?.data) ? eKYC.data : []);
    
    const filteredList = rawList.filter((item: any) => {
        if (branch && branch !== '' && branch !== 'All') {
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
        totalInvestor: sumField(filteredList, 'totalInvestor'),
        totalSubmitted: sumField(filteredList, 'totalSubmitted'),
        due: sumField(filteredList, 'due'),
    };

    return (
        <div className="w-full overflow-hidden">
             <div className="mt-5 mb-12" >
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
                    <div className="w-full p-4 py-2 rounded-xl shadow-md bg-lime-100">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex justify-center items-center p-2 rounded-md text-white bg-lime-500">
                                <UserPlus size={20} />
                            </div>
                            <div className="col-span-8">
                                <h4 className="text-lg font-bold text-lime-800">  {totals.totalInvestor || 0}</h4>
                                <p className="text-gray-600">Total</p>
                            </div>
                        </div>
                    </div>
                    {/* Yellow Card */}
                    <div className="w-full p-4 py-2 rounded-xl shadow-md bg-indigo-100">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex justify-center items-center p-2 rounded-md text-white bg-indigo-500">
                                <UserCheck size={20} />
                            </div>
                            <div className="col-span-8">
                                <h4 className="text-lg font-bold text-indigo-800">{totals.totalSubmitted || 0}</h4>
                                <p className="text-gray-600">Submitted</p>
                            </div>
                        </div>
                    </div>
                    {/* Red Card */}
                    <div className="w-full p-4 py-2 rounded-xl shadow-md bg-orange-100">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-4 flex justify-center items-center p-2 rounded-md text-white bg-orange-500">
                                <UserX size={20} />
                            </div>
                            <div className="col-span-8">
                                <h4 className="text-lg font-bold text-orange-800"> {totals.due || 0}</h4>
                                <p className="text-gray-600">Due</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}