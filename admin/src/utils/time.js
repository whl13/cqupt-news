import moment from "moment"
const time = {
    timeFormatter: (editTime) => {
        return moment(editTime).format('YYYY-MM-DD HH:mm:ss')
    }
}
export default time