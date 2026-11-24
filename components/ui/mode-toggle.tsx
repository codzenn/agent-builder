"use client"

import { cn } from "cn"
import { useTheme } from "next-themes"
import { Moon, Sun } from "@phosphor-icons/react"
import { flushSync } from "react-dom"
import * as React from "react"

function ModeToggle({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { setTheme } = useTheme()

  function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark"
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme)
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    document.documentElement.style.setProperty(
      "--theme-transition-x",
      `${bounds.left + bounds.width / 2}px`
    )
    document.documentElement.style.setProperty(
      "--theme-transition-y",
      `${bounds.top + bounds.height / 2}px`
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme))
    })
    const clearTransitionOrigin = () => {
      document.documentElement.style.removeProperty("--theme-transition-x")
      document.documentElement.style.removeProperty("--theme-transition-y")
    }

    void transition.finished.then(clearTransitionOrigin, clearTransitionOrigin)
  }

  return (
    <button
      type="button"
      data-slot="mode-toggle"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={cn(
        "group inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-all duration-300 hover:shadow-md",
        "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={toggleTheme}
      {...props}
    >
      <span className="relative size-4">
        <Moon
          className="absolute inset-0 size-4 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0 dark:opacity-0 motion-reduce:transition-none"
          aria-hidden="true"
        />
        <Sun
          className="absolute inset-0 size-4 rotate-90 scale-0 opacity-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 dark:opacity-100 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </span>
    </button>
  )
}

export { ModeToggle }
