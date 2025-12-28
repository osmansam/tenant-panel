import { useEffect, useState } from "react";
import { Project } from "../types";

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
  };

  return {
    currentProject,
    clearCurrentProject,
    isInProject: !!currentProject,
  };
}
