import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

let cached = global.mongoose as { conn: typeof mongoose | null, promise: Promise<typeof mongoose> | null } | undefined;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } as any);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

