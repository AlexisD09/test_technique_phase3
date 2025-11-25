class Samples{
    constructor(id, type, priority, analysisTime, arrivalTime, patientId){
        this.id = id;
        this.type = type;
        this.priority = priority;
        this.analysisTime = analysisTime;
        this.arrivalTime = arrivalTime;
        this.patientId = patientId;
    }

}

module.exports = Samples;