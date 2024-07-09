import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://himcbaynxhchayjtxokj.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbWNiYXlueGhjaGF5anR4b2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNzQ2MzgsImV4cCI6MjAzNTk1MDYzOH0.uVIZHexTWpHAHv6y-Jm5FxDQT1bYyrE6se1cNCctdAw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
