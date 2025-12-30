import { Field, Types } from "./api/container";

/**
 * Generates mock data based on field type
 */
export function generateMockValue(field: Field, index: number): unknown {
  const fieldType = (field.type || "").toLowerCase();
  const fieldName = field.name;

  // Handle enumList if present
  if (field.enumList && field.enumList.length > 0) {
    return field.enumList[index % field.enumList.length];
  }

  // Generate based on type
  switch (fieldType) {
    case Types.String:
    case "string":
      return `${fieldName} ${index + 1}`;

    case Types.Number:
    case "number":
    case "int":
    case "integer":
      return Math.floor(Math.random() * 1000) + index;

    case Types.Boolean:
    case "boolean":
    case "bool":
      return index % 2 === 0;

    case Types.Date:
    case "date":
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date.toISOString();

    case Types.Image:
    case "image":
    case "img":
      return `https://picsum.photos/seed/${index}/200/200`;

    case Types.ObjectId:
    case "objectid":
      return `obj_${fieldName}_${index + 1}`;

    case Types.AutoIncrementId:
    case "autoincrementid":
      return index + 1;

    case Types.ObjectIdArray:
    case "objectidarray":
      return [`obj_${fieldName}_${index}_1`, `obj_${fieldName}_${index}_2`];

    case Types.StringArray:
    case "stringarray":
    case "string[]":
    case "array<string>":
      return [`${fieldName} item ${index}_1`, `${fieldName} item ${index}_2`];

    case Types.NumberArray:
    case "numberarray":
    case "number[]":
    case "array<number>":
      return [index * 10, index * 10 + 5];

    case Types.IntArray:
    case "intarray":
    case "int[]":
    case "array<int>":
      return [index * 5, index * 5 + 1];

    default:
      return `${fieldName} value ${index + 1}`;
  }
}

/**
 * Generates an array of mock items based on container fields
 */
export function generateMockData<
  T extends Record<string, unknown> & { _id: string }
>(fields: Field[], count: number = 10): T[] {
  const mockData: T[] = [];

  for (let i = 0; i < count; i++) {
    const item: Record<string, unknown> = {
      _id: `mock_id_${i + 1}`,
    };

    fields.forEach((field) => {
      // Skip equation fields as they are calculated
      if (field.equation) return;

      // Skip _id and id fields
      if (field.name === "_id" || field.name === "id") return;

      item[field.name] = generateMockValue(field, i);
    });

    mockData.push(item as T);
  }

  return mockData;
}

/**
 * Generates mock chart data based on chart type
 */
export function generateMockChartData(chartType: string): unknown {
  switch (chartType) {
    case "bar":
      return [
        { country: "USA", value: 150 },
        { country: "China", value: 120 },
        { country: "India", value: 90 },
        { country: "Japan", value: 80 },
        { country: "Germany", value: 70 },
      ];

    case "line":
      return [
        {
          id: "series1",
          data: [
            { x: "Jan", y: 100 },
            { x: "Feb", y: 120 },
            { x: "Mar", y: 90 },
            { x: "Apr", y: 140 },
            { x: "May", y: 130 },
          ],
        },
        {
          id: "series2",
          data: [
            { x: "Jan", y: 80 },
            { x: "Feb", y: 95 },
            { x: "Mar", y: 110 },
            { x: "Apr", y: 100 },
            { x: "May", y: 115 },
          ],
        },
      ];

    case "pie":
      return [
        { id: "Category A", value: 35, label: "Category A" },
        { id: "Category B", value: 25, label: "Category B" },
        { id: "Category C", value: 20, label: "Category C" },
        { id: "Category D", value: 15, label: "Category D" },
        { id: "Category E", value: 5, label: "Category E" },
      ];

    case "area":
      return [
        {
          id: "Group A",
          data: [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 12 },
          ],
        },
        {
          id: "Group B",
          data: [
            { x: 1, y: 8 },
            { x: 2, y: 12 },
            { x: 3, y: 14 },
          ],
        },
      ];

    case "radar":
      return [
        {
          category: "Speed",
          value1: 80,
          value2: 65,
        },
        {
          category: "Power",
          value1: 90,
          value2: 75,
        },
        {
          category: "Accuracy",
          value1: 70,
          value2: 85,
        },
        {
          category: "Range",
          value1: 60,
          value2: 70,
        },
      ];

    case "heatmap":
      return [
        {
          id: "Row 1",
          data: [
            { x: "Col 1", y: 10 },
            { x: "Col 2", y: 20 },
            { x: "Col 3", y: 15 },
          ],
        },
        {
          id: "Row 2",
          data: [
            { x: "Col 1", y: 25 },
            { x: "Col 2", y: 12 },
            { x: "Col 3", y: 18 },
          ],
        },
      ];

    case "scatter":
      return [
        {
          id: "Group A",
          data: [
            { x: 10, y: 20 },
            { x: 15, y: 25 },
            { x: 20, y: 30 },
          ],
        },
        {
          id: "Group B",
          data: [
            { x: 12, y: 18 },
            { x: 17, y: 22 },
            { x: 22, y: 28 },
          ],
        },
      ];

    case "calendar":
      const today = new Date();
      const data = [];
      for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
          day: date.toISOString().split("T")[0],
          value: Math.floor(Math.random() * 100),
        });
      }
      return data;

    case "funnel":
      return [
        { id: "Step 1", value: 1000, label: "Step 1" },
        { id: "Step 2", value: 750, label: "Step 2" },
        { id: "Step 3", value: 500, label: "Step 3" },
        { id: "Step 4", value: 250, label: "Step 4" },
        { id: "Step 5", value: 100, label: "Step 5" },
      ];

    case "sankey":
      return {
        nodes: [
          { id: "Source A" },
          { id: "Source B" },
          { id: "Target 1" },
          { id: "Target 2" },
        ],
        links: [
          { source: "Source A", target: "Target 1", value: 50 },
          { source: "Source A", target: "Target 2", value: 30 },
          { source: "Source B", target: "Target 1", value: 20 },
          { source: "Source B", target: "Target 2", value: 40 },
        ],
      };

    case "sunburst":
      return {
        name: "root",
        children: [
          {
            name: "Category A",
            children: [
              { name: "A1", value: 10 },
              { name: "A2", value: 15 },
            ],
          },
          {
            name: "Category B",
            children: [
              { name: "B1", value: 20 },
              { name: "B2", value: 25 },
            ],
          },
        ],
      };

    case "treemap":
      return {
        name: "root",
        children: [
          { name: "Item A", value: 100 },
          { name: "Item B", value: 80 },
          { name: "Item C", value: 60 },
          { name: "Item D", value: 40 },
        ],
      };

    case "bump":
      return [
        {
          id: "Series 1",
          data: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 1 },
          ],
        },
        {
          id: "Series 2",
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 2 },
          ],
        },
      ];

    case "stream":
      return [
        {
          label: "Stream A",
          data: [10, 15, 20, 18, 22],
        },
        {
          label: "Stream B",
          data: [8, 12, 15, 14, 18],
        },
      ];

    case "waffle":
      return {
        total: 100,
        data: [
          { id: "Group A", value: 35, label: "Group A" },
          { id: "Group B", value: 25, label: "Group B" },
          { id: "Group C", value: 20, label: "Group C" },
          { id: "Group D", value: 20, label: "Group D" },
        ],
      };

    case "chord":
      return {
        matrix: [
          [0, 5, 10, 15],
          [5, 0, 8, 12],
          [10, 8, 0, 6],
          [15, 12, 6, 0],
        ],
        keys: ["A", "B", "C", "D"],
      };

    case "network":
      return {
        nodes: [
          { id: "Node 1", radius: 10 },
          { id: "Node 2", radius: 15 },
          { id: "Node 3", radius: 12 },
          { id: "Node 4", radius: 8 },
        ],
        links: [
          { source: "Node 1", target: "Node 2" },
          { source: "Node 1", target: "Node 3" },
          { source: "Node 2", target: "Node 4" },
          { source: "Node 3", target: "Node 4" },
        ],
      };

    case "circle-packing":
      return {
        name: "root",
        children: [
          {
            name: "Group A",
            children: [
              { name: "A1", value: 100 },
              { name: "A2", value: 150 },
            ],
          },
          {
            name: "Group B",
            children: [
              { name: "B1", value: 200 },
              { name: "B2", value: 250 },
            ],
          },
        ],
      };

    default:
      return [];
  }
}
