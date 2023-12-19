import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function JoinLayout( {children} : { children: React.ReactNode }) {  
  return (
    <div>
      { children }
    </div>
  );
}