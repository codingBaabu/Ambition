
function getMonthAndYear(dateString:string){
    const months = [ 'Jan', 'Feb', 'Mar','April', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

   const fullDate = new Date(dateString)
   const month = months[fullDate.getMonth()]
   const year = fullDate.getFullYear()

    return `${month} ${year}`
}

function getDate(dateString:string){
    const fullDate = new Date(dateString)
    const date = fullDate.getDate()
    return date
}

export {
    getMonthAndYear,
    getDate
}