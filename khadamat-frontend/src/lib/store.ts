import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'ar' | 'en';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  location: {
    cityId?: string;
    allowGeolocation: boolean;
  };
}

interface AppState {
  isLoading: boolean;
  error: string | null;
  lastActivity: Date | null;
}

interface UIState {
  sidebarOpen: boolean;
  modalStack: string[];
  activeTab: string;
}

// Store interface
interface AppStore extends UserPreferences, AppState, UIState {
  // Actions
  setTheme: (theme: UserPreferences['theme']) => void;
  setLanguage: (language: UserPreferences['language']) => void;
  updateNotifications: (notifications: Partial<UserPreferences['notifications']>) => void;
  setLocation: (location: Partial<UserPreferences['location']>) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateLastActivity: () => void;

  setSidebarOpen: (open: boolean) => void;
  pushModal: (modalId: string) => void;
  popModal: () => void;
  setActiveTab: (tab: string) => void;

  // Selectors
  isDarkMode: () => boolean;
  hasActiveModal: () => boolean;
  getCurrentModal: () => string | null;
}

// Initial state
const initialState = {
  // User Preferences
  theme: 'auto' as const,
  language: 'fr' as const,
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  location: {
    allowGeolocation: false,
  },

  // App State
  isLoading: false,
  error: null,
  lastActivity: null,

  // UI State
  sidebarOpen: false,
  modalStack: [],
  activeTab: 'home',
};

// Create store with persistence
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Actions
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      updateNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
      setLocation: (location) =>
        set((state) => ({
          location: { ...state.location, ...location },
        })),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      updateLastActivity: () => set({ lastActivity: new Date() }),

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      pushModal: (modalId) =>
        set((state) => ({
          modalStack: [...state.modalStack, modalId],
        })),
      popModal: () =>
        set((state) => ({
          modalStack: state.modalStack.slice(0, -1),
        })),
      setActiveTab: (activeTab) => set({ activeTab }),

      // Selectors
      isDarkMode: () => {
        const { theme } = get();
        if (theme === 'auto') {
          // Check system preference
          return typeof window !== 'undefined' &&
                 window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return theme === 'dark';
      },

      hasActiveModal: () => get().modalStack.length > 0,

      getCurrentModal: () => {
        const { modalStack } = get();
        return modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
      },
    }),
    {
      name: 'khadamat-app-store',
      storage: createJSONStorage(() => localStorage),
      // Only persist user preferences and some UI state
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        notifications: state.notifications,
        location: state.location,
        sidebarOpen: state.sidebarOpen,
        activeTab: state.activeTab,
      }),
    }
  )
);

// Selectors for optimized re-renders
export const useTheme = () => useAppStore((state) => state.theme);
export const useLanguage = () => useAppStore((state) => state.language);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useLocation = () => useAppStore((state) => state.location);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen);
export const useActiveTab = () => useAppStore((state) => state.activeTab);
export const useIsDarkMode = () => useAppStore((state) => state.isDarkMode());
export const useHasActiveModal = () => useAppStore((state) => state.hasActiveModal());
export const useCurrentModal = () => useAppStore((state) => state.getCurrentModal());

// Action selectors
export const useThemeActions = () => useAppStore((state) => ({
  setTheme: state.setTheme,
}));

export const useNotificationActions = () => useAppStore((state) => ({
  updateNotifications: state.updateNotifications,
}));

export const useUIActions = () => useAppStore((state) => ({
  setSidebarOpen: state.setSidebarOpen,
  pushModal: state.pushModal,
  popModal: state.popModal,
  setActiveTab: state.setActiveTab,
  setLoading: state.setLoading,
  setError: state.setError,
  updateLastActivity: state.updateLastActivity,
}));