'use client';

import { useState } from "react";

export default function Home() {
  const [cookieName, setCookieName] = useState('');
  const [cookieValue, setCookieValue] = useState('');
  const [readCookieName, setReadCookieName] = useState('');
  const [readCookieValue, setReadCookieValue] = useState('없음');
  
  // 쿠키 읽기
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  // 쿠키 설정
  const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  const readCookie = () => {
    if (readCookieName) {
      const value = getCookie(readCookieName);
      setReadCookieValue(value || '없음');
    }
  };

  return (
    <div className="p-8 font-sans">
      <h1>뉴 페이지</h1>
      
      <div className="mt-8 flex flex-col gap-4">
        <div>
          <h2 className="mb-4 text-xl font-bold">쿠키 테스트</h2>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="mb-2 font-bold">쿠키 설정</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={cookieName}
                  onChange={(e) => setCookieName(e.target.value)}
                  placeholder="쿠키 이름 (예: testCookie, testCookie1)"
                  className="px-3 py-2 border border-gray-300 rounded flex-1"
                />
                <input
                  type="text"
                  value={cookieValue}
                  onChange={(e) => setCookieValue(e.target.value)}
                  placeholder="쿠키 값"
                  className="px-3 py-2 border border-gray-300 rounded flex-1"
                />
                <button
                  onClick={() => {
                    if (cookieName && cookieValue) {
                      setCookie(cookieName, cookieValue);
                      setCookieName('');
                      setCookieValue('');
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white border-none rounded cursor-pointer hover:bg-green-700"
                >
                  쿠키 설정
                </button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-bold">쿠키 읽기</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={readCookieName}
                  onChange={(e) => setReadCookieName(e.target.value)}
                  placeholder="읽을 쿠키 이름"
                  className="px-3 py-2 border border-gray-300 rounded flex-1"
                />
                <button
                  onClick={readCookie}
                  className="px-4 py-2 bg-gray-600 text-white border-none rounded cursor-pointer hover:bg-gray-700"
                >
                  쿠키 읽기
                </button>
              </div>
              {readCookieName && (
                <p className="mt-2 font-bold">
                  {readCookieName}: <span className="text-green-600 font-bold">{readCookieValue}</span>
                </p>
              )}
            </div>
            <div>
              <p className="mb-2 font-bold">레거시에서 읽기 테스트</p>
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="px-4 py-2 bg-green-600 text-white border-none rounded cursor-pointer hover:bg-green-700"
              >
                레거시 페이지로 이동 (쿠키 읽기 확인)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
