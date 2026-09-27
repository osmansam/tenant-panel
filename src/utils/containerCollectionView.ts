import type { ContainerModel } from "./api/container";

export const CONTAINER_PAGE_SIZES = [10, 20, 50] as const;
export const DEFAULT_CONTAINER_PAGE_SIZE = 10;

const searchableContainerText = (container: ContainerModel) =>
  [container.schemaName, container.collectionName, container.id]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();

export const filterContainers = (
  containers: ContainerModel[],
  query: string,
) => {
  const normalized = query.trim().toLocaleLowerCase();

  return normalized
    ? containers.filter((container) =>
        searchableContainerText(container).includes(normalized),
      )
    : containers;
};

export const getContainerCollectionPage = (
  containers: ContainerModel[],
  query: string,
  requestedPage: number,
  pageSize: number,
) => {
  const filtered = filterContainers(containers, query);
  const safePageSize = CONTAINER_PAGE_SIZES.includes(
    pageSize as (typeof CONTAINER_PAGE_SIZES)[number],
  )
    ? pageSize
    : DEFAULT_CONTAINER_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(filtered.length / safePageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const startIndex = (page - 1) * safePageSize;

  return {
    items: filtered.slice(startIndex, startIndex + safePageSize),
    page,
    pageSize: safePageSize,
    totalItems: filtered.length,
    totalPages,
    startNumber: filtered.length ? startIndex + 1 : 0,
    endNumber: Math.min(startIndex + safePageSize, filtered.length),
  };
};
