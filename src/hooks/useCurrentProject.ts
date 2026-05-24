import { useEffect, useState } from "react";
import { Project } from "../types";

const CONTEXT_CHANGED_EVENT = "autotable-context-changed";

export function useCurrentProject() {
  const [currentProject, setCurrentProject] = useState<Project | null>(() => {
    const project = localStorage.getItem("currentProject");
    return project ? JSON.parse(project) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const project = localStorage.getItem("currentProject");
      setCurrentProject(project ? JSON.parse(project) : null);
    };

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const clearCurrentProject = () => {
    localStorage.removeItem("currentProject");
    setCurrentProject(null);
    window.dispatchEvent(new Event(CONTEXT_CHANGED_EVENT));
  };

  return {
    currentProject,
    clearCurrentProject,
    isInProject: !!currentProject,
  };
}
