"use client";

import { Button } from "@/components/ui/button";

export default function AIButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Button variant="outline" onClick={onClick}>
      {label}
    </Button>
  );
}
