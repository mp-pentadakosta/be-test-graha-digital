-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('L', 'P');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "image_identity" TEXT,
ADD COLUMN     "nik" TEXT;
