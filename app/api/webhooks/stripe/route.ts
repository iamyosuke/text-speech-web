import db from "@/app/db";
import { subscriptions, users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const reqText = await req.text();
  console.log('🔄 Webhook request received');
  return webhooksHandler(reqText, req);
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted"
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const subscriptionData = {
    subscriptionId: subscription.id,
    stripeUserId: subscription.customer as string,
    status: subscription.status,
    startDate: new Date(subscription.created * 1000).toISOString(),
    userId: subscription.metadata?.userId || "",
    email: customerEmail,
  };

  try {
    if (type === "deleted") {
      await db
        .update(subscriptions)
        .set({
          status: "cancelled",
          email: customerEmail,
        })
        .where(eq(subscriptions.subscriptionId, subscription.id));

      await db
        .update(users)
        .set({ subscription: null })
        .where(eq(users.email, customerEmail));
    } else {
      if (type === "created") {
        await db
          .insert(subscriptions)
          .values(subscriptionData)
          .returning();
      } else {
        await db
          .update(subscriptions)
          .set(subscriptionData)
          .where(eq(subscriptions.subscriptionId, subscription.id))
          .returning();
      }
    }

    return NextResponse.json({
      status: 200,
      message: `Subscription ${type} success`,
    });
  } catch (error) {
    console.error(`Error during subscription ${type}:`, error);
    return NextResponse.json({
      status: 500,
      error: `Error during subscription ${type}`,
    });
  }
}

async function webhooksHandler(
  reqText: string,
  request: NextRequest
): Promise<NextResponse> {
  const sig = request.headers.get("Stripe-Signature");
  console.log('🔑 Stripe signature present:', !!sig);

  try {
    const event = await stripe.webhooks.constructEventAsync(
      reqText,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created");
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated");
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted");
      default:
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}
