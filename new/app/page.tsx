'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="p-8 font-sans">
      <h1>뉴 페이지 (포트 3001)</h1>
      
      <div className="mt-8 flex flex-col gap-4">
        <div>
          <h2 className="mb-4 text-xl font-bold">라우팅 테스트</h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 font-bold">뉴 → 레거시</p>
              <button
                onClick={() => {
                  window.location.href = "http://localhost:3000/";
                }}
                className="px-4 py-2 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700"
              >
                레거시 페이지로 이동 (포트 3000)
              </button>
            </div>
            <div>
              <p className="mb-2 font-bold">뉴 → 뉴</p>
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="px-4 py-2 bg-green-600 text-white border-none rounded cursor-pointer hover:bg-green-700"
              >
                뉴 홈으로 이동
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
