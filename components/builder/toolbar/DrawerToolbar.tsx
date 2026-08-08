"use client"

import { Button } from "@/components/ui/button"
import { useLayoutStore } from "@/store/useLayoutStore"

import {
  Drawer as DrawerRoot,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { PanelBottomOpen } from "lucide-react"

export function Drawer({ children }: { children: React.ReactNode }) {
  const isDrawerOpen = useLayoutStore((state) => state.isDrawerOpen)
  const setDrawerOpen = useLayoutStore((state) => state.setDrawerOpen)

  return (
    <div className="flex flex-wrap gap-2">
      <DrawerRoot
        key="drawer-toolbar"
        direction="bottom"
        open={isDrawerOpen}
        onOpenChange={setDrawerOpen}
      >
        <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto px-4">{children}</div>
        </DrawerContent>
      </DrawerRoot>
    </div>
  )
}

export function DrawerTrigger() {
  const isDesktop = useLayoutStore((state) => state.isDesktop)
  const isDrawerOpen = useLayoutStore((state) => state.isDrawerOpen)
  const setDrawerOpen = useLayoutStore((state) => state.setDrawerOpen)

  if (isDesktop) {
    return null
  }

  return (
    <div className="absolute bottom-0 left-0 z-10 px-4 py-4">
      <Button size="icon" onClick={() => setDrawerOpen(!isDrawerOpen)}>
        <PanelBottomOpen />
      </Button>
    </div>
  )
}
