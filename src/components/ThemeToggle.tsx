"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <MoonIcon className="size-4 text-indigo-500 dark:hidden" />
      <SunIcon className="hidden size-4 text-orange-300 dark:block" />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
}
