import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme:       Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: next });
        applyTheme(next);
      },
    }),
    {
      name: 'keybeen-theme', // localStorage key
      onRehydrateStorage: () => (state) => {
        // Apply persisted theme immediately on page load
        if (state?.theme) applyTheme(state.theme);
      },
    }
  )
);

/** Adds/removes the `data-theme="light"` attribute on <html> */
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Apply on first load (before React mounts) to avoid flash
applyTheme(
  (localStorage.getItem('keybeen-theme')
    ? JSON.parse(localStorage.getItem('keybeen-theme')!).state?.theme
    : null) ?? 'dark'
);