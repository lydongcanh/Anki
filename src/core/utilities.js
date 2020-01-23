/** 
 * Add days to Date. 
 * @param {Date} date
 * @param {number} days
 */
export function addDays(date, days) {
    let newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}