
# Technical Architecture Document
Website Audio Converter

## 1. Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Framer Motion untuk animasi
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Backend
- **API Routes**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Audio Conversion**: FFmpeg.wasm (client-side) + placeholder untuk backend conversion
- **YouTube/SoundCloud**: Placeholder API endpoints
- **Payment Gateway**: Stripe integration
- **Roblox API**: Placeholder untuk integration

## 2. Project Structure

```
audioconverter/
├── .trae/
│   └── documents/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (main)/
│   │   ├── dashboard/
│   │   ├── convert/
│   │   └── pricing/
│   ├── api/
│   │   ├── auth/
│   │   ├── convert/
│   │   └── subscription/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   └── features/
├── lib/
│   ├── utils.ts
│   ├── supabase.ts
│   └── auth.ts
├── public/
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

## 3. Database Schema (Supabase)

### users
- id (uuid, primary key)
- email (text, unique)
- username (text)
- subscription_tier (text: free, premium)
- created_at (timestamp)

### conversions
- id (uuid, primary key)
- user_id (uuid, foreign key)
- source_type (text: file, youtube, soundcloud, roblox)
- source_url (text)
- output_format (text)
- status (text: pending, processing, completed, failed)
- created_at (timestamp)

### subscriptions
- id (uuid, primary key)
- user_id (uuid, foreign key)
- stripe_subscription_id (text)
- tier (text)
- current_period_end (timestamp)
- is_active (boolean)

## 4. Key Implementation Steps
1. Inisialisasi Next.js project dengan Tailwind CSS
2. Setup Supabase dan NextAuth.js untuk authentication
3. Implementasi halaman utama dan layout
4. Implementasi fitur audio conversion dengan FFmpeg.wasm
5. Integrasi YouTube/SoundCloud URL parsing (placeholder)
6. Setup Stripe untuk subscription
7. Implementasi Roblox API integration (placeholder)
8. Testing dan optimisasi
