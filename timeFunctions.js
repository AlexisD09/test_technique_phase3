/**
 * Permet calculer l'heure de fin avec une heure de départ et une durée en minute
 * @param startTime heure de début, format 'HH:MM'
 * @param analysisTime durée de l'analyse en minute
 * @returns {string} heure de fin, format 'HH:MM'
 */
function calculateEndTime(startTime, analysisTime) {
    const [hours, minutes] = startTime.split(':').map(Number);

    let totalMinutes = hours * 60 + minutes + analysisTime;

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

/**
 * Transforme une heure au format 'HH:MM' en minute
 * @param time heure à transformer, format 'HH:MM'
 * @returns {number} minutes
 */
function parseTimeInMinute(time) {
    const [hours, minutes] = time.split(':').map(Number);

    return hours * 60 + minutes;
}

/**
 * Transforme des minutes en heure au format 'HH:MM'
 * @param minutes
 * @returns {string} heure, format 'HH:MM'
 */
function formatTime(minutes){
    const newHours = Math.floor(minutes / 60);
    const newMinutes = minutes % 60;

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

module.exports = { calculateEndTime, parseTimeInMinute, formatTime };