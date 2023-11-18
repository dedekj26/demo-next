import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import CryptoJS from "crypto-js";

const getUser = async () => {
     const response = await prisma.user.findMany();
     return response;
};

const newUser = async ({ name, email, password }) =>
     await prisma.user.create({
          data: {
               name: name,
               email: email,
               password: CryptoJS.AES.encrypt(password, "NextJS").toString(),
          },
     });

export default async function handler(req, res) {
     if (req.method == "POST") {
          const user = await newUser({
               name: req.body.name,
               email: req.body.email,
               password: req.body.password,
          });

          res.status(200).json({ data: user });
     } else {
          const user = await getUser();

          res.status(200).json({ data: user });
     }
}
