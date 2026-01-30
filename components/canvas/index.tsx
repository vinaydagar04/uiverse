import { LoadingStatusType, useCanvas } from "@/context/canvas-context";
import { cn } from "@/lib/utils";
import React from "react";
import { Spinner } from "../ui/spinner";

const Canvas = ({
  projectId,
  projectName,
  isPending,
}: {
  projectId?: string;
  projectName?: string | null;
  isPending?: boolean;
}) => {
  const { theme, frames, selectedFrame, setSelectedFrameId, loadingStatus } =
    useCanvas();

  const currentStatus = isPending
    ? "fetching"
    : loadingStatus !== "idle" && loadingStatus !== "completed"
      ? loadingStatus
      : null;
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* <FloatingToolBar /> */}
      {currentStatus && <CanvasLoader status={currentStatus} />}
    </div>
  );
};

function CanvasLoader({ status }: { status?: LoadingStatusType | "fetching" }) {
  return (
    <div
      className={cn(
        `absolute top-4 left-1/2 -translate-x-1/2 min-w-4- max-w-full px-4 pt-1.5 pb-2 rounded-br-xl shadow-md flex items-center space-x-2 z-10`,
        status === "fetching" && "bg-gray-500 text-white",
        status === "running" && "bg-amber-500 text-white",
        status === "analyzing" && "bg-blue-500 text-white",
        status === "generating" && "bg-purple-500 text-white",
      )}
    >
      <Spinner className="w-4 h-4 stroke-3!" />
      <span className="text-sm font-semibold capitalize">
        {status === "fetching" ? "Loading project..." : status}
      </span>
    </div>
  );
}

export default Canvas;
