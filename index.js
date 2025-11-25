const { extractDataFromJson } = require('./functions.js');
const { calculateEndTime, parseTimeInMinute, formatTime } = require('./timeFunctions.js');
const Schedule = require('./models/Schedule');
const Samples = require('./models/Samples');
const Technicians = require('./models/Technicians');
const Equipments = require('./models/Equipments');

function planifyLab(data){
    const samples = Samples.sortSamplesByPriority(data.samples);
    const technicians = data.technicians;
    const equipments = data.equipments;
    let scheduleTab = [];

    for(const sample of samples) {
        const sampleType = sample.type;
        const sampleArrivalTime = sample.arrivalTime;
        const sampleDuration = sample.analysisTime;

        const { technician: assignedTechnician, startTime: startTimeTechnician } = Technicians.getNextAvailableTechnician(technicians, sampleType, sampleArrivalTime, sampleDuration);
        const { equipment: assignedEquipment, startTime: startTimeEquipment } = Equipments.getNextAvailableEquipment(equipments, sampleType, sampleArrivalTime, sampleDuration);

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

function run() {
    const data = extractDataFromJson();

    planifyLab(data);
}

run();