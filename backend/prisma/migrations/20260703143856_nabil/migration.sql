-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin', 'Author');

-- CreateEnum
CREATE TYPE "Bug_Status" AS ENUM ('Closed', 'Open');

-- CreateEnum
CREATE TYPE "Bug_Priority" AS ENUM ('Low', 'Midium', 'High');

-- CreateEnum
CREATE TYPE "Active_Status" AS ENUM ('Blocked', 'Active');

-- CreateTable
CREATE TABLE "bugs" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(300),
    "bug_status" "Bug_Status" NOT NULL DEFAULT 'Open',
    "priority" "Bug_Priority" NOT NULL DEFAULT 'Low',
    "authorId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bugs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "authorId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active_status" "Active_Status" NOT NULL DEFAULT 'Active',
    "role" "Role" NOT NULL DEFAULT 'User',
    "profile_photo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bugs_authorId_key" ON "bugs"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "bugs_projectId_key" ON "bugs"("projectId");

-- CreateIndex
CREATE INDEX "bugs_projectId_idx" ON "bugs"("projectId");

-- CreateIndex
CREATE INDEX "bugs_authorId_idx" ON "bugs"("authorId");

-- CreateIndex
CREATE INDEX "projects_authorId_idx" ON "projects"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bugs" ADD CONSTRAINT "bugs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bugs" ADD CONSTRAINT "bugs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
