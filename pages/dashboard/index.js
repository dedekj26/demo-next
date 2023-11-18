import Navbar from "@/components/Navbar";
import Head from "next/head";

import {
     Chart as ChartJS,
     ArcElement,
     Tooltip,
     Legend,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     BarElement,
     Title,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useDashboard } from "@/hooks/dashboard";
ChartJS.register(
     ArcElement,
     CategoryScale,
     LinearScale,
     BarElement,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend
);

export default function Demo() {
     const { data } = useDashboard("/api/dashboard");

     const dataPost = {
          labels: [
               "jan",
               "feb",
               "mar",
               "apr",
               "may",
               "jun",
               "jul",
               "aug",
               "sep",
               "oct",
               "nov",
               "dec",
          ],
          datasets: [
               {
                    label: "Jumlah Post",
                    data: [
                         data?.data?.jan,
                         data?.data?.feb,
                         data?.data?.mar,
                         data?.data?.apr,
                         data?.data?.may,
                         data?.data?.jun,
                         data?.data?.jul,
                         data?.data?.aug,
                         data?.data?.sep,
                         data?.data?.oct,
                         data?.data?.nov,
                         data?.data?.dec,
                    ],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    hoverOffset: 4,
               },
          ],
     };

     return (
          <>
               <Head>
                    <title>Latihan Next JS</title>
               </Head>

               <Navbar />

               <div className="flex flex-wrap">
                    <div className="py-24 px-14 w-6/12">
                         <Bar data={dataPost} />
                    </div>

                    <div className="py-24 px-14 w-6/12">
                         <Line data={dataPost} />
                    </div>
               </div>
          </>
     );
}
