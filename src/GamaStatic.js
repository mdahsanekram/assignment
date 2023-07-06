import dataset from './dataset.js'
import './index.css';
function GamaStatic() {

    // Function to create the "Gamma" property for each point
    const calculateGamma = (data) => {
        return (data.Ash * data.Hue) / data.Magnesium;
    };

    // Function to calculate class-wise mean, median, and mode of Gamma
    const calculateClassStatistics = (dataset) => {
        const classMap = {};

        dataset.forEach((data) => {
            const { Alcohol } = data;
            const gamma = calculateGamma(data);

            if (!classMap[Alcohol]) {
                classMap[Alcohol] = [gamma];
            } else {
                classMap[Alcohol].push(gamma);
            }
        });

        const statistics = [];

        for (const cls in classMap) {
            const gammaValues = classMap[cls];

            const mean = calculateMean(gammaValues);
            const median = calculateMedian(gammaValues);
            const mode = calculateMode(gammaValues);

            statistics.push({ Alcohol: cls, Mean: mean, Median: median, Mode: mode });
        }

        return statistics;
    };

    //  function to calculate the mean
    const calculateMean = (numbers) => {
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return (sum / numbers.length).toFixed(3);
    };

    //  function to calculate the median
    const calculateMedian = (numbers) => {
        const sortedNumbers = numbers.sort((a, b) => a - b);
        const mid = Math.floor(sortedNumbers.length / 2);

        if (sortedNumbers.length % 2 === 0) {
            return ((sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2).toFixed(3);
        } else {
            return sortedNumbers[mid].toFixed(3);
        }
    };

    //  calculate the mode
    const calculateMode = (numbers) => {
        const frequencyMap = {};

        numbers.forEach((num) => {
            frequencyMap[num] = frequencyMap[num] ? frequencyMap[num] + 1 : 1;
        });

        let mode;
        let maxFrequency = 0;

        for (const num in frequencyMap) {
            if (frequencyMap[num] > maxFrequency) {
                mode = num;
                maxFrequency = frequencyMap[num];
            }
        }
        return Number(mode).toFixed(3);
    };


    return (
        <div className='tableData'>
            <table>
                <tr>
                    <th>Measure</th>
                    <th>Class 1 </th>
                    <th>Class 2 </th>
                    <th>Class 3 </th>
                </tr>
                <tr>
                    <td>Gamma Mean</td>
                    <td>{calculateClassStatistics(dataset)[0].Mean}</td>
                    <td>{calculateClassStatistics(dataset)[1].Mean}</td>
                    <td>{calculateClassStatistics(dataset)[2].Mean}</td>
                </tr>
                <tr>
                    <td>Gamma Median</td>
                    <td>{calculateClassStatistics(dataset)[0].Median}</td>
                    <td>{calculateClassStatistics(dataset)[1].Median}</td>
                    <td>{calculateClassStatistics(dataset)[2].Median}</td>
                </tr>
                <tr>
                    <td>Gamma Mode</td>
                    <td>{calculateClassStatistics(dataset)[0].Mode}</td>
                    <td>{calculateClassStatistics(dataset)[1].Mode}</td>
                    <td>{calculateClassStatistics(dataset)[2].Mode}</td>
                </tr>
            </table>

        </div>
    )
}
export default GamaStatic