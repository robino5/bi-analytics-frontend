import DashboardMenus from "./DashboardMenus";
import UserSummary from "./UserSummary";
import Logout from "./logout";

const Sidebar = () => {
  return (
    <div className="fixed flex flex-col w-[300px] min-w-[300px] gap-4 p-4 min-h-screen">
      <div>
        <UserSummary />
      </div>
      <div className="grow">
        <DashboardMenus />
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
