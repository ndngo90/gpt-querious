import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen justify-center items-center flex">
      <SignUp path="/sign-up" />
    </div>
  );
}
