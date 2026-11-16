# UNDERATED storefront (Next.js + Supabase + Vercel)
1. Create a Supabase project, run `supabase/schema.sql` in the SQL editor.
2. Copy `.env.example` to `.env.local` and fill in the project URL and anon key (Settings > API).
3. `npm install && npm run dev`
4. Deploy: push to GitHub, import in Vercel, add the same two env vars.
5. Also run `supabase/orders.sql` then `supabase/extras.sql` (stock deduction, events, archives, shipping).
6. Set Paystack webhook to `https://YOUR-DOMAIN/api/paystack/webhook`. Admin lives at `/admin` (basic auth via ADMIN_USER / ADMIN_PASSWORD).
7. Emails use Resend: verify your sending domain, then set RESEND_API_KEY, MAIL_FROM, OWNER_EMAIL.
