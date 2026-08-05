import { create } from "zustand"

// ─── State & Actions ─────────────────────────────────────────────────────────

interface LayoutState {
  isDesktop: boolean
  isDrawerOpen: boolean
  setLayout: (isDesktop: boolean) => void
  setDrawerOpen: (isDrawerOpen: boolean) => void
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useLayoutStore = create<LayoutState>((set, get) => ({
  isDesktop: false,
  isDrawerOpen: false,
  setLayout: (isDesktop) => set({ isDesktop }),
  setDrawerOpen: (isDrawerOpen) => {
    const isDesktop = get()?.isDesktop
    isDesktop ? set({ isDrawerOpen: false }) : set({ isDrawerOpen })
  },
}))
