-- CreateTable
CREATE TABLE "employee_user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "employee_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_user" ADD CONSTRAINT "employee_user_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
