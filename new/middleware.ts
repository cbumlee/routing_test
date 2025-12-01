import { NextRequest, NextResponse } from 'next/server';

// Legacy 앱의 URL
const LEGACY_APP_URL = 'http://localhost:3001';

// /legacy 경로 패턴 정규식
const LEGACY_PATH_PATTERN = /^\/legacy(\/.*)?$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정규식으로 /legacy 패턴 감지
  if (LEGACY_PATH_PATTERN.test(pathname)) {
    // Legacy 앱으로 프록시
    // Legacy 앱은 basePath가 /legacy이므로 경로를 그대로 사용
    const legacyUrl = new URL(pathname, LEGACY_APP_URL);
    legacyUrl.search = request.nextUrl.search;
    
    try {
      // 요청 헤더 준비
      const requestHeaders = new Headers();
      request.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        // 프록시에 방해되는 헤더 제외
        if (!['host', 'connection', 'content-length', 'transfer-encoding'].includes(lowerKey)) {
          requestHeaders.set(key, value);
        }
      });

      // Legacy 앱에서 응답 가져오기
      const response = await fetch(legacyUrl.toString(), {
        method: request.method,
        headers: requestHeaders,
        // GET/HEAD가 아닌 경우 body 전달
        body: request.method !== 'GET' && request.method !== 'HEAD' 
          ? await request.text() 
          : undefined,
      });

      // Legacy 앱의 응답 가져오기
      const responseText = await response.text();
      
      // 응답 헤더 복사
      const responseHeaders = new Headers();
      response.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        // 프록시에 문제가 되는 헤더 제외
        if (!['content-encoding', 'transfer-encoding', 'content-length', 'connection'].includes(lowerKey)) {
          responseHeaders.set(key, value);
        }
      });

      // Content-Length 재계산
      responseHeaders.set('content-length', String(new TextEncoder().encode(responseText).length));

      // NextResponse로 반환 (rewrite처럼 동작, URL은 변경되지 않음)
      return new NextResponse(responseText, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      console.error('Legacy app proxy error:', error);
      return NextResponse.json(
        { 
          error: 'Legacy app proxy failed', 
          details: error instanceof Error ? error.message : String(error),
          pathname,
          legacyUrl: `${LEGACY_APP_URL}${pathname}`,
        },
        { status: 502 }
      );
    }
  }

  // /legacy 패턴이 아닌 경우 그대로 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정규식으로 /legacy로 시작하는 모든 경로 매칭
    '/legacy/:path*',
  ],
};

