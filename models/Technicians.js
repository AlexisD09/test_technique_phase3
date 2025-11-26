class Technicians {
    constructor(id, name, speciality, efficiency, startTime, endTime, lunchBreak){
        this.id = id;
        this.name = name;
        this.speciality = speciality;
        this.efficiency = efficiency;
        this.startTime = startTime;
        this.endTime = endTime;
        this.bookings = [];
        this.lunchBreak = lunchBreak;

        this.functions = require('../timeFunctions.js');
    }

    /**
     * Vérifie dans le planning du technicien la prochaine disponibilité
     * en fonction du temps nécessaire et de l'heure de d'arrivé de l'échantillon
     * @param arrivalTime heure d'arrivé de l'échantillon
     * @param durationMinutes le temps d'analyse nécessaire
     * @returns {string} retourne l'heure de départ la plus proche
     */
    getNextAvailableTime(arrivalTime, durationMinutes) {
        if(this.bookings.length === 0) return arrivalTime;

        const lunchBreakTime = this.functions.splitTimeSlot(this.lunchBreak);
        const lunchStartMinutes = this.functions.parseTimeInMinute(lunchBreakTime.timeStart);
        const lunchEndMinutes = this.functions.parseTimeInMinute(lunchBreakTime.timeEnd);

        let start = this.functions.parseTimeInMinute(arrivalTime);

        if (start < this.startTime) {
            start = this.startTime;
        }
        if (start > lunchStartMinutes && start < lunchEndMinutes) {
            start = lunchEndMinutes;
        }

        for (const booking of this.bookings) {
            const bookingStart = this.functions.parseTimeInMinute(booking.startTime);
            const bookingEnd = this.functions.parseTimeInMinute(booking.endTime);

            if (start + durationMinutes <= bookingStart) {
                break;
            } else if(start + durationMinutes > this.endTime) {
                return null;
            } else if(start + durationMinutes > lunchStartMinutes) {
                start = lunchEndMinutes;
            } else {
                start = bookingEnd;
            }
        }

        return this.functions.formatTime(start);
    }

    /**
     * Permet de trouver un technicien disponible le plus tôt possible
     * @param technicians tableau des techniciens
     * @param sampleType Type d'échantillon
     * @param arrivalTime Heure d'arrivé de l'échantillon, format 'HH:MM'
     * @param durationMinutes Durée de l'analyse en minute
     * @returns {{technician: Technicians, startTime: string}}
     */
    static getNextAvailableTechnician(technicians, sampleType, arrivalTime, durationMinutes) {
        const functions = require('../timeFunctions.js');

        let bestTechnician = null;
        let bestAvailableTimeMinutes = Infinity;

        for(let technician of technicians) {
            let firstSpeciality = technician.speciality[0];
            let secondSpeciality = null;
            let durationMinutesCache = Math.round(durationMinutes/technician.efficiency);

            if(technician.speciality.length > 1){
                secondSpeciality = technician.speciality[1]
            }

            if(firstSpeciality !== sampleType && secondSpeciality !== sampleType) continue;

            const nextAvailableTime = technician.getNextAvailableTime(arrivalTime, durationMinutesCache);
            if(nextAvailableTime === null) break;

            const nextAvailableTimeMinutes = functions.parseTimeInMinute(nextAvailableTime);

            if(bestAvailableTimeMinutes > nextAvailableTimeMinutes) {
                bestAvailableTimeMinutes = nextAvailableTimeMinutes;
                bestTechnician = technician;
            }
        }

        return {
            technician: bestTechnician,
            startTime: functions.formatTime(bestAvailableTimeMinutes)
        };
    }
}

module.exports = Technicians;