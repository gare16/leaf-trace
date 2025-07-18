"use client";

import { BrakeType } from "@/types/brakes";
// import { useMQTT } from "@/app/context/mqtt-context";

import dynamic from "next/dynamic";
import React from "react";

const BrakeMap = dynamic(() => import("@/components/brake-map"), {
  ssr: false,
});

type Props = {
  messages?: BrakeType[];
};

const DashboardClient: React.FC<Props> = ({ messages }) => {
  return <BrakeMap message={messages} />;
};

export default DashboardClient;
