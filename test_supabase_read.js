const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cacwyshpedssvjqothge.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhY3d5c2hwZWRzc3ZqcW90aGdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzg3NzY2NiwiZXhwIjoyMDkzNDUzNjY2fQ.IxKcCyb0LjVrwM9jasklCIBGmbqBxiGmWKzFpwG_hwY';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function testRead() {
    console.log("Attempting to read all records...");
    const { data, error } = await supabase
        .from('contacts')
        .select('*');

    if (error) {
        console.error("Read failed with error:", error);
    } else {
        console.log("Read successful! Data:", data);
    }
}

testRead();
