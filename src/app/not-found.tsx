"use client";

import Link from "next/link";

import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary-300">404</h1>

        <div className="text-6xl">🤔</div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/">
            <Button className="px-8 py-3">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
