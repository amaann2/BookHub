import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const StockBox = () => {
    const { books } = useSelector(state => state.books)

    let outOfStock = 0;

    books &&
        books.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }
        });

    const chartdata = {
        labels: ['IN STOCK', 'OUT OF STOCK'],
        datasets: [
            {
                data: [books.length - outOfStock, outOfStock],
                backgroundColor: ['#36A2EB', '#FF6384']
            }
        ]
    }
    return (
        <div>
            <Doughnut data={chartdata} />
        </div>
    )
}

export default StockBox