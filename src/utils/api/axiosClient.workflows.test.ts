import { describe, expect, it } from "vitest";
import { axiosClient } from "./axiosClient";

describe("workflow response normalization", () => {
  it.each(["Workflows", "workflows"])(
    "preserves authored JSON inside %s while normalizing metadata",
    async (workflowsKey) => {
      const response = await axiosClient.get("/acme/shop/container", {
        adapter: async (config) => ({
          config, status: 200, statusText: "OK", headers: {},
          data: {
            StatusCode: 200,
            Data: [{
              _id: "container-1",
              SchemaName: "siteConfig",
              [workflowsKey]: [{
                Name: "loadPublicPage",
                Payload: { Site_Path: [], "navigation.order": 1 },
                Conditions: [{
                  Operator: "and",
                  Conditions: [{ Field: "settings", Value: { "$in": ["en"], Locale_ID: "en" } }],
                }],
                Steps: [{
                  Name: "loadRouteContext", TargetSchema: "siteConfig",
                  Config: {
                    pipeline: [
                      { "$limit": 1 },
                      { "$project": { "navigation.order": 1, Raw_Data: { "$literal": { "$limit": 99, Site_ID: "a" } } } },
                    ],
                  },
                  ElseSteps: [{ Config: { values: { Site_ID: "fallback" } } }],
                  Branches: [{ Steps: [{ Config: { filter: { id: { "$in": ["a"] } } } }] }],
                }],
              }],
            }],
          },
        }),
      });

      expect(response.data).toEqual({
        statusCode: 200,
        data: [{
          _id: "container-1",
          schemaName: "siteConfig",
          workflows: [{
            name: "loadPublicPage",
            payload: { Site_Path: [], "navigation.order": 1 },
            conditions: [{
              operator: "and",
              conditions: [{ field: "settings", value: { "$in": ["en"], Locale_ID: "en" } }],
            }],
            steps: [{
              name: "loadRouteContext", targetSchema: "siteConfig",
              config: {
                pipeline: [
                  { "$limit": 1 },
                  { "$project": { "navigation.order": 1, Raw_Data: { "$literal": { "$limit": 99, Site_ID: "a" } } } },
                ],
              },
              elseSteps: [{ config: { values: { Site_ID: "fallback" } } }],
              branches: [{ steps: [{ config: { filter: { id: { "$in": ["a"] } } } }] }],
            }],
          }],
        }],
      });
    },
  );
});
