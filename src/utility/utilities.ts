export const tryConvertStringToNumber = (val: string, defaultValue: number): number => {
  const num: number = Number(val);
  if (!isNaN(num)) {
    return num;
  }
  return defaultValue;
};

export const getDevicePositionLabel = (rowIndex: number, columnIndex: number): string => {
  if (rowIndex < 0 || columnIndex < 0) {
    return 'Unassigned';
  } else {
    return String.fromCharCode(65 + columnIndex) + String.fromCharCode(49 + rowIndex);
  }
};
