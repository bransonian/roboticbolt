import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST() {
  try {
    console.log('API: 1. Starting session creation...');
    console.log('API: 2. Using success URL:', `${process.env.NEXT_PUBLIC_URL}/thank-you`);
    console.log('API: 3. Using cancel URL:', `${process.env.NEXT_PUBLIC_URL}`);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Robotics Market Report 2025-2030',
              description: 'Comprehensive analysis of the robotics industry including market trends, investment opportunities, and detailed sector insights.',
            },
            unit_amount: 29900, // $299.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    });

    console.log('API: 4. Session created successfully:', session.id);
    console.log('API: 5. Session URL:', session.url);
    
    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url // Including the URL as a fallback
    });
  } catch (err) {
    console.error('API Error creating checkout session:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' }, 
      { status: 500 }
    );
  }
}