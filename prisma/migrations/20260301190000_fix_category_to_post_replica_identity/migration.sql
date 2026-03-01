-- Fix: PostgreSQL requires REPLICA IDENTITY for tables that publish deletes
-- (e.g. when using logical replication). Prisma's many-to-many "set" operation
-- deletes from _CategoryToPost before inserting, which fails without this.
ALTER TABLE "_CategoryToPost" REPLICA IDENTITY FULL;
