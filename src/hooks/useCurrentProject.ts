import { useEffect, useState } from "react";
import { useUserContext } from "../context/User.context";
import { Project } from "../types";

export const CURRENT_PROJECT_CHANGE_EVENT = "currentProjectChange";

export function emitCurrentProjectChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CURRENT_PROJECT_CHANGE_EVENT));
    window.dispatchEvent(new Event("storage"));
  }
}

export function useCurrentProject() {
  const { user } = useUserContext();

  const readProjectFromStorage = (): Project | null => {
    try {
      const project = localStorage.getItem("currentProject");
      return project ? JSON.parse(project) : null;
    } catch {
      return null;
    }
  };

  const [currentProject, setCurrentProject] = useState<Project | null>(readProjectFromStorage);

  // Sync whenever user context changes (e.g. user switches projects or switches back to tenant)
  useEffect(() => {
    setCurrentProject(readProjectFromStorage());
  }, [user?.projectId, user?.projectSlug]);

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentProject(readProjectFromStorage());
    };

    // Listen for cross-tab storage changes and same-tab custom events
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(CURRENT_PROJECT_CHANGE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(CURRENT_PROJECT_CHANGE_EVENT, handleStorageChange);
    };
  }, []);

  const clearCurrentProject = () => {
    localStorage.removeItem("currentProject");
    setCurrentProject(null);
    emitCurrentProjectChange();
  };

  return {
    currentProject,
    clearCurrentProject,
    isInProject: !!currentProject,
  };
}
