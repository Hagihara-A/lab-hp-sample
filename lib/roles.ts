export const roles = {
  faculty: "教員",
  "administrative-staff": "職員",
  researcher: "研究員",
  "doctoral-student": "博士課程",
  "master-student": "修士課程",
  "undergraduate-student": "学部生",
  alumni: "卒業生",
} as const;
export type Roles = keyof typeof roles;
export const roles_en = Object.keys(roles) as Roles[];
