/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "applications.token_unique" ON "applications"("token");
