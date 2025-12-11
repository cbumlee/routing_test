'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8">Next.js 라우팅 분기 처리 PoC</h1>
      
      <div className="mt-8 flex flex-col gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-bold mb-4">라우팅 구조</h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><code className="px-2 py-1 rounded">/</code> - 메인 라우팅 페이지 (현재 페이지)</li>
            <li><code className="px-2 py-1 rounded">/new</code> - New 앱</li>
            <li><code className="px-2 py-1 rounded">/legacy</code> - Legacy 앱</li>
          </ul>
          
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">New 앱</h3>
              <div className="flex gap-4">
                <Link 
                  href="/new" 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  New 홈 (/new)
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Legacy 앱</h3>
              <div className="flex gap-4">
                <Link 
                  href="/legacy" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Legacy 홈
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">동작 방식</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>단일 도메인에서 실행</li>
            <li><code className="px-2 py-1 rounded">/legacy</code> 경로는 정규식 패턴으로 감지하여 middleware에서 Legacy 앱으로 프록시</li>
            <li><code className="px-2 py-1 rounded">/new</code> 경로는 FE 자체 처리</li>
            <li>SSR 시점에서 판단</li>
            <li>rewrite 사용</li>
          </ul>
        </div>
      </div>
    </div>
  );
}