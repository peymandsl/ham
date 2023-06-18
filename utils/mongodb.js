const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

module.exports = async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {}).then((client) => {
      return client;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
