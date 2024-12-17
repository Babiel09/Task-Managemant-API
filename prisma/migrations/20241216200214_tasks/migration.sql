/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `about` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitData` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secret` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "limitData" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "secret" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Task_name_key" ON "Task"("name");
