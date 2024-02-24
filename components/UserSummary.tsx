import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserSummary() {
  return (
    <div className="flex justify-around items-center bg-gray-200 p-2 rounded-[10px] hover:bg-gray-300 cursor-pointer">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JI</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="font-semibold">K.M Jiaul Islam Jibon</p>
        <p className="text-[12px]">Senior Asst. Director</p>
      </div>
    </div>
  );
}
