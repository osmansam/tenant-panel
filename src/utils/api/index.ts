import { QueryKey } from "@tanstack/react-query";
import { AxiosHeaders } from "axios";
import { axiosClient } from "./axiosClient";

interface BaseRequest {
  path: string;
}

interface RequestWithPayload<P> extends BaseRequest {
  payload: P;
}

interface RequestWithPayloadAndHeader<P> extends RequestWithPayload<P> {
  headers: AxiosHeaders;
}

export interface UpdatePayload<P> {
  id: number | string;
  updates: Partial<P>;
  additionalInvalidates?: QueryKey[];
}

// P = payload, R = ResponseType
export async function get<R>({ path }: BaseRequest): Promise<R> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const { data } = await axiosClient.get<R>(`${path}`, {
    headers,
  });

  return data;
}

// P = payload, R = ResponseType
export async function post<P, R>({
  path,
  payload,
}: RequestWithPayload<P>): Promise<R> {
  const { data } = await axiosClient.post<R>(`${path}`, payload);
  return data;
}

// P = payload, R = ResponseType
export async function postWithHeader<P, R>({
  path,
  payload,
  headers,
}: RequestWithPayloadAndHeader<P>): Promise<R> {
  const { data } = await axiosClient.post<R>(`${path}`, payload, { headers });
  return data;
}

// P = payload, R = ResponseType
export async function put<P, R>({
  path,
  payload,
}: RequestWithPayload<P>): Promise<R> {
  return axiosClient.put(`${path}`, payload);
}

// P = payload, R = ResponseType
export async function patch<P, R>({
  path,
  payload,
}: RequestWithPayload<P>): Promise<R> {
  return axiosClient.patch(`${path}`, payload);
}

// R = ResponseType
export async function remove<R>({ path }: BaseRequest): Promise<R> {
  return axiosClient.delete(`${path}`);
}

// Export page API
export * from "./page";

// Export audit logs API
export * from "./auditLogs";

// Export project API
export * from "./project";
