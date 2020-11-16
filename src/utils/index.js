export const timeFilter = (date) => {
  if (['string', 'number'].includes(typeof date)) {
    date = new Date(date)
  }
  if (isNaN(date.getHours())) {
    throw new Error('Wrong format data')
  }
  return date.getHours() + ':' + date.getMinutes()
}
