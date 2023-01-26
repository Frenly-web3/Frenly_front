export const formatDate = (date: Date) => {
  return `${date.getDate()}.${date.getMonth().toLocaleString()}.${date.getFullYear()}`
}
