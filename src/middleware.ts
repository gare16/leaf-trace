// import { NextRequest, NextResponse } from "next/server";
// import { verify } from "./lib/jwt";

// const PUBLIC_PATHS = ["/auth/login", "/auth/register"];

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

//   const token = req.cookies.get("token")?.value;
//   if (!token || !(await verify(token))) {
//     const loginUrl = new URL("/auth/login", req.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|favicon.ico|images|api/public).*)"],
// };

export default async function middleware() {
  return null;
}
