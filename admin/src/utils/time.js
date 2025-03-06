import dayjs from 'dayjs'
const time = {
    timeFormatter: (editTime) => {
        return dayjs(editTime).format('YYYY-MM-DD HH:mm:ss')
    }
}
export default time