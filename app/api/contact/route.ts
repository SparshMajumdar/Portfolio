import { NextResponse } from 'next/server';
import { ContactFormSchema, submitContactForm } from '@/lib/mongo';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const parsed = ContactFormSchema.safeParse(body);

    if (!parsed.success) {
      console.warn('⚠️ Validation error:', parsed.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const result = await submitContactForm(parsed.data);

    return NextResponse.json(
      {
        success: result.success,
        insertedId: result.insertedId ?? null,
        error: result.success ? null : result.error,
      },
      {
        status: result.success ? 200 : 500,
      }
    );
  } catch (error) {
    console.error('❌ API Error in POST /api/contact:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
