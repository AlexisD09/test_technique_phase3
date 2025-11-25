class Samples{
    constructor(id, type, priority, analysisTime, arrivalTime, patientId){
        this.id = id;
        this.type = type;
        this.priority = priority;
        this.analysisTime = analysisTime;
        this.arrivalTime = arrivalTime;
        this.patientId = patientId;
    }

    sortSamplesByPriority(samples){
        const priorityOrder = {
            "STAT": 1,
            "URGENT": 2,
            "ROUTINE": 3,
        };

        samples.sort((a, b) => {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }
}

module.exports = Samples;