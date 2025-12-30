# Page Designer - User Guide

## Overview

The Page Designer is a visual tool for creating dynamic page layouts with a grid-based system. It allows you to create complex page structures with tables, charts, and tab panels without writing code.

## Features

- **Visual Grid Editor**: Drag and drop interface for creating layouts
- **Multiple Component Types**: Tables, Charts (16 types), Tab Panels
- **Flexible Grid System**: 1-4 column layouts with customizable gaps
- **Cell Spanning**: Merge cells across rows and columns
- **Tab Panels**: Create tabbed interfaces with multiple components
- **Import/Export**: Save and load page structures as JSON
- **Live Preview**: See your changes in real-time

## How to Use

### 1. Adding a Section

1. Click "Add Section" in the left sidebar
2. Configure the section settings:
   - **Columns**: Choose 1-4 columns for your grid
   - **Gap**: Set spacing between cells (in pixels)

### 2. Adding Cells

1. Select a section
2. Click "Add Cell" button
3. Configure cell properties:
   - **Row**: Vertical position (1-based)
   - **Column**: Horizontal position (1-based)
   - **Row Span**: Number of rows to span
   - **Col Span**: Number of columns to span

### 3. Adding Components

Click the "+" button on a cell to add a component:

#### Table Component

- Select "Table" from component type
- Choose a schema from the dropdown
- The table will display all data from that schema

#### Chart Components

Available chart types:

- Bar Chart
- Line Chart
- Pie Chart
- Area Chart
- Radar Chart
- Heatmap
- Scatter Plot
- Funnel Chart
- Sankey Diagram
- Sunburst
- Treemap
- Calendar
- Bump Chart
- Stream Chart
- Waffle Chart
- Circle Packing

For charts:

1. Select the chart type
2. Choose a schema
3. Enter a pipeline name
4. (Optional) Add a title

#### Tab Panel Component

1. Select "Tab Panel"
2. Click "Add Tab" to create tabs
3. For each tab:
   - Enter a tab title
   - Add tables to the tab by selecting schemas

### 4. Component Configuration

Each component can have:

- **Title**: Optional display title
- **Data Binding**: Connection to your data source
  - Schema: For tables
  - Pipeline: For charts
- **Order**: Display order within a cell

## Example Structure

```json
{
  "sections": [
    {
      "columns": 2,
      "gap": 16,
      "cells": [
        {
          "id": "cell-1",
          "row": 1,
          "column": 1,
          "components": [
            {
              "id": "table-1",
              "type": "table",
              "order": 1,
              "dataBinding": {
                "kind": "schema",
                "schemaName": "users"
              }
            }
          ]
        },
        {
          "id": "cell-2",
          "row": 1,
          "column": 2,
          "components": [
            {
              "id": "chart-1",
              "type": "barChart",
              "title": "User Statistics",
              "order": 1,
              "dataBinding": {
                "kind": "pipeline",
                "schemaName": "users",
                "pipelineName": "userStats"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## Tips and Best Practices

1. **Start Simple**: Begin with one section and one cell, then expand
2. **Use Spanning**: Merge cells for larger components like dashboards
3. **Organization**: Group related components in the same section
4. **Naming**: Use descriptive titles for charts and components
5. **Testing**: Preview your layout before saving
6. **Export Often**: Save your work frequently by exporting JSON

## Keyboard Shortcuts

- Click cell to select
- Click section in sidebar to edit
- Use number inputs for precise positioning

## Integration

To use the designed page in your application:

```tsx
import { DynamicPageRenderer } from "./components/DynamicPageRenderer";
import { GridSection } from "./types/page";

function MyPage() {
  const sections: GridSection[] = [
    // Your designed structure
  ];

  return <DynamicPageRenderer sections={sections} />;
}
```

## Troubleshooting

**Component not showing?**

- Check that the schema/pipeline name is correct
- Ensure dataBinding is properly configured

**Grid layout looks wrong?**

- Verify row/column numbers are sequential
- Check that rowSpan/colSpan don't exceed grid columns

**Tab panel empty?**

- Make sure you've added tabs
- Verify each tab has at least one component

## Advanced Features

### Tab Panel with Grouping

You can create dynamic tabs based on data:

```json
{
  "type": "tabPanel",
  "groupBy": {
    "groupByObjectId": "category",
    "groupByField": "name"
  },
  "tabs": [
    {
      "title": "Template",
      "components": [
        {
          "type": "table",
          "dataBinding": {
            "kind": "schema",
            "schemaName": "products"
          },
          "groupBy": {
            "groupByObjectId": "category",
            "groupByField": "name"
          }
        }
      ]
    }
  ]
}
```

This will create a tab for each category, filtering products by that category.
