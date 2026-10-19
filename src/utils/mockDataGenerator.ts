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


