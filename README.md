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

#### Notable Packages

-

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

# Sending Emails

## Replacement Variables

When using a template that makes use of replacement variables, the standard naming convention of the variables is @VARIABLENAME.

The system expects a pipe-delimited list of key/value pairs for replacement. For example:
`@FIRST=Craig|@LAST=Campbell`.

## Endpoints

- [Application Endpoints](#application-endpoints)
- [Send Email Endpoints](#send-email-endpoints)
- [Email History Endpoints](#email-history-endpoints)
- [Template Endpoints](#template-endpoints)

### Application Endpoints

Coming soon

[back to endpoints](#endpoints)

---

### Send Email Endpoints

#### Non-Templated Emails

**Path:** /sendEmail

**Verbs:**

- POST (Email)

```json
{
  "to": "",
  "from": "",
  "subject": "",
  "text": "",
  "html": ""
}
```

---

#### Templated Emails

**Path:** /sendEmail/templated

**Verbs:**

- POST (Email)

```json
{
  "applicationId": "",
  "tenantId": "",
  "toEmail": "",
  "fromEmail": "",
  "templateName": "",
  "subjectReplacements": "",
  "bodyReplacements": ""
}
```

[back to endpoints](#endpoints)

---

### Email History Endpoints

Coming soon

[back to endpoints](#endpoints)

---

### Template Endpoints

Coming soon

[back to endpoints](#endpoints)
