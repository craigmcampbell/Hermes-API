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
    "application_id" INTEGER NOT NULL,
    "template_id" INTEGER,
    "toAddress" VARCHAR(75) NOT NULL,
    "fromAddress" VARCHAR(75) NOT NULL,
    "fromName" VARCHAR(75),
    "replacements" TEXT,
    "subjectReplacements" TEXT,
    "nonTemplateSubject" TEXT,
    "nonTemplateText" TEXT,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "textPlain" VARCHAR,
    "template_category_id" INTEGER,
    "tenant_id" VARCHAR(75),
    "description" VARCHAR(150),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" VARCHAR(75) NOT NULL,
    "application_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants.id_unique" ON "tenants"("id");

-- AddForeignKey
ALTER TABLE "templates" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD FOREIGN KEY ("template_category_id") REFERENCES "template_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emails" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emails" ADD FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
