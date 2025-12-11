'use client';

import { useState, useRef } from "react";

export default function NewHome() {
  const [storageType, setStorageType] = useState<'cookie' | 'localStorage'>('cookie');
  const cookieNameRef = useRef<HTMLInputElement>(null);
  const cookieValueRef = useRef<HTMLInputElement>(null);
  const readCookieNameRef = useRef<HTMLInputElement>(null);
  const [readCookieName, setReadCookieName] = useState('');
  const [readCookieValue, setReadCookieValue] = useState('없음');
  const [readStorageValue, setReadStorageValue] = useState('없음');

  // 쿠키 읽기
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  // LocalStorage 읽기
  const getLocalStorage = (name: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(name);
    }
    return null;
  };

  // 쿠키/LocalStorage 설정
  const setCookie = (name: string, value: string, days: number = 7) => {
    if (storageType === 'cookie') {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem(name, value);
      }
    }
  };

  const readCookie = () => {
    const name = readCookieNameRef.current?.value;
    if (name) {
      setReadCookieName(name);
      const cookieValue = getCookie(name);
      const storageValue = getLocalStorage(name);
      setReadCookieValue(cookieValue || '없음');
      setReadStorageValue(storageValue || '없음');
    }
  };

  return (
    <div className="p-8 font-sans">
      <h1>뉴 페이지</h1>
      
      <div className="mt-8 flex flex-col gap-4">
        <div>
          <h2 className="mb-4 text-xl font-bold">데이터 저장소 테스트</h2>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="mb-2 font-bold">타입 선택</h3>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="cookie"
                    checked={storageType === 'cookie'}
                    onChange={(e) => setStorageType(e.target.value as 'cookie' | 'localStorage')}
                  />
                  <span>쿠키</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="localStorage"
                    checked={storageType === 'localStorage'}
                    onChange={(e) => setStorageType(e.target.value as 'cookie' | 'localStorage')}
                  />
                  <span>LocalStorage</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-bold">설정</h3>
              <div className="flex gap-2 mb-4">
                <input
                  ref={cookieNameRef}
                  type="text"
                  placeholder="키 이름 (예: testKey, testKey1)"
                  className="px-3 py-2 border border-gray-300 rounded flex-1"
                />
                <input
                  ref={cookieValueRef}
                  type="text"
                  placeholder="값"
                  className="px-3 py-2 border border-gray-300 rounded flex-1"
                />
                <button
                  onClick={() => {
                    const cookieName = cookieNameRef.current?.value;
                    const cookieValue = cookieValueRef.current?.value;
                    if (cookieName && cookieValue) {
                      setCookie(cookieName, cookieValue);
                      if (cookieNameRef.current) cookieNameRef.current.value = '';
                      if (cookieValueRef.current) cookieValueRef.current.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white border-none rounded cursor-pointer hover:bg-green-700"
                >
                  설정
                </button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-bold">읽기</h3>
              <div className="flex gap-2">
                <input
                  ref={readCookieNameRef}
                  type="text"
                  placeholder="읽을 키 이름"
                  className="px-3 py-2 border border-gray-300 rounded flex-1"
                />
                <button
                  onClick={readCookie}
                  className="px-4 py-2 bg-gray-600 text-white border-none rounded cursor-pointer hover:bg-gray-700"
                >
                  읽기
                </button>
              </div>
              {readCookieName && (
                <div className="mt-2">
                  <p className="font-bold">
                    쿠키 - {readCookieName}: <span className="text-green-600 font-bold">{readCookieValue}</span>
                  </p>
                  <p className="font-bold">
                    LocalStorage - {readCookieName}: <span className="text-purple-600 font-bold">{readStorageValue}</span>
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="mb-2 font-bold">레거시에서 읽기 테스트</p>
              <button
                onClick={() => {
                  window.location.href = "/legacy";
                }}
                className="px-4 py-2 bg-green-600 text-white border-none rounded cursor-pointer hover:bg-green-700"
              >
                레거시 페이지로 이동 (읽기 확인)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 테스트용 더미 영역 */}
      <div style={{ height: "2000px" }} />
    </div>
  );
}

