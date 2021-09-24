export const ROLE_TRANSLATE: { [Role: string]: string | undefined } = {
  faculty: "教員",
  "administrative-staff": "職員",
  researcher: "研究員",
  "doctoral-student": "博士課程",
  "master-student": "修士課程",
  "undergraduate-student": "学部生",
  alumni: "卒業生",
};

export const ROLE_ORDERS: { [role: string]: number | undefined } = {
  faculty: 0,
  "administrative-staff": 1,
  researcher: 2,
  "doctoral-student": 3,
  "master-student": 4,
  "undergraduate-student": 5,
  alumni: 6,
};
