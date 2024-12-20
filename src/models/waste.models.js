const prisma = require("../db/index");
const response = require('../response')

const addWaste = async (wasteData) => {
    const waste = await prisma.Waste.create({
        data: {
            result: wasteData.result,
            explanation: wasteData.explanation,
            confidence: wasteData.confidenceScore
        }
    })

    return waste
}

module.exports = addWaste