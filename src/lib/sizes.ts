export type SizeRow = {
  size: string;
  chest: string;
  length: string;
  sleeve: string;
};

export const TOP_SIZES: SizeRow[] = [
  { size: "S", chest: "51", length: "69", sleeve: "62" },
  { size: "M", chest: "56", length: "72", sleeve: "64" },
  { size: "L", chest: "61", length: "74", sleeve: "65" },
  { size: "XL", chest: "66", length: "76", sleeve: "67" },
  { size: "2XL", chest: "71", length: "79", sleeve: "68" },
];

export const SIZE_COLUMNS = [
  { key: "size", label: "Size" },
  { key: "chest", label: "Chest, laid flat (cm)" },
  { key: "length", label: "Length, shoulder to hem (cm)" },
  { key: "sleeve", label: "Sleeve, shoulder to cuff (cm)" },
] as const;
