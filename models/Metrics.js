class Metrics {
    constructor(){
        this.totalTime = 0;
        this.efficiency = 0.0;
        this.conflicts = 0;

        this.functions = require('../timeFunctions.js');
    }

    /**
     * Initialise les calculs des métriques
     * @param scheduleTab Tableau du planning
     * @param samples Tableau des échantillons
     */
    generateMetrics(scheduleTab, samples){
        this.calculateTotalTime(scheduleTab);
        this.calculateEfficiency(scheduleTab, samples);
    }

    /**
     * Vérifie les potentiels conflits
     * @param scheduleTab Tableau du planning
     */
    calculateConflicts(scheduleTab){
        scheduleTabMinutes = scheduleTab.map(schedule => {
            schedule.endTime = this.functions.parseTimeInMinute(schedule.endTime);
            schedule.startTime = this.functions.parseTimeInMinute(schedule.startTime);
        })

        for(let schedule of scheduleTab){
            for(let schedule2 of scheduleTab){
                const overlap = schedule.startTime < schedule2.endTime && schedule2.startTime < schedule.endTime;
                const techConflict = schedule.technicianId === schedule2.technicianId;
                const equipmentConflict = schedule.equipmentId === schedule2.equipmentId;

                if(overlap && (techConflict || equipmentConflict)){
                    this.conflicts += 1;
                }
            }
        }
    }

    /**
     * Calcul le temps qu'a pris le planning en minutes
     * @param scheduleTab Tableau du planning
     */
    calculateTotalTime(scheduleTab) {
        scheduleTab.map(schedule => {
            schedule.endTime = this.functions.parseTimeInMinute(schedule.endTime);
            schedule.startTime = this.functions.parseTimeInMinute(schedule.startTime);
        })
        const sortedEndTimeScheduleTab = [...scheduleTab].sort(
            (a, b) => b.endTime - a.endTime
        );

        const sortedStartTimeScheduleTab = [...scheduleTab].sort(
            (a, b) => a.startTime - b.startTime
        );

        const startOfScheduleMinutes = sortedStartTimeScheduleTab[0].startTime;
        const endOfScheduleMinutes = sortedEndTimeScheduleTab[0].endTime;

        this.totalTime = endOfScheduleMinutes - startOfScheduleMinutes;
    }

    /**
     * Calcul l'éfficacité du planning
     * @param scheduleTab Tableau du planning
     * @param samples Tableau des échantillons
     */
    calculateEfficiency(scheduleTab, samples) {
        let totalSamplesAnalysisTime = 0;

        samples.map(sample => {
            totalSamplesAnalysisTime += sample.analysisTime;
        })

        let efficiency = ((totalSamplesAnalysisTime/this.totalTime)*100).toFixed(1);

        this.efficiency = efficiency >= 100 ? 100 : efficiency;
    }

    /**
     * Retourne tous les métriques
     * @returns {{totalTime: number, efficiency: number, conflicts: number}}
     */
    getMetrics(){
        return {
            "totalTime": this.totalTime,
            "efficiency": this.efficiency,
            "conflicts": this.conflicts
        }
    }
}

module.exports = Metrics;