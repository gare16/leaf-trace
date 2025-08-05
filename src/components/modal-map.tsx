"use client";

import { BrakeSchema } from "@/types/brakes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";

const BrakeMap = dynamic(() => import("@/components/brake-map"), {
  ssr: false,
});

export function ModalMap({ data }: { data: BrakeSchema[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Map</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Peta Lokasi</DialogTitle>
        </DialogHeader>
        <div className="h-[50vh] w-full">
          <BrakeMap message={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
