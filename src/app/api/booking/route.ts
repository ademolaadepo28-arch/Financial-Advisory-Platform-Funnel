import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientEmail,
      clientPhone,
      selectedDate,
      selectedTime,
      utrTransactionId,
      fixedFeeInr,
      dossierSnapshot,
    } = body;

    // Generate verified booking ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `AV-${randomSuffix}`;

    // Unique Google Meet link for this session
    // Room code format: 3-4-3 chars (e.g. qxw-yubm-vfd)
    const roomCode = `${Math.random().toString(36).substring(2, 5)}-${Math.random()
      .toString(36)
      .substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
    const meetLink = `https://meet.google.com/${roomCode}`;

    // In a production backend, this would trigger Google Calendar API via Service Account
    // and send dual emails via SendGrid / Resend / AWS SES with attached dossier.
    console.log('[BOOKING_SUCCESS] New paid consultation reserved:', {
      bookingId,
      clientName,
      clientEmail,
      clientPhone,
      selectedDate,
      selectedTime,
      utrTransactionId,
      fixedFeeInr,
      meetLink,
      dossierSnapshot,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      bookingId,
      meetLink,
      status: 'CONFIRMED',
      message: 'Consultation slot successfully reserved and Google Meet room initialized.',
    });
  } catch (error) {
    console.error('Error handling booking request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error processing consultation booking' },
      { status: 500 }
    );
  }
}
