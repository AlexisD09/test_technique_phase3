const { extractDataFromJson, calculateEndTime } = require('./functions.js');

function run() {
    let data = extractDataFromJson();
    const samples = data.samples;
    const technicians = data.technicians;
    const equipments = data.equipments;
    let schedule = [];

    for(let i = 0; i < samples.length; i++) {
        const sampleType = samples[i].type;
        let assignedTechnician = 0;
        let assignedEquipment = 0;
        let endTime = 0;

        for (let j = 0; j < technicians.length; j++) {
            const speciality = technicians[j].speciality;

            if(speciality === sampleType) {
                assignedTechnician = technicians[j].id;
            }
        }

        for (let j = 0; j < equipments.length; j++) {
            const equipmentType = equipments[j].type;

            if(equipmentType === sampleType) {
                assignedEquipment = equipments[j].id;
            }
        }

        if(assignedTechnician !== 0 && assignedEquipment !== 0) {
            endTime = calculateEndTime(samples[i].arrivalTime, samples[i].analysisTime);
        }

        schedule.push({
            sampleId: samples[i].id,
            technicianId: assignedTechnician,
            equipmentId: assignedEquipment,
            startTime: samples[i].arrivalTime,
            endTime: endTime,
        })
    }
    
    console.log(schedule);
}

run();