'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

interface Item {
  id: number;
  title: string;
  content: string;
}

export default function NewCrudPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const STORAGE_KEY = 'crud_items';

  // LocalStorage에서 데이터 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    }
  }, []);

  // LocalStorage에 저장
  const saveToStorage = (newItems: Item[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    }
  };

  // Create
  const handleCreate = () => {
    if (title && content) {
      const newItem: Item = {
        id: Date.now(),
        title,
        content,
      };
      const newItems = [...items, newItem];
      setItems(newItems);
      saveToStorage(newItems);
      setTitle('');
      setContent('');
    }
  };

  // Update
  const handleUpdate = (id: number) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, title: editTitle, content: editContent } : item
    );
    setItems(newItems);
    saveToStorage(newItems);
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  // Delete
  const handleDelete = (id: number) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    saveToStorage(newItems);
  };

  // Edit 시작
  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
  };

  return (
    <div className="p-8 font-sans">
      <div className="mb-4">
        {/* New 홈은 /new 경로 */}
        <Link href="/new" className="text-green-600 hover:underline">← 뉴 홈으로</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">New CRUD</h1>

      {/* Create */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">생성</h2>
        <p className="text-sm text-gray-600 mb-4">
          제목과 내용을 입력하세요. 아래 예시를 복사해서 사용할 수 있습니다.
        </p>
        <div className="mb-4 p-3 rounded text-xs">
          <p className="font-bold mb-2">예시 1:</p>
          <p className="block mb-2">{`{"id": 1, "title": "첫 번째 항목", "content": "이것은 첫 번째 테스트 항목입니다"}`}</p>
          <p className="font-bold mb-2">예시 2:</p>
          <p className="block mb-2">{`{"id": 2, "title": "두 번째 항목", "content": "New에서 생성한 데이터입니다"}`}</p>
          <p className="font-bold mb-2">예시 3:</p>
          <p className="block">{`{"id": 3, "title": "세 번째 항목", "content": "CRUD 테스트를 위한 샘플 데이터"}`}</p>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목 입력 (예: "첫 번째 항목")'
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='내용 입력 (예: "이것은 테스트입니다")'
            className="px-3 py-2 border rounded"
          />
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            생성
          </button>
        </div>
      </div>

      {/* Read */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">목록</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="p-4 border rounded">
              {editingId === item.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="px-3 py-2 border rounded"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditTitle('');
                        setEditContent('');
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-500">항목이 없습니다.</p>}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            // 단일 도메인 기준 legacy CRUD는 /crud 경로
            window.location.href = "/crud";
          }}
          className="text-blue-600 hover:underline"
        >
          → Legacy CRUD 페이지로 이동
        </button>
      </div>
    </div>
  );
}


