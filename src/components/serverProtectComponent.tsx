import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ProtectedProps = {
  children: React.ReactNode;
};
const ServerProtectComponent = ({ children }: ProtectedProps) => {
  const token = cookies().get("token");

  if (!token) {
    redirect("/login");
  }
  return <>{children}</>;
};

export default ServerProtectComponent;
