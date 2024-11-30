import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path starts with /admin
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const isAuthenticated = request.cookies.get('admin_authenticated');

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}
