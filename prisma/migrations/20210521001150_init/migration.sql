-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "token" VARCHAR(50) NOT NULL,
    "isactive" BOOLEAN,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emails" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER NOT NULL,
    "toAddress" VARCHAR(75) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "friendlyname" VARCHAR(75),
    "fromemail" VARCHAR(50) NOT NULL,
    "subject" VARCHAR(100) NOT NULL,
    "text" VARCHAR NOT NULL,
    "template_category_id" INTEGER,
    "tenant_id" INTEGER,
    "description" VARCHAR(150),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "templates" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD FOREIGN KEY ("template_category_id") REFERENCES "template_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emails" ADD FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
