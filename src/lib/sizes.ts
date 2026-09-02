export type SizeRow = {
  size: string;
  chest: string;
  length: string;
};

export const DYED_TEE_SIZES: SizeRow[] = [
  { size: "S", chest: "46", length: "67" },
  { size: "M", chest: "51", length: "69" },
  { size: "L", chest: "56", length: "70" },
  { size: "XL", chest: "61", length: "73" },
  { size: "2XL", chest: "66", length: "76" },
  { size: "3XL", chest: "70", length: "77" },
  { size: "4XL", chest: "76", length: "80" },
];

export const SIZE_COLUMNS = [
  { key: "size", label: "Size" },
  { key: "chest", label: "Chest, laid flat (cm)" },
  { key: "length", label: "Length, shoulder to hem (cm)" },
] as const;
