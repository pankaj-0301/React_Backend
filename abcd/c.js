const { Client } = require('pg');

const DATABASE_URL = "postgresql://postgres.xhkzhhbjqvevngswirur:nBSu7xEVnSk12JNt@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

const client = new Client({
    connectionString: DATABASE_URL,
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connection successful!");
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    } finally {
        await client.end(); // Close the connection
    }
}

connectToDatabase();
