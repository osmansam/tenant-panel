import { axiosClient } from "./axiosClient";

export interface DynamicArrayTarget {
  schemaName: string;
  parentId: string | number;
  arrayField: string;
  rowIdentityField: string;
}

export interface DynamicArrayMutationResult {
  parent: Record<string, unknown>;
  row?: Record<string, unknown>;
}

const segment = (value: unknown) => encodeURIComponent(String(value));
const basePath = (target: DynamicArrayTarget) =>
  `/dynamic/${segment(target.schemaName)}/${segment(target.parentId)}/array/${segment(target.arrayField)}`;
const dataOf = (response: { data: { data?: DynamicArrayMutationResult } }) => response.data.data as DynamicArrayMutationResult;

export const addDynamicArrayRow = async (target: DynamicArrayTarget & { item: Record<string, unknown> }) =>
  dataOf(await axiosClient.post(basePath(target), { rowIdentityField: target.rowIdentityField, item: target.item }));

export const updateDynamicArrayRow = async (target: DynamicArrayTarget & { rowIdentity: unknown; updates: Record<string, unknown> }) =>
  dataOf(await axiosClient.patch(`${basePath(target)}/${segment(target.rowIdentity)}`, { rowIdentityField: target.rowIdentityField, updates: target.updates }));

export const deleteDynamicArrayRow = async (target: DynamicArrayTarget & { rowIdentity: unknown }) =>
  dataOf(await axiosClient.delete(`${basePath(target)}/${segment(target.rowIdentity)}`, { data: { rowIdentityField: target.rowIdentityField } }));

export const reorderDynamicArrayRows = async (target: DynamicArrayTarget & { orderField: string; rowIdentities: unknown[] }) =>
  dataOf(await axiosClient.patch(`${basePath(target)}/reorder`, { rowIdentityField: target.rowIdentityField, orderField: target.orderField, rowIdentities: target.rowIdentities }));
