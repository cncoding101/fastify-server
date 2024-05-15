const enumValues = <T>(enumeration: Record<string, any>): T[] => {
  return Object.values(enumeration).filter(
    (value) => typeof value === "string"
  ) as T[];
};

export { enumValues };
