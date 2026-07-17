# Skill Bridge

Skill Bridge is a full-stack tutor discovery and booking platform built with Next.js. Students can find tutors, book sessions, and pay securely, while tutors manage their availability and earnings — all through role-based dashboards for Students, Tutors, and Admins.

## Features

- 🔍 **Tutor Discovery** — Search and filter tutors by subject, availability, rating, and price
- 📅 **Booking System** — Real-time session scheduling and booking management
- 💳 **Payments** — Secure checkout powered by Stripe
- 🔐 **Role-Based Access Control (RBAC)** — Separate, permission-scoped experiences for Students, Tutors, and Admins
- 🎓 **Student Dashboard** — View bookings, upcoming sessions, payment history, and favorite tutors
- 👨‍🏫 **Tutor Dashboard** — Manage availability, view bookings, track earnings, and update profile
- 🛠️ **Admin Dashboard** — Manage users, monitor bookings, oversee payments, and platform analytics
- 📱 **Responsive UI** — Fully responsive design built with Tailwind CSS

## Tech Stack

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS

**Backend**
- Node.js / Express.js (or Next.js API routes)
- PostgreSQL
- Prisma ORM

**Authentication**
- JWT / NextAuth.js

**Payments**
- Stripe

## User Roles

| Role    | Access |
|---------|--------|
| Student | Search tutors, book sessions, make payments, view booking history |
| Tutor   | Manage availability, accept/reject bookings, view earnings |
| Admin   | Manage all users, monitor platform activity, handle disputes/refunds |

## Getting Started

### Prerequisites

- Node.js (v18+)
- Bun (or npm/yarn)
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/skill-bridge.git
cd skill-bridge

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/skillbridge"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
JWT_SECRET="your-jwt-secret"
```

### Database Setup

```bash
# Run Prisma migrations
bunx prisma migrate dev

# Generate Prisma client
bunx prisma generate

# (Optional) Seed the database
bunx prisma db seed
```

### Run the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
skill-bridge/
├── src/
│   ├── app/
│   │   ├── (auth)/            # Login, register pages
│   │   ├── (dashboard)/
│   │   │   ├── student/       # Student dashboard
│   │   │   ├── tutor/         # Tutor dashboard
│   │   │   └── admin/         # Admin dashboard
│   │   ├── api/                # API routes
│   │   └── layout.tsx
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Utilities, Prisma client, auth config
│   ├── middleware.ts           # Role-based route protection
│   └── styles/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── .env.example
└── README.md
```

## Roadmap

- [ ] Real-time chat between students and tutors
- [ ] Video call integration for sessions
- [ ] Review and rating system
- [ ] bKash / Nagad payment integration
- [ ] Email/SMS notifications

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/your-username/skill-bridge/issues).

## License

This project is licensed under the MIT License.

## Author

**Mahmud Reza Rafsun**
Full-Stack Developer
