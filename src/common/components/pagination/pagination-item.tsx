"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../libs/shadcn/components/ui/button";

export interface PaginationItemProps {
  text: number;
  active: boolean;
  change: () => void;
}

export const PaginationItem = ({
  text,
  active,
  change,
}: PaginationItemProps) => {
  return (
    <>
      <Button onClick={change} variant={active ? "default" : "outline"}>
        {text}
      </Button>
    </>
  );
};

export interface PaginationControllProps {
  type: "next" | "prev";
  change: () => void;
  disabled: boolean;
}
export const PaginationControll = ({
  type,
  change,
  disabled,
}: PaginationControllProps) => {
  return (
    <Button onClick={() => change()} variant="outline" disabled={disabled}>
      {type === "next" ? <ChevronRight /> : <ChevronLeft />}
    </Button>
  );
};
