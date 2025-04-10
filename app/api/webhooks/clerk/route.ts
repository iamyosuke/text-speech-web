import { verifyWebhook } from '@clerk/nextjs/webhooks';
import db from '@/app/db/index';
import { users } from '@/app/db/schema';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const evt = (await verifyWebhook(req)) as WebhookEvent;

    if (evt.type === 'user.created') {
      await db.insert(users).values({
        clerkId: evt.data.id,
      });

      console.log('User created:', evt.data.id);
    }

    return new Response('Webhook processed', { status: 200 });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
