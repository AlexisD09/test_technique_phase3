class Schedule {
    constructor(sampleId, technicianId, equipmentId, startTime, endTime, priority){
        this.sampleId = sampleId;
        this.technicianId = technicianId;
        this.equipmentId = equipmentId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.priority = priority;
    }

    /**
     * Formate les données pour l'affichage
     * @param schedulesTab Tableau du planning
     * @returns {{schedules: *[]}}
     */
    static formatSchedulesOutput(schedulesTab){
        let outputTab = [];

        for (let schedule of schedulesTab){
            outputTab.push({
                "sampleId": schedule.sampleId,
                "technicianId": schedule.technicianId,
                "equipmentId": schedule.equipmentId,
                "startTime": schedule.startTime,
                "endTime": schedule.endTime,
                "priority": schedule.priority,
            });
        }

        return { "schedules": outputTab };
    }
}

module.exports = Schedule;