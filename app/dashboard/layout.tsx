import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function JoinLayout({ children }: { children: React.ReactNode}) {

  const session = await getServerSession(authOptions);

  if ( !session ) {
    redirect('/api/auth/signin');
  }

  return (
    { children }
  );
}


