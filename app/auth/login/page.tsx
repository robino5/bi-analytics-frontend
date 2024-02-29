import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const LoginPage = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-[40%] shadow-lg bg-gradient-to-bl from-gray-100 to-gray-200 via-transparent">
        <CardContent>
            <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
