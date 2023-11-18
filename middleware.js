import { NextResponse } from "next/server";

export function middleware(request) {
     const user = request.cookies.get("user");

     if (user) {
          if (request.nextUrl.pathname == "/") {
               return NextResponse.redirect(new URL("/dashboard", request.url));
          }
     } else {
          return NextResponse.rewrite(new URL("/", request.url));
     }
}

export const config = {
     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
