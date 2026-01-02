import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
    },

    plugins: [
        emailOTP({
            async sendVerificationOTP({email, otp }) {
            await resend.emails.send({
                from: 'EduplusLBS <onboarding@resend.dev>',
                to: [email],
                subject: 'Eduplus - Verify your email',
                html: `<p>Your OTP is <strong>${otp}</strong></p>`,
                });
            }
        })
    ]
});