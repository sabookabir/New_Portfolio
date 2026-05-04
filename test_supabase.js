const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cacwyshpedssvjqothge.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY3d5c2hwZWRzc3ZqcW90aGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Nzc2NjYsImV4cCI6MjA5MzQ1MzY2Nn0.nxp37p2htnnyvd7WqTAA9Zmig2CiM6OgdMFfvOw3HR0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testInsert() {
    console.log("Attempting to insert test record...");
    const { data, error } = await supabase
        .from('contacts')
        .insert([
            { name: 'Test User', email: 'test@example.com', message: 'This is a test message' }
        ]);

    if (error) {
        console.error("Insert failed with error:", error);
    } else {
        console.log("Insert successful! Data:", data);
    }
}

testInsert();
