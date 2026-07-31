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
  const { data } = await axiosClient.put<R>(`${path}`, payload);
  return data;
}

// P = payload, R = ResponseType
export async function patch<P, R>({
  path,
  payload,
}: RequestWithPayload<P>): Promise<R> {
  const { data } = await axiosClient.patch<R>(`${path}`, payload);
  return data;
}

// R = ResponseType
export async function remove<R>({ path }: BaseRequest): Promise<R> {
  const { data } = await axiosClient.delete<R>(`${path}`);
  return data;
}

// Export page API
export * from "./page";

// Export audit logs API
export * from "./auditLogs";

// Export project API
export * from "./project";

// Export container API
export * from "./container";

// Export role schema API
export * from "./roleInfo";

// Export integration credential API
export * from "./integration";
