# Hermes

Hermes is a templated email delivery system. It's a centralized place to manage email delivery for any number of projects.

🖥 [Hermes Web](https://github.com/craigmcampbell/Hermes-Web) - front end application to support Hermes functionality

#### Features

- Manage email templates for specific applications
- Each application can support multiple tenants, to further delineate email templates within a project or organization
- Templates use replacement variables to personalize emails
- Admin account management
- View email history

#### Technologies

Node/Express | TypeScript | PostgreSQL | SendGrid

## Getting Started

1. Run `npm install`
2. Rename .env.sample to .env and update the Postgres connection string
3. Run `npx prisma migrate deploy`

## Prisma Structure

./prisma/migrations - houses all migrations
./prisma/schema.prisma - this is where the database schema is defined for the migrations

## Migrations

```bash
# Create a migration and apply it
npx prisma migrate dev --name NAME

# Apply all migration, then create and apply any new migrations
npx prisma migrate dev

# Apply all migrations and create a new migration if there are schema changes, but do not apply it
npx prisma migrate dev --create-only

# Deletes and recreates the database
npx prisma migrate reset

# Applies all pending migrations, creates the database if necessary
npx prisma migrate deploy

# State of migrations in the database
npx prisma migrate status
```
