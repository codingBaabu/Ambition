
function getDateFormat(dateString){
    const months = [ 'Jan', 'Feb', 'Mar','April', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

   const fullDate = new Date(dateString)

   const date = fullDate.getDate()
   const month = months[fullDate.getMonth()]
   const year = fullDate.getFullYear()

    return `${date}-${month}-${year}`
}

export {
    getDateFormat
}