"use client";

import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";
import { Spinner } from "./ui/spinner";
import { CornerDownLeftIcon } from "lucide-react";

interface PropsType {
  promptText: string;
  setPromptText: (text: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  className?: string;
  hideSubmitBtn?: boolean;
}

const PromptInput = ({
  promptText,
  setPromptText,
  isLoading,
  onSubmit,
  className,
  hideSubmitBtn,
}: PropsType) => {
  return (
    <div className="bg-background">
      <InputGroup
        className={
          (cn("min-h-[172px] rounded-3xl bg-background"),
          className && className)
        }
      >
        <InputGroupTextarea
          className="text-base! py-2.5!"
          placeholder="I want to design an app that ..."
          value={promptText}
          onChange={(e) => {
            setPromptText;
          }}
        />
        <InputGroupAddon
          align="block-end"
          className="flex items-center justify-end"
        >
          {!hideSubmitBtn && (
            <InputGroupButton
              variant="default"
              className=""
              size="sm"
              disabled={!promptText?.trim() || isLoading}
              onClick={() => onSubmit?.()}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  Design
                  <CornerDownLeftIcon className="size-4" />
                </>
              )}
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default PromptInput;
