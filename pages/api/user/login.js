import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import CryptoJS from "crypto-js";

export default async function handler(req, res) {
     const response = await prisma.user.findUnique({
          where: {
               email: req.body.email,
          },
     });

     if (response) {
          const getPassword = CryptoJS.AES.decrypt(
               response.password,
               "NextJS"
          ).toString(CryptoJS.enc.Utf8);

          if (req.body.password == getPassword) {
               res.status(200).json({ data: response });
          } else {
               res.status(403).json({ error: "password salah" });
          }
     } else {
          res.status(403).json({ error: "email tidak ditemukan" });
     }
}
