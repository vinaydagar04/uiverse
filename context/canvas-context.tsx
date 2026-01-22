import Canvas from "@/components/canvas";
import { THEME_LIST, ThemeType } from "@/lib/themes";
import { FrameType } from "@/types/project";
import { init } from "next/dist/compiled/webpack/webpack";
import { createContext, ReactNode, useEffect, useState } from "react";

type LoadingStatusType =
  | "idle"
  | "running"
  | "analyzing"
  | "completed"
  | "generating";

interface CanvasContextType {
  theme?: ThemeType;
  setTheme: (id: string) => void;
  themes: ThemeType[];

  frames: FrameType[];
  setFrames: (frames: FrameType[]) => void;
  updateFrame: (id: String, data: Partial<FrameType>) => void;
  addFrame: (frame: FrameType) => void;

  selectedFrameId?: string | null;
  selectedFrame?: FrameType | null;
  setSelectedFrameId: (id: string | null) => void;

  loadingStatus: LoadingStatusType;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider = ({
  children,
  initialFrames,
  initialThemeId,
  hasInitialData,
  projectId,
}: {
  children: ReactNode;
  initialFrames: FrameType[];
  initialThemeId?: string;
  hasInitialData: boolean;
  projectId: string | null;
}) => {
  const [themeId, setThemeId] = useState<string>(
    initialThemeId || THEME_LIST[0].id,
  );
  const [frames, setFrames] = useState<FrameType[]>([]);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatusType>("running");

  const theme = THEME_LIST.find((t) => t.id === themeId);
  const selectedFrame =
    selectedFrameId && frames.length !== 0
      ? frames.find((f) => f.id === selectedFrameId)
      : null;

  useEffect(() => {
    if (hasInitialData) setLoadingStatus("idle");
  }, [hasInitialData]);

  useEffect(() => {
    if (initialThemeId) setThemeId(initialThemeId);
  }, [initialThemeId]);

  return (
    <CanvasContext.Provider
      value={{
        theme,
      }}
    >
      {" "}
      {children}
    </CanvasContext.Provider>
  );
};
