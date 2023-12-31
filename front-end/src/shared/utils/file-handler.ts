export const FileHandler = {
  generateFileCsv: (columns: string[]): Blob => {
    const csvContent = columns.join(",");
    const blob = new Blob([csvContent], { type: "text/csv" });
    return blob;
  },
};
