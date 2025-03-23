// import { Webhook } from 'svix';
// import { headers } from 'next/headers';
// import { supabase } from '@/lib/supabase';

// export async function POST(req: Request) {
//   const payload = await req.json();
//   const headerList = headers();
//   const svix_id = headerList.get('svix-id');
//   const svix_timestamp = headerList.get('svix-timestamp');
//   const svix_signature = headerList.get('svix-signature');

//   const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//   let evt;

//   try {
//     evt = wh.verify(JSON.stringify(payload), {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     });
//   } catch (err) {
//     return new Response('Invalid signature', { status: 400 });
//   }

//   const { id, email_addresses, first_name, last_name } = evt.data;

//   // Sync user with Supabase
//   const { data, error } = await supabase
//     .from('UserInfo')
//     .upsert([{ user_id: id, email: email_addresses[0].email_address, firstname: first_name, lastname: last_name }]);

//   if (error) {
//     return new Response('Error syncing user with Supabase', { status: 500 });
//   }

//   return new Response('User synced with Supabase', { status: 200 });
// }