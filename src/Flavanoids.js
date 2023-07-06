import dataset from './dataset.js'

function Flavanoids() {

    //calculate the mean 
    const calculateMean = (numbers) => {
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return (sum / numbers.length).toFixed(3);
    };

    //  calculate the median
    const calculateMedian = (numbers) => {
        const sortedNumber = numbers.sort((a, b) => a - b);
        const mid = Math.floor(sortedNumber.length / 2);

        if (sortedNumber.length % 2 === 0) {
            return (sortedNumber[mid - 1] + sortedNumber[mid]) / 2;
        } else {
            return sortedNumber[mid];
        }
    };

    //calculate Mode
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

        return mode;
    };

    // Function to calculate class-wise mean, median, and mode of Flavanoids
    const calculateClassStatisticsData = (dataset) => {
        const classMap = {};

        dataset.forEach((data) => {
            const { Alcohol, Flavanoids } = data;

            if (!classMap[Alcohol]) {
                classMap[Alcohol] = [Flavanoids];
            } else {
                classMap[Alcohol].push(Flavanoids);
            }
        });

        const statistics = [];

        for (const cls in classMap) {
            const flavanoids = classMap[cls];

            const mean = calculateMean(flavanoids);
            const median = calculateMedian(flavanoids);
            const mode = calculateMode(flavanoids);

            statistics.push({ Alcohol: cls, Mean: mean, Median: median, Mode: mode });
        }

        return statistics;
    };

    // Example usage
    const classStatistics = calculateClassStatisticsData(dataset);

    console.log(classStatistics);


    // console.log(data)
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
                    <td>Flavanoids Mean</td>
                    <td>{calculateClassStatisticsData(dataset)[0].Mean}</td>
                    <td>{calculateClassStatisticsData(dataset)[1].Mean}</td>
                    <td>{calculateClassStatisticsData(dataset)[2].Mean}</td>
                </tr>
                <tr>
                    <td>Flavanoids Median</td>
                    <td>{calculateClassStatisticsData(dataset)[0].Median}</td>
                    <td>{calculateClassStatisticsData(dataset)[1].Median}</td>
                    <td>{calculateClassStatisticsData(dataset)[2].Median}</td>
                </tr>
                <tr>
                    <td>Flavanoids Mode</td>
                    <td>{calculateClassStatisticsData(dataset)[0].Mode}</td>
                    <td>{calculateClassStatisticsData(dataset)[1].Mode}</td>
                    <td>{calculateClassStatisticsData(dataset)[2].Mode}</td>
                </tr>
            </table>
        </div>
    );
}

export default Flavanoids;
