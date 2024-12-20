const tfjs = require('@tensorflow/tfjs-node');

const predictWasteType = async (imageBuffer, model) => {
    // Decode and preprocess the image
    const tensor = tfjs.node
        .decodeJpeg(imageBuffer)
        .resizeNearestNeighbor([224, 224]) // Resize to the expected input size of the model
        .expandDims() // Add batch dimension
        .toFloat()
        .div(tfjs.scalar(255)); // Normalize pixel values to [0, 1]

    // Make a prediction
    const prediction = model.predict(tensor);
    const score = await prediction.data();

    // Calculate confidence score
    const confidenceScore = Math.max(...score) * 100;

    // Define labels corresponding to your model's output
    const labels = ['Organik', 'Anorganik', 'B3'];

    // Get the index of the highest score
    const maxIndex = score.indexOf(Math.max(...score));

    // Retrieve the corresponding label
    const result = labels[maxIndex];

    // Create an explanation string with confidence score
    const explanation =
        result === 'Organik' ? 'Sampah yang berasal dari makhluk hidup, seperti sisa makanan, daun, ranting, dan buah-buahan. Sampah organik dapat terurai secara alami di lingkungan. Sampah organik dapat diproses menjadi pupuk kompos.'
            : result === 'Anorganik' ? 'Sampah yang berasal dari benda tak hidup, seperti plastik, kaleng, kaca, logam, dan styrofoam. Sampah anorganik sulit terurai atau dapat terurai tetapi dengan waktu yang sangat lama. Sampah anorganik dapat dimanfaatkan kembali, misalnya untuk membuat kerajinan'
                : 'Sampah yang mengandung zat kimia yang dapat membahayakan manusia, hewan, dan lingkungan sekitar. Sampah B3 memiliki karakteristik mudah meledak, mudah terbakar, bersifat reaktif, beracun, infeksius, dan bersifat korosif. Contoh sampah B3 adalah baterai bekas, neon atau bohlam bekas, kaleng aerosol kosong bekas obat nyamuk, pewangi ruangan, dan lainnya.';

    return { confidenceScore, result, explanation };
}

module.exports = predictWasteType;
