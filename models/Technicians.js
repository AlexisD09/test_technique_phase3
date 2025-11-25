class Technicians {
    constructor(id, name, speciality, startTime, endTime){
        this.id = id;
        this.name = name;
        this.speciality = speciality;
        this.startTime = startTime;
        this.endTime = endTime;
        this.bookings = [];

        this.functions = require('../timeFunctions.js');
    }

    /**
     * Vérifie dans le planning du technicien la prochaine disponibilité
     * en fonction du temps nécessaire et de l'heure de d'arrivé de l'échantillon
     * @param arrivalTime heure d'arrivé de l'échantillon
     * @param durationMinutes le temps d'analyse nécessaire
     * @returns {string} retourne l'heure de départ la plus proche
     */
    getNextAvailable(arrivalTime, durationMinutes) {
        let start = this.functions.parseTimeInMinute(arrivalTime);

        for (const b of this.bookings) {
            const bookingStart = this.functions.parseTimeInMinute(b.startTime);
            const bookingEnd = this.functions.parseTimeInMinute(b.endTime);

            if (start + durationMinutes <= bookingStart) {
                break;
            } else {
                start = bookingEnd;
            }
        }

        return this.functions.formatTime(start);
    }
}

module.exports = Technicians;