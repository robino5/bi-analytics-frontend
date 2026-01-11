"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { RoleType } from "@/app/schemas";

interface FilterSectionProps {
  region: string;
  branch: string;
  setBranchName: (value: string) => void;
  regionList: string[];
  branchList: any[];

  setRegion: (value: string) => void;
  setBranch: (value: string) => void;
}

export default function FilterSection({
  region,
  branch,
  regionList,
  branchList,
  setRegion,
  setBranch,
  setBranchName,
}: FilterSectionProps) {
  const { data: session } = useSession();

  const isClusterManager =
    session?.user?.role?.toString() === RoleType.CLUSTER_MANAGER;

  /* 🔹 AUTO SET REGION FOR CLUSTER MANAGER */
  useEffect(() => {
    if (isClusterManager && regionList?.length > 0 && !region) {
      setRegion(regionList[0]);
    }
  }, [isClusterManager, regionList, region, setRegion]);

  const handleClear = () => {
    setRegion("");
    setBranch("");
    setBranchName("");
  };

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-6">

        {/* REGION */}
        <div>
          <Label className="text-white mb-1 block">Region</Label>
          <Select
            onValueChange={(value) => {
              const newRegion = value === "all" ? "" : value;
              if (newRegion !== region && branch) setBranch(""), setBranchName("");
              setRegion(newRegion);
            }}
            value={region}
            disabled={isClusterManager} // 🔹 lock region
          >
            <SelectTrigger className="bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white rounded-lg backdrop-blur-md focus:ring-2 focus:ring-teal-300">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>

            <SelectContent className="bg-gradient-to-br from-[#0c5d68] to-[#033e4a] text-white border border-teal-800">
              {!isClusterManager && (
                <SelectItem value="all" className="hover:bg-white/10">
                  All Regions
                </SelectItem>
              )}

              {regionList.map((r) => (
                <SelectItem key={r} value={r} className="hover:bg-white/10">
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* BRANCH */}
        <div>
          <Label className="text-white mb-1 block">Branch</Label>
          <Select
            onValueChange={(value) => {
              const newBranch = value === "all" ? "" : value;
              setBranch(newBranch);
              if (value === "all") {
                setBranchName("");
              } else {
                const selected = branchList.find(
                  (b) => String(b.branchCode) === value
                );
                setBranchName(selected?.branchName ?? "");
              }
            }}
            value={branch}
            disabled={!region}
          >
            <SelectTrigger className="bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white rounded-lg backdrop-blur-md focus:ring-2 focus:ring-teal-300 disabled:opacity-40">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>

            <SelectContent className="bg-gradient-to-br from-[#0c5d68] to-[#033e4a] text-white border border-teal-800">
              <SelectItem value="all" className="hover:bg-white/10">
                All Branch
              </SelectItem>

              {branchList.map((b) => (
                <SelectItem
                  key={b.branchCode}
                  value={String(b.branchCode)}
                  className="hover:bg-white/10"
                >
                  {b.branchName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CLEAR BUTTON (OMITTED FOR CLUSTER MANAGER) */}
        {!isClusterManager && (
          <div className="flex items-end">
            <button
              onClick={handleClear}
              disabled={!region && !branch}
              className="h-10 px-4 flex items-center gap-2 rounded-full bg-red-500/90 text-white border border-red-400 hover:bg-red-600 hover:border-red-500 disabled:bg-red-500/30 disabled:border-red-500/30 transition"
            >
              <X size={16} />
              <span className="text-sm font-medium">Clear</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
