import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface SendDeleteCodeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting send-delete-code function");
    
    const { email }: SendDeleteCodeRequest = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    console.log(`Processing delete code request for email: ${email}`);

    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Store the code in the database
    const { error: dbError } = await supabase
      .from("delete_codes")
      .upsert({
        email,
        code,
        expires_at: expiresAt.toISOString(),
        used: false
      }, {
        onConflict: 'email'
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store verification code");
    }

    console.log(`Verification code stored for ${email}`);

    // Send email with verification code
    const emailResponse = await resend.emails.send({
      from: "KhelManch Security <security@resend.dev>",
      to: [email],
      subject: "Account Deletion Verification Code",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626; font-size: 24px; margin: 0;">🚨 Account Deletion Request</h1>
          </div>
          
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 16px; color: #991b1b; font-weight: 600;">
              A request has been made to delete your KhelManch account.
            </p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 25px;">
            If you want to proceed with deleting your account, use the verification code below. This action is <strong>permanent and cannot be undone</strong>.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f3f4f6; border: 2px dashed #d1d5db; border-radius: 8px; padding: 20px; display: inline-block;">
              <div style="font-size: 32px; font-weight: bold; color: #111827; letter-spacing: 2px;">${code}</div>
              <div style="font-size: 14px; color: #6b7280; margin-top: 5px;">Verification Code</div>
            </div>
          </div>
          
          <div style="background-color: #fffbeb; border: 1px solid #fed7aa; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>⏰ This code expires in 15 minutes</strong>
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">
            If you didn't request account deletion, please ignore this email and ensure your account is secure.
          </p>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
              KhelManch - Athletic Performance Platform
            </p>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Email sending error:", emailResponse.error);
      throw new Error("Failed to send verification email");
    }

    console.log("Delete verification email sent successfully:", emailResponse.data?.id);

    return new Response(
      JSON.stringify({ 
        message: "Verification code sent to your email",
        email: email
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-delete-code function:", error);
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