# Login Example

This is a simple login example using Next.js, Next-Auth, Prisma, and TypeScript.

## Getting Started

### Prisma and Database Connection

This project uses [Prisma](https://www.prisma.io/) as the ORM to manage your database. **Before running any Prisma commands or starting the development server, you must set your database connection string.**

1. **Set up your connection string:**
   - Open (or create) a file called `.env` in the root of your project.
   - Add your database connection string as follows:

   ```env
   DATABASE_URL="your-database-connection-string-here"
   ```
   - Example for PostgreSQL:
   ```env
   DATABASE_URL="postgres://user:password@localhost:5432/mydb"
   ```

2. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### Development Server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
