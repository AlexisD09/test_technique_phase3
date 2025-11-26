const functions = require("../timeFunctions");

class Equipments {
    constructor(id, name, type, compatibleTypes, capacity, maintenanceWindow, cleaningTime) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.compatibleTypes = compatibleTypes;
        this.capacity = capacity;
        this.available = true;
        this.maintenanceWindow = maintenanceWindow;
        this.cleaningTime = cleaningTime;
        this.bookings = [];

        this.functions = require('../timeFunctions.js');
    }

    /**
     * Vérifie dans le planning de l'équipement la prochaine disponibilité
     * en fonction du temps nécessaire et de l'heure de d'arrivé de l'échantillon
     * @param arrivalTime heure d'arrivé de l'échantillon
     * @param durationMinutes le temps d'analyse nécessaire
     * @returns {string} retourne l'heure de départ la plus proche
     */
    getNextAvailableTime(arrivalTime, durationMinutes) {
        if(this.bookings.length === 0) return arrivalTime;

        let start = this.functions.parseTimeInMinute(arrivalTime);
        const maintenanceWindow = this.functions.splitTimeSlot(this.maintenanceWindow);
        const maintenanceWindowStartMinutes = this.functions.parseTimeInMinute(maintenanceWindow.timeStart);
        const maintenanceWindowEndMinutes = this.functions.parseTimeInMinute(maintenanceWindow.timeEnd);

        if (start > maintenanceWindowStartMinutes && start < maintenanceWindowEndMinutes) {
            start = maintenanceWindowEndMinutes;
        }

        for (const b of this.bookings) {
            const bookingStart = this.functions.parseTimeInMinute(b.startTime);
            const bookingEnd = this.functions.parseTimeInMinute(b.endTime);

            if (start + durationMinutes <= bookingStart) {
                break;
            } else if (start + durationMinutes > maintenanceWindowStartMinutes) {
                start = maintenanceWindowEndMinutes;
            } else {
                start = bookingEnd;
            }
        }

        return this.functions.formatTime(start);
    }

    /**
     * Permet de trouver un équipement disponible le plus tôt possible
     * @param equipments tableau des équipements
     * @param sampleType Type d'échantillon
     * @param arrivalTime Heure d'arrivé de l'échantillon, format 'HH:MM'
     * @param durationMinutes Durée de l'analyse en minute
     * @returns {{equipment: Equipments, startTime: string}}
     */
    static getNextAvailableEquipment(equipments, sampleType, arrivalTime, durationMinutes) {
        const functions = require('../timeFunctions.js');

        let bestEquipment = null;
        let bestAvailableTimeMinutes = Infinity;

        for(let equipment of equipments) {
            if(equipment.type !== sampleType) continue;

            const nextAvailableTime = equipment.getNextAvailableTime(arrivalTime, durationMinutes);

            const nextAvailableTimeMinutes = nextAvailableTime === 0 ? functions.parseTimeInMinute(arrivalTime) : functions.parseTimeInMinute(nextAvailableTime);

            if(bestAvailableTimeMinutes > nextAvailableTimeMinutes) {
                bestAvailableTimeMinutes = nextAvailableTimeMinutes;
                bestEquipment = equipment;
            }
        }

        return {
            equipment: bestEquipment,
            startTime: functions.formatTime(bestAvailableTimeMinutes)
        };
    }
}

module.exports = Equipments;