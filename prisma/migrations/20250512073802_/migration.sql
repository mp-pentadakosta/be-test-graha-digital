/*
  Warnings:

  - Added the required column `group_name` to the `todo_lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todo_lists" ADD COLUMN     "group_name" TEXT NOT NULL;
