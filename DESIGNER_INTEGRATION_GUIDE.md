# Page Designer Integration Guide

## Overview

The Page Designer is now fully integrated into your Project Management page. You can design page structures visually directly from the Pages section.

## How to Use

### 1. **Access the Designer**

From the Project Management page:

1. Navigate to the **Pages** section
2. Find the page you want to design
3. Click the **"Edit"** button on that page
4. The Page Designer will open in fullscreen mode

### 2. **Design Your Page**

Once in the designer:

#### **Add Sections**

- Click **"Add Section"** in the left sidebar
- Configure:
  - **Columns**: Choose 1-4 columns for your grid layout
  - **Gap**: Set spacing between cells (pixels)

#### **Add Cells**

- Select a section
- Click **"Add Cell"**
- Configure cell properties:
  - **Row**: Vertical position
  - **Column**: Horizontal position
  - **Row Span**: How many rows the cell spans
  - **Col Span**: How many columns the cell spans

#### **Add Components**

- Click the **"+"** button on any cell
- Choose component type:

  **Table:**

  - Select a schema from dropdown
  - Creates a full table with all that schema's data

  **Tab Panel:**

  - Click "Add Tab" to create tabs
  - Name each tab
  - Add tables to tabs by selecting schemas

  **Charts (16 types):**

  - Bar, Line, Pie, Area, Radar, etc.
  - Select schema
  - Enter pipeline name
  - Optionally add title

### 3. **Save Your Design**

- Click **"Save Page"** in the top right
- The page structure is saved to the database
- You can close the designer

### 4. **Preview Your Page**

- Click **"Preview"** button on any page
- Opens in a new tab
- Shows exactly how the page will render
- Uses real mock data for preview

### 5. **Routes to Add**

Add these routes to your application:

```tsx
import { PagePreviewPage } from "./pages";

// In your routes:
<Route path="/page-preview/:pageId" element={<PagePreviewPage />} />;
```

## Example Workflow

1. **Create a Dashboard Page:**

   ```
   Project Management → Pages → Create Page
   - Name: "Sales Dashboard"
   - Icon: "MdSpaceDashboard"
   ```

2. **Design the Layout:**

   ```
   Click "Edit" → Page Designer opens

   Add Section (2 columns, 16px gap)
   ├── Cell 1 (Row 1, Col 1)
   │   └── Bar Chart (Sales pipeline)
   └── Cell 2 (Row 1, Col 2)
       └── Table (Recent orders)
   ```

3. **Save and Preview:**
   ```
   Save Page → Close Designer → Click Preview
   ```

## Component Types Reference

### Tables

- **Data Source**: Schema name (e.g., "users", "products")
- **Features**: Pagination, filtering, sorting
- **Best For**: Data management, CRUD operations

### Tab Panels

- **Use Case**: Multiple related data views
- **Example**: Product categories, user groups
- **Can Contain**: Multiple tables, one per tab

### Charts

All 16 Nivo chart types supported:

- **Bar Chart**: Comparisons, rankings
- **Line Chart**: Trends over time
- **Pie Chart**: Proportions, percentages
- **Radar Chart**: Multi-variable comparisons
- **Heatmap**: Patterns, intensity
- **And 11 more...**

## Tips

1. **Start Simple**: Begin with 1 section, 1 column
2. **Use Spanning**: Create dashboard-style layouts with cell spans
3. **Group Related Data**: Put related components in the same section
4. **Test Preview**: Always preview before finalizing
5. **Iterate**: You can always edit and re-save

## Advanced Layout Example

```json
{
  "sections": [
    {
      "columns": 3,
      "gap": 16,
      "cells": [
        {
          "row": 1,
          "column": 1,
          "colSpan": 2,
          "components": [
            {
              "type": "barChart",
              "title": "Revenue Overview"
            }
          ]
        },
        {
          "row": 1,
          "column": 3,
          "components": [
            {
              "type": "pieChart",
              "title": "Categories"
            }
          ]
        },
        {
          "row": 2,
          "column": 1,
          "colSpan": 3,
          "components": [
            {
              "type": "table",
              "dataBinding": {
                "kind": "schema",
                "schemaName": "transactions"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

This creates:

- Row 1: Wide chart (2 cols) + Small chart (1 col)
- Row 2: Full-width table (3 cols)

## Troubleshooting

**Designer not opening?**

- Check that you have edit permissions
- Refresh the project management page

**Components not showing?**

- Verify schema names are correct
- Check that containers exist in your project

**Layout looks wrong?**

- Review row/column numbers
- Check spans don't exceed grid columns

**Preview shows errors?**

- Ensure all required fields are filled
- Check data bindings are complete
