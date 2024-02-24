import DashboardMenus from "./DashboardMenus";
import UserSummary from "./UserSummary";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 gap-4">
      <div>
        <UserSummary />
      </div>
      <div className="grow">
        <DashboardMenus />
      </div>
      <div>Settings</div>
    </div>
  );
};

export default Sidebar;
