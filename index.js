const { extractDataFromJson } = require('./functions.js');
const { calculateEndTime, parseTimeInMinute, formatTime } = require('./timeFunctions.js');
const Schedule = require('./models/Schedule');

function run() {
    let data = extractDataFromJson();
    let samples = data.samples;
    const technicians = data.technicians;
    const equipments = data.equipments;
    let startTime = '';
    let scheduleTab = [];

    // On trie en fonction des priorités
    samples[0].sortSamplesByPriority(samples);

    for(let i = 0; i < samples.length; i++) {
        const sampleType = samples[i].type;
        const sampleArrivalTime = samples[i].arrivalTime;
        const sampleDuration = samples[i].analysisTime;
        let assignedTechnician;
        let assignedEquipment;
        let startTimeTechnician;
        let startTimeEquipment;

        for (let j = 0; j < technicians.length; j++) {
            const speciality = technicians[j].speciality;

            if(speciality === sampleType) {
                assignedTechnician = technicians[j];
                startTimeTechnician = assignedTechnician.getNextAvailable(sampleArrivalTime, sampleDuration);
                break;
            }
        }

        for (let j = 0; j < equipments.length; j++) {
            const equipmentType = equipments[j].type;

            if(equipmentType === sampleType) {
                assignedEquipment = equipments[j];
                startTimeEquipment = assignedEquipment.getNextAvailable(sampleArrivalTime, sampleDuration);
                break;
            }
        }

        const startTechMinutes = parseTimeInMinute(startTimeTechnician);
        const startEquipMinutes = parseTimeInMinute(startTimeEquipment);
        const startTimeMinutes = Math.max(startTechMinutes, startEquipMinutes);
        const startTime = formatTime(startTimeMinutes);
        const endTime = calculateEndTime(startTime, sampleDuration);

        assignedTechnician.bookings.push({
            startTime: startTime,
            endTime: endTime,
        });

        assignedEquipment.bookings.push({
            startTime: startTime,
            endTime: endTime,
        })

        scheduleTab.push(new Schedule(
            samples[i].id,
            assignedTechnician.id,
            assignedEquipment.id,
            startTime,
            endTime,
            samples[i].priority,
        ));
    }
    console.log(scheduleTab);
}

run();