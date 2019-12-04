/*
    Purpose: Utility functions available for cross-component usage
    Author(s): Chase Fite
*/

export function createDateTimeToISO() {
    const newDate = new Date()
    return newDate.toISOString()
}

export function convertDateTimeFromISO(date) {
    return new Date(date)
}

export function formatTimestamp(timestamp) {
    const convertedTimestamp = convertDateTimeFromISO(timestamp)
    const time = convertedTimestamp.toTimeString()
    const date = convertedTimestamp.toDateString()
    const dateTimeString = `${date}, ${time.split(":")[0] + ":" + time.split(":")[1]}`
    return dateTimeString
}