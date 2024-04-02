import Image from "next/image";
import Link from "next/link";
import { PiSealWarningDuotone } from "react-icons/pi";
import { AiTwotoneHome } from "react-icons/ai";

const UnauthorizedAccess = () => {
  return (
    <div className="grid w-screen/2 h-screen place-items-center">
      <div className="text-center">
        <Image
          src="/undraw_access_denied.svg"
          alt="permission-denied"
          width={300}
          height={280}
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-800">
          403
        </h1>
        <p className="text-xl text-muted-foreground font-bold flex justify-center items-center">
          <PiSealWarningDuotone className="h-6 w-6 mr-4 text-red-700" />
          <span className="text-destructive">Forbidden Access</span>
        </p>
        <Link
          href="/"
          className="text-white bg-[#050708] mt-4 hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
        >
         <AiTwotoneHome className="h-4 w-4 mr-2"/>
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
