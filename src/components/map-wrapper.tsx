"use client";

import dynamic from "next/dynamic";

const BrakeMap = dynamic(() => import("@/components/brake-map"), {
  ssr: false,
});

export default function MapWrapper() {
  return <BrakeMap />;
}
