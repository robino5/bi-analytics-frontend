"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterSectionProps {
  region: string;
  branch: string;
  fromDate: string;
  toDate: string;

  regionList: string[];
  branchList: any[];

  setRegion: (value: string) => void;
  setBranch: (value: string) => void;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
}

export default function FilterSection({
  region,
  branch,
  fromDate,
  toDate,
  regionList,
  branchList,
  setRegion,
  setBranch,
  setFromDate,
  setToDate,
}: FilterSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* REGION */}
      <div>
        <Label className="text-white mb-1 block">Region</Label>
        <Select onValueChange={setRegion} value={region}>
          <SelectTrigger className="
            bg-gradient-to-r from-white/10 to-white/5 
            border border-white/20 text-white 
            placeholder:text-white/50 rounded-lg backdrop-blur-md
            focus:ring-2 focus:ring-teal-300
          ">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent className="bg-gradient-to-br from-[#0c5d68] to-[#033e4a] text-white border border-teal-800">
            {regionList.map((r) => (
              <SelectItem key={r} value={r} className="hover:bg-white/10 cursor-pointer">
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* BRANCH */}
      <div>
        <Label className="text-white mb-1 block">Branch</Label>
        <Select onValueChange={setBranch} value={branch} disabled={!region}>
          <SelectTrigger className="
            bg-gradient-to-r from-white/10 to-white/5 
            border border-white/20 text-white rounded-lg backdrop-blur-md
            focus:ring-2 focus:ring-teal-300 disabled:opacity-40
          ">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent className="bg-gradient-to-br from-[#0c5d68] to-[#033e4a] text-white border border-teal-800">
            {branchList.map((b) => (
              <SelectItem key={b.branchCode} value={String(b.branchCode)} className="hover:bg-white/10 cursor-pointer">
                {b.branchName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* FROM DATE */}
      <div>
        <Label className="text-white mb-1 block">From Date</Label>
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="
            bg-gradient-to-r from-white/10 to-white/5 
            border border-white/20 text-white rounded-lg 
            backdrop-blur-md focus:ring-2 focus:ring-teal-300
          "
        />
      </div>

      {/* TO DATE */}
      <div>
        <Label className="text-white mb-1 block">To Date</Label>
        <Input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="
            bg-gradient-to-r from-white/10 to-white/5 
            border border-white/20 text-white rounded-lg 
            backdrop-blur-md focus:ring-2 focus:ring-teal-300
          "
        />
      </div>

    </div>
  );
}
