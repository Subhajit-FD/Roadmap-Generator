const mongoose = require("mongoose");

// Use a global variable to preserve the connection across hot reloads in development
// and container reuse in Vercel.
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            // FIX: Set this to true (default) or remove it. 
            // This allows Mongoose to queue commands while the connection is starting.
            bufferCommands: true, 
            
            // Good for Vercel/Serverless to avoid hanging functions
            connectTimeoutMS: 10000, 
        };

        console.log("Creating new MongoDB connection promise...");
        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((m) => {
            return m;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        // Clear the promise if it fails so the next request can try again
        cached.promise = null;
        console.error("MongoDB connection error:", err);
        throw err;
    }

    return cached.conn;
}

module.exports = connectToDB;