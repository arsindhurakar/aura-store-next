/*
  Warnings:

  - A unique constraint covering the columns `[tokenHash]` on the table `RefreshSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshSession_tokenHash_key" ON "RefreshSession"("tokenHash");
