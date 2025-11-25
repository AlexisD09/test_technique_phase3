class Schedule {
    constructor(sampleId, technicianId, equipmentId, startTime, endTime, priority){
        this.id = sampleId;
        this.technicianId = technicianId;
        this.equipmentId = equipmentId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.priority = priority;
    }
}

module.exports = Schedule;