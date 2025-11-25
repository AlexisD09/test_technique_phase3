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

    samples[0].sortSamplesByPriority(samples);

    for(const sample of samples) {
        const sampleType = sample.type;
        const sampleArrivalTime = sample.arrivalTime;
        const sampleDuration = sample.analysisTime;

        const assignedTechnician = technicians.find(technician => technician.speciality === sampleType || technician.speciality === 'GENERAL');
        const startTimeTechnician = assignedTechnician.getNextAvailable(sampleArrivalTime, sampleDuration);

        const assignedEquipment = equipments.find(equipment => equipment.type === sampleType);
        const startTimeEquipment = assignedEquipment.getNextAvailable(sampleArrivalTime, sampleDuration);

        const startTime = startTimeTechnician > startTimeEquipment ? assignedTechnician : startTimeEquipment;
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
            sample.id,
            assignedTechnician.id,
            assignedEquipment.id,
            startTime,
            endTime,
            sample.priority,
        ));
    }
    console.log(scheduleTab);
}

run();