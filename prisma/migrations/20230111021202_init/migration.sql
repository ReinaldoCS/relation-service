-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator_id" TEXT NOT NULL,
    CONSTRAINT "rooms_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "members_rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "room_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    CONSTRAINT "members_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "members_rooms_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    CONSTRAINT "cards_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cards_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cards_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
