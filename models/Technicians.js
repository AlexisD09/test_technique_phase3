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

module.exports = Technicians;