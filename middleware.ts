import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
const isPublicRoute = createRouteMatcher(['/', '/sign-in', '/sign-up']);
export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req) && auth().userId) {
    return NextResponse.redirect(new URL('/chat', req.url));
  }
});
// , '/(api|trpc)(.*)'
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
