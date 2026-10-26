// Vercel serverless function: sends the contact form through Resend.
// Set RESEND_API_KEY (and optionally CONTACT_TO / CONTACT_FROM) in the Vercel project's environment variables.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(501).json({ ok: false, error: 'not configured' })
  const { email, message, company } = req.body || {}
  if (company) return res.status(200).json({ ok: true }) // honeypot
  if (!email || !message || String(message).length > 5000 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ ok: false })
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'kerminadavid@icloud.com'],
      reply_to: email,
      subject: 'New message from your portfolio',
      text: `From: ${email}\n\n${message}`,
    }),
  })
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok })
}
