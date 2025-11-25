function calculateEndTime(startTime, analysisTime) {
    const [hours, minutes] = startTime.split(':').map(Number);

    let totalMinutes = hours * 60 + minutes + analysisTime;

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

function parseTimeInMinute(time) {
    const [hours, minutes] = time.split(':').map(Number);

    return hours * 60 + minutes;
}

function formatTime(minutes){
    const newHours = Math.floor(minutes / 60);
    const newMinutes = minutes % 60;

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

module.exports = { calculateEndTime, parseTimeInMinute, formatTime };