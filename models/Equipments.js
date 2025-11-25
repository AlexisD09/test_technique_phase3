class Equipments {
    constructor(id, name, type, available) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.available = available;
        this.bookings = [];

        this.functions = require('../timeFunctions.js');
    }

    isAvailable(startTime, endTime){
        return !this.bookings.some(b => {
            return !(endTime <= b.startTime || startTime >= b.endTime);
        });
    }

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

module.exports = Equipments;