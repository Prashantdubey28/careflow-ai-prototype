export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const parsedDate = year && month && day
    ? new Date(year, month - 1, day)
    : new Date(dateStr)

  return parsedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
