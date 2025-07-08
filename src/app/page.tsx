import SkeletonCard from "@/components/skeleton-card";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <Suspense fallback={<SkeletonCard />}>
        <Content />
      </Suspense>
    </div>
  );
}

async function Content() {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate loading
  return (
    <p className="text-gray-700">
      This is your main content loaded after skeleton.
    </p>
  );
}
