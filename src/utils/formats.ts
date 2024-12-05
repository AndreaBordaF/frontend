export function formatProyectURL(projectName: string): string {
    return projectName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/--+/g, '-')
      .trim();
};

export function formatDate(date: string): string {
  console.log(date);
  const dateObj = new Date(date);
  console.log(dateObj);
  const formatDate = dateObj.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  console.log(formatDate);
    return formatDate
}