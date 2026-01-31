"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

import MakeFirstGuidebookImage from "@/assets/imgs/make-first-guidebook-img.png";
import { GuidebookCard } from "@/components/GuidebookCard";
import PlaceCard from "@/components/PlaceCard";
import SVGIcon from "@/components/SVGIcon";
import { dummyGuidebooks, dummyPlaces } from "@/constants/dummy";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-12">
      <section>
        <button
          type="button"
          onClick={() => router.push("/account")}
          className={clsx(
            "relative flex flex-col justify-end w-full h-[6.785rem] px-5 py-3",
            "bg-gray-0 text-left rounded-xl cursor-pointer overflow-hidden",
          )}
        >
          <Image
            className="pointer-events-none select-none absolute -right-16 -top-[4.25rem] w-[12rem] -scale-x-100"
            src={MakeFirstGuidebookImage}
            alt="make-first-guidebook"
          />
          <p className="flex gap-1 text-gray-900 font-bold">
            나만의 첫 가이드북 만들기
            <SVGIcon
              icon="GrayRightChevronIcon"
              className="self-center w-[1.25rem] h-[1.25rem] fill-gray-600"
            />
          </p>
          <p className="text-sm text-gray-600">로그인해서 시작하기</p>
        </button>
      </section>

      <section>
        <SubTitle title="당신을 기다리는 곳" />
        <div
          className={clsx(
            "relative h-[17.375rem] overflow-scroll",
            "scrollbar-hide snap-x snap-mandatory scroll-smooth",
          )}
        >
          <div className="absolute top-0 left-0 flex gap-3 pr-[8.25rem]">
            {dummyGuidebooks.map((g) => (
              <button
                key={g.gid}
                className="text-left"
                onClick={() => router.push(`/map/guidebook/${g.gid}`)}
              >
                <GuidebookCard
                  key={g.gid}
                  guidebook={g}
                  className="snap-start"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SubTitle title="인기 가이드북" />
        <div
          className={clsx(
            "relative h-[17.375rem] overflow-scroll",
            "scrollbar-hide snap-x snap-mandatory scroll-smooth",
          )}
        >
          <div className="absolute top-0 left-0 flex gap-3 pr-[8.25rem]">
            {dummyGuidebooks.map((g) => (
              <button
                key={g.gid}
                className="text-left"
                onClick={() => router.push(`/map/guidebook/${g.gid}`)}
              >
                <GuidebookCard
                  key={g.gid}
                  guidebook={g}
                  className="snap-start"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SubTitle title="인기 장소" />
        <div
          className={clsx(
            "relative h-[13.5rem] overflow-scroll",
            "scrollbar-hide snap-x snap-mandatory scroll-smooth",
          )}
        >
          <div className="absolute top-0 left-0 flex gap-3 pr-[8.25rem]">
            {dummyPlaces.map((p) => (
              <button
                key={p.pid}
                className="text-left cursor-pointer"
                onClick={() => router.push(`/map/place/${p.pid}`)}
              >
                <PlaceCard
                  className="snap-start bg-white"
                  variant="default"
                  {...p}
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

interface SubTitleProps {
  title: string;
  onClick?: () => void;
}

function SubTitle({ title, onClick }: SubTitleProps) {
  return (
    <button
      onClick={onClick}
      className="group flex mb-3 text-lg font-bold text-gray-900 cursor-pointer"
    >
      {title}
      <SVGIcon
        icon="GrayRightChevronIcon"
        className={clsx(
          "self-center w-[1.75rem] h-[1.75rem] fill-gray-600",
          "transition-all duration-200 group-hover:ml-1",
        )}
      />
    </button>
  );
}
