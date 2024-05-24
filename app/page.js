import Link from 'next/link';
import { SignedIn, UserButton, SignInButton, SignedOut } from '@clerk/nextjs';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="my-auto text-center max-w-md space-y-8">
        <h1 className="font-bold text-5xl text-blue-400">GPTQuerious</h1>
        <p className="text-gray-700 font-medium">
          Whether you’re exploring solo or with friends, GPT Querious is your
          trusty sidekick. Download it now and unlock stress-free travel!
        </p>
        <SignedOut>
          <SignInButton>
            <button className="btn btn-primary text-gray-300  text-lg font-medium capitalize">
              Get Start
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* <Link
            href="/chat"
            className="btn text-gray-300 btn-primary text-lg font-medium capitalize"
          >
            get start
          </Link> */}
        {/* </SignedIn> */}
      </div>
    </main>
  );
}
