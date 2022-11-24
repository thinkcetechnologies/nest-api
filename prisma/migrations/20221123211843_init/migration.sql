-- CreateTable
CREATE TABLE "company" (
    "Id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "branches" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
