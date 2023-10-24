
function getMonthAndYear(dateString:string){
    const months = [ 'Jan', 'Feb', 'Mar','April', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let [year, month, day] = dateString.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    
   const monthString = months[localDate.getMonth()]

    return `${monthString} ${year}`
}

function getDate(dateString:string){

    const [year, month, day] = dateString.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    
    const date = localDate.getDate()
    
    return date
}

export {
    getMonthAndYear,
    getDate
}