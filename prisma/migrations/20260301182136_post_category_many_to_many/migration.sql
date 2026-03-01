-- CreateTable: Prisma implicit many-to-many join table
-- A = Category id, B = Post id (alphabetical order)
CREATE TABLE "_CategoryToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- Migrate existing categoryId data to join table
INSERT INTO "_CategoryToPost" ("A", "B")
SELECT "categoryId", "id" FROM "Post" WHERE "categoryId" IS NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "_CategoryToPost"("A", "B");
CREATE INDEX "_CategoryToPost_B_index" ON "_CategoryToPost"("B");

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- DropColumn
ALTER TABLE "Post" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
