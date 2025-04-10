import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default async function Pricing() {
  const link = process.env.MONTHLY_SUBSCRIPTION_PAYMENT_LINK;
  const user = await currentUser();

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">Pricing that Scales with You</h1>
          <p>Transform your voice into organized notes with our powerful speech recognition technology. Choose the plan that best fits your note-taking needs.</p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
          <div className="rounded-(--radius) flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
            <div className="space-y-4">
              <div>
                <h2 className="font-medium">Free</h2>
                <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                <p className="text-muted-foreground text-sm">Per Month</p>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href="">Get Started</Link>
              </Button>

              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {['10 seconds Recording Time', 'Basic Speech Recognition', 'Simple Note Export'].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dark:bg-muted rounded-(--radius) border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium">Pro</h2>
                  <span className="my-3 block text-2xl font-semibold">$7 / mo</span>
                  <p className="text-muted-foreground text-sm">Per Month</p>
                </div>
                <SignedIn>
                  <Button asChild className="w-full">
                    <Link href={`${link}?prefilled_email=${user?.emailAddresses[0]?.emailAddress || ''}`}>Subscribe</Link>
                  </Button>
                </SignedIn>
                <SignedOut>
                  <Button asChild className="w-full">
                    <SignInButton>
                      <button>Sign In To Subscribe!</button>
                    </SignInButton>
                  </Button>
                </SignedOut>
              </div>

              <div>
                <div className="text-sm font-medium">Everything in free plus :</div>

                <ul className="mt-4 list-outside space-y-3 text-sm">
                  {['10 Minutes Recording Time', '1GB Cloud Storage', 'Basic Speech Recognition', 'Simple Note Export'].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
