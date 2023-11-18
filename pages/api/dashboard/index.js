import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getData = async ({ month }) => {
     const year = new Date().getFullYear();

     const response = await prisma.post.count({
          where: {
               created_at: {
                    lte: new Date(`${year}-${month}-31`).toISOString(),
                    gte: new Date(`${year}-${month}-1`).toISOString(),
               },
          },
     });

     return response;
};

export default async function handler(req, res) {
     const jan = await getData({ month: 1 });
     const feb = await getData({ month: 2 });
     const mar = await getData({ month: 3 });
     const apr = await getData({ month: 4 });
     const may = await getData({ month: 5 });
     const jun = await getData({ month: 6 });
     const jul = await getData({ month: 7 });
     const aug = await getData({ month: 8 });
     const sep = await getData({ month: 9 });
     const oct = await getData({ month: 10 });
     const nov = await getData({ month: 11 });
     const dec = await getData({ month: 12 });

     res.status(200).json({
          data: {
               jan: jan,
               feb: feb,
               mar: mar,
               apr: apr,
               may: may,
               jun: jun,
               jul: jul,
               aug: aug,
               sep: sep,
               oct: oct,
               nov: nov,
               dec: dec,
          },
     });
}
