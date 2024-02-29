import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
