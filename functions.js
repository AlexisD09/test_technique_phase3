const fs = require('fs');
const path = require('path');
const Samples = require('./models/Samples');
const Technicians = require('./models/Technicians');
const Equipments = require('./models/Equipments');

function extractDataFromJson() {
    const filePath = path.join(__dirname, 'datas', 'input.json');
    const datas = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const samples = datas.samples.map(sample => {
        return new Samples(
            sample.id,
            sample.type,
            sample.priority,
            sample.analysisTime,
            sample.arrivalTime,
            sample.patientId
        )
    })

    const technicians = datas.technicians.map(technician => {
        return new Technicians(
            technician.id,
            technician.name,
            technician.speciality,
            technician.startTime,
            technician.endTime
        )
    })

    const equipment = datas.equipment.map(equipment => {
        return new Equipments(
            equipment.id,
            equipment.name,
            equipment.type,
            equipment.available
        )
    })

    return {
        samples: samples,
        technicians: technicians,
        equipments: equipment
    }
}

module.exports = { extractDataFromJson };