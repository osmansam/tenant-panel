import { createContext, useContext } from "react";
export interface VisualDataField { name: string; type: string; path: string[] }
export interface VisualDataSchema { name: string; fields: VisualDataField[] }
export const VisualDataContext = createContext<readonly VisualDataSchema[]>([]);
export const useVisualDataSchemas = () => useContext(VisualDataContext);
