import { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { NextResponse } from 'next/server';

export default {
    providers: [
        Google({ allowDangerousEmailAccountLinking: true }),
        GitHub({ allowDangerousEmailAccountLinking: true }),
    ],
    callbacks: {
        authorized: async ({ request, auth }) => {
            const { nextUrl, url: baseUrl } = request;
            const isSignIn = !!auth?.user;

            function redirect(url: string) {
                return NextResponse.redirect(new URL(url, baseUrl));
            }

            if (isSignIn && nextUrl.pathname.startsWith('/signin')) {
                return redirect('/');
            }

            if (!isSignIn && nextUrl.pathname.startsWith('/user/')) {
                return redirect('/user');
            }
            return true;
        },
        session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
} satisfies NextAuthConfig;
