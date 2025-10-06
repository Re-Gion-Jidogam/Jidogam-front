/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useCallback } from "react";

import { Place } from "@/types/place";

declare global {
  interface Window {
    kakao: any;
  }
}

type KakaoMap = any;
type KakaoMarker = any;

const activeSrc = "/imgs/map-stamp-active.png";
const inactiveSrc = "/imgs/map-stamp-inactive.png";
const activeClickedSrc = "/imgs/map-stamp-clicked-active.png";
const inactiveClickedSrc = "/imgs/map-stamp-clicked-inactive.png";

type MarkerRecord = {
  marker: KakaoMarker;
  handlers: { click?: () => void };
  baseSrc: string; // ← 원복용 기본 이미지
};

interface KakaoMapProps {
  initialPlace?: Place;
  initialZoomLevel?: number;
  clickZoomLevel?: number;
  places: Place[];
  onClickPlace: (pid: string) => void;
}

export default function KakaoMap({
  initialPlace,
  initialZoomLevel = 14,
  clickZoomLevel = 5,
  places,
  onClickPlace,
}: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KakaoMap | null>(null);

  /** id -> MarkerRecord */
  const markersRef = useRef<Map<string, MarkerRecord>>(new Map());

  /** 마지막 클릭된 마커(활성) */
  const activeMarkerRef = useRef<KakaoMarker | null>(null);
  const activePidRef = useRef<string | null>(null);

  /** MarkerImage 캐시 (src+size+offset 조합) */
  const imageCacheRef = useRef<Map<string, any>>(new Map());

  /** 공용: MarkerImage 캐시 사용 */
  const getMarkerImage = useCallback((src: string, size = { w: 64, h: 64 }) => {
    const key = `${src}:${size.w}x${size.h}:56,48`; // offset 고정 시 포함
    const cache = imageCacheRef.current.get(key);
    if (cache) return cache;

    const option = { offset: new window.kakao.maps.Point(56, 48) };
    const img = new window.kakao.maps.MarkerImage(
      src,
      new window.kakao.maps.Size(size.w, size.h),
      option,
    );
    imageCacheRef.current.set(key, img);
    return img;
  }, []);

  /** 공용: LatLng 생성 (숫자로 변환) */
  const toLatLng = useCallback((y: string | number, x: string | number) => {
    const yy = typeof y === "string" ? parseFloat(y) : y;
    const xx = typeof x === "string" ? parseFloat(x) : x;
    return new window.kakao.maps.LatLng(yy, xx);
  }, []);

  /** 공용: 이벤트+마커 정리 */
  const cleanupMarkers = useCallback((predicate: (pid: string) => boolean) => {
    const map = markersRef.current;
    for (const [pid, rec] of map) {
      if (!predicate(pid)) continue;
      if (rec.handlers.click) {
        window.kakao.maps.event.removeListener(
          rec.marker,
          "click",
          rec.handlers.click,
        );
      }
      rec.marker.setMap(null);
      map.delete(pid);
    }
  }, []);

  /** 마커 렌더/업데이트 (diff) */
  const renderMarkers = useCallback(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    const map = mapRef.current as KakaoMap;
    const store = markersRef.current;

    // 1) 삭제 대상: 기존에는 있으나 props.places엔 없는 것
    cleanupMarkers((pid) => !places.some((p) => p.pid === pid));

    // 2) 추가/갱신
    places.forEach((p) => {
      const pid = p.pid;
      const pos = toLatLng(p.y, p.x);
      const baseSrc = p.visitedDate ? activeSrc : inactiveSrc;

      const existed = store.get(pid);
      if (!existed) {
        const marker = new window.kakao.maps.Marker({
          position: pos,
          map,
          image: getMarkerImage(baseSrc),
        });

        const handleClick = () => {
          const prevPid = activePidRef.current;

          if (prevPid && prevPid !== pid) {
            const prevRec = store.get(prevPid);
            if (prevRec) {
              prevRec.marker.setImage(getMarkerImage(prevRec.baseSrc));
            }
          }

          const rec = store.get(pid)!;
          const clickedSrc =
            rec.baseSrc === activeSrc ? activeClickedSrc : inactiveClickedSrc;

          marker.setImage(getMarkerImage(clickedSrc));

          map.setLevel(clickZoomLevel);
          map.panTo(pos);

          activePidRef.current = pid;
          onClickPlace?.(pid);
        };

        window.kakao.maps.event.addListener(marker, "click", handleClick);
        store.set(pid, { marker, handlers: { click: handleClick }, baseSrc });
      } else {
        // 위치 갱신
        existed.marker.setPosition(pos);

        // visitedDate 변경되면 baseSrc 갱신
        if (existed.baseSrc !== baseSrc) {
          existed.baseSrc = baseSrc;
          // 활성 마커가 아니라면 즉시 기본 이미지로 동기화
          if (activePidRef.current !== pid) {
            existed.marker.setImage(getMarkerImage(baseSrc));
          }
        }
      }
    });
  }, [cleanupMarkers, getMarkerImage, onClickPlace, places, toLatLng]);

  /** 최초 지도 1회 생성 */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      await loadKakaoSDK();
      if (cancelled) return;

      // 초기 중심
      const center = initialPlace
        ? toLatLng(initialPlace.y, initialPlace.x)
        : toLatLng(
            ...(Object.values(await getCurrentPosition()) as [number, number]),
          );

      mapRef.current = new window.kakao.maps.Map(containerRef.current!, {
        center,
        level: initialZoomLevel,
      });

      renderMarkers();
    })();

    return () => {
      cancelled = true;

      // 전체 정리
      cleanupMarkers(() => true);
      markersRef.current.clear();
      activeMarkerRef.current = null;
      imageCacheRef.current.clear();
    };
  }, []);

  /** places 변경 시 diff 적용 */
  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return;
    renderMarkers();
  }, [places, renderMarkers]);

  return <div ref={containerRef} className="w-full h-screen" />;
}

/* ───────── SDK / 유틸 ───────── */

let sdkPromise: Promise<void> | null = null;
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`;

function loadKakaoSDK(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.kakao?.maps) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = KAKAO_SDK_URL;
    s.defer = true;
    s.onload = () => window.kakao.maps.load(() => resolve());
    document.head.appendChild(s);
  });
  return sdkPromise;
}

function getCurrentPosition(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      (err) => reject(err),
    );
  });
}
