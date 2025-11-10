import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  if (pathname === '/login') {
    return NextResponse.next();
  }

  if (pathname !== '/' && pathname !== '/login') {
    const userCookie = request.cookies.get('user');
    if (!userCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};