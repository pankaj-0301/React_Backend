```markdown
# Splitwise- Backend (Next.js + Prisma + PostgreSQL)

This is a backend service built using [Next.js](https://nextjs.org/) API routes, [Prisma](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/) (via Supabase). It provides APIs for managing users, transactions, friendships, and splitting expenses among friends.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) or a Supabase database

### Installation
 the repository and install dependencies:

```bash
git  <repo_url>
cd splitwise-backend
npm install
```

### Environment Setup
Create a `.env` file in the root directory and add the following variables:

```bash
DATABASE_URL=<your_postgres_connection_url>
DIRECT_URL=<your_postgres_direct_url>
EXPO_PUBLIC_SUPABASE_URL=<your_supabase_url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### Database Setup
Run the following Prisma commands to set up the database:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Seed the database with sample data:

```bash
npx prisma db seed
```

### Running the Server
Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the API.

## API Endpoints

### Fetch User Transactions
```http
GET /api/transactions
```
- Requires authentication
- Returns a list of transactions for the authenticated user

### Fetch User Friends
```http
GET /api/friends?userId=<user_id>
```
- Requires authentication
- Returns a list of friends for the requested user

### Split a Transaction
```http
POST /api/split
Content-Type: application/json
{
  "transactionId": "<id>",
  "friendIds": ["<id1>", "<id2>"]
}
```
- Requires authentication
- Associates the given transaction with the specified friends

## Deployment
The easiest way to deploy this backend is using [Vercel](https://vercel.com/):

```bash
npm run build
npm start
```

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Supabase Documentation](https://supabase.com/docs)

---
This documentation provides a quick start guide for running and understanding the backend for the Splitwise-like app.
```

