import dayjs from 'dayjs'
const isToday = require('dayjs/plugin/isToday')
const isYesterday = require('dayjs/plugin/isYesterday')
dayjs.extend(isToday)
dayjs.extend(isYesterday)

export function formatTime(time, format) {
  // console.log(time, 'formatTime')
  let txt = ''
  time = Number(time)
  if (format) {
    format = format
  } else if (dayjs(time).isToday()) {
    format = 'HH:mm A'
    txt = 'Today '
  } else if (dayjs(time).isYesterday()) {
    format = 'HH:mm A'
    txt = 'Yesterday '
  } else {
    format = 'DD/MM/YYYY HH:mm:ss'
  }
  return txt + dayjs(time).format(format)
}
