/*
  Warnings:

  - The values [atWork] on the enum `AppealStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppealStatus_new" AS ENUM ('new', 'inWork', 'completed', 'canceled');
ALTER TABLE "appeals" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "appeals" ALTER COLUMN "status" TYPE "AppealStatus_new" USING ("status"::text::"AppealStatus_new");
ALTER TYPE "AppealStatus" RENAME TO "AppealStatus_old";
ALTER TYPE "AppealStatus_new" RENAME TO "AppealStatus";
DROP TYPE "AppealStatus_old";
ALTER TABLE "appeals" ALTER COLUMN "status" SET DEFAULT 'new';
COMMIT;
