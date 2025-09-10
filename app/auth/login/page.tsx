import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-[40%] shadow-lg">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
