import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

interface DeleteAccountRequest {
  email: string;
  code: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting delete-account function");
    
    const { email, code }: DeleteAccountRequest = await req.json();
    
    if (!email || !code) {
      return new Response(
        JSON.stringify({ error: "Email and verification code are required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    console.log(`Processing account deletion for email: ${email}`);

    // Verify the code
    const { data: deleteCodeData, error: codeError } = await supabase
      .from("delete_codes")
      .select("*")
      .eq("email", email)
      .eq("code", code)
      .eq("used", false)
      .single();

    if (codeError || !deleteCodeData) {
      console.log("Invalid verification code attempt for:", email);
      return new Response(
        JSON.stringify({ error: "Invalid or expired verification code" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check if code is expired
    const now = new Date();
    const expiresAt = new Date(deleteCodeData.expires_at);
    
    if (now > expiresAt) {
      console.log("Expired verification code used for:", email);
      return new Response(
        JSON.stringify({ error: "Verification code has expired" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark the code as used
    await supabase
      .from("delete_codes")
      .update({ used: true })
      .eq("email", email)
      .eq("code", code);

    console.log("Verification code validated for:", email);

    // Find the user by email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error("Error listing users:", userError);
      throw new Error("Failed to find user account");
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      console.log("User not found for email:", email);
      return new Response(
        JSON.stringify({ error: "User account not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Found user to delete: ${user.id}`);

    // Delete user data from custom tables (profiles, measurements, user_stats, etc.)
    const tablesToCleanup = [
      'user_achievements',
      'videos', 
      'measurements',
      'user_stats',
      'profiles'
    ];

    for (const table of tablesToCleanup) {
      try {
        const { error: deleteError } = await supabase
          .from(table)
          .delete()
          .eq('user_id', user.id);
        
        if (deleteError) {
          console.warn(`Warning: Failed to delete from ${table}:`, deleteError);
          // Continue with deletion even if some data cleanup fails
        } else {
          console.log(`Successfully deleted user data from ${table}`);
        }
      } catch (error) {
        console.warn(`Warning: Error deleting from ${table}:`, error);
        // Continue with deletion
      }
    }

    // Delete the user account from Supabase Auth
    const { error: deleteUserError } = await supabase.auth.admin.deleteUser(user.id);
    
    if (deleteUserError) {
      console.error("Error deleting user from auth:", deleteUserError);
      throw new Error("Failed to delete user account");
    }

    console.log(`Successfully deleted user account: ${user.id}`);

    // Clean up the verification code
    await supabase
      .from("delete_codes")
      .delete()
      .eq("email", email);

    return new Response(
      JSON.stringify({ 
        message: "Account successfully deleted",
        deleted_user_id: user.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in delete-account function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);