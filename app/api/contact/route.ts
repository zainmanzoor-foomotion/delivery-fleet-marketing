import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, companyName, phone, message } = await req.json()

    if (!name || !email || !companyName || !phone || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"My Delivery Fleet" <${process.env.GMAIL_USER}>`,
      to: 'admin@mydeliveryfleet.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td style="font-weight:600;color:#475569;">Name</td><td>${name}</td></tr>
          <tr><td style="font-weight:600;color:#475569;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="font-weight:600;color:#475569;">Company</td><td>${companyName}</td></tr>
          <tr><td style="font-weight:600;color:#475569;">Phone</td><td>${phone}</td></tr>
          <tr><td style="font-weight:600;color:#475569;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${message}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
