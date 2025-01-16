"use client";
import React, { useState } from "react";
import DashboardMenus from "./DashboardMenus";
import UserSummary from "./UserSummary";
import Logout from "./logout";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // FontAwesome icons

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`fixed flex flex-col p-4 min-h-screen bg-[#5a6c82] transition-all duration-300 ${collapsed ? "w-[50px] min-w-[50px]" : "w-[300px] min-w-[300px]"}`}
    >
      {/* Arrow button */}
      <div className="absolute" style={{ top: '68px', right: '-9px' }}>
        <button
          onClick={toggleSidebar}
          className="bg-red-500 text-white rounded-full p-1 shadow-lg"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>

      {/* User Summary */}
      <div className="">
        {!collapsed && <UserSummary />}
      </div>

      {/* Dashboard Menus */}
      <div className="mt-4">
        {!collapsed && <DashboardMenus />}
      </div>

      {/* Logout at the bottom */}
      <div className="mt-auto">
        {!collapsed && <Logout />}
      </div>
    </div>
  );
};

export default Sidebar;

