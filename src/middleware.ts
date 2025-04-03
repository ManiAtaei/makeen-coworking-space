import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // بررسی اینکه آیا مسیر با /admin-panel شروع می‌شه یا نه
  const isAdminPanel = pathname.startsWith("/admin-panel") || pathname.startsWith("/user-panel");

  // اضافه کردن اطلاعات به هدرهای پاسخ (برای دسترسی توی SSR)
  const response = NextResponse.next();
  response.headers.set("x-is-admin-panel", isAdminPanel.toString());

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // اعمال Middleware به همه مسیرها به جز فایل‌های استاتیک و API
};