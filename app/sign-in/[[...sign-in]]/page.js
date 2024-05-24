import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen justify-center items-center flex">
      <SignIn path="/sign-in" />
    </div>
  );
}
