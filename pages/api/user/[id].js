import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import CryptoJS from "crypto-js";

const getUniqueUser = async ({ id }) => {
     const response = await prisma.user.findUnique({
          where: {
               id: parseInt(id),
          },
     });

     return response;
};

const updateUser = async ({ id, name, email, password }) =>
     await prisma.user.update({
          data: {
               name: name,
               email: email,
               password: CryptoJS.AES.encrypt(password, "NextJS").toString(),
          },
          where: {
               id: parseInt(id),
          },
     });

const deleteUser = async ({ id }) => {
     await prisma.user.delete({
          where: {
               id: parseInt(id),
          },
     });
};

export default async function handler(req, res) {
     if (req.method == "PATCH") {
          const user = await updateUser({
               id: req.query.id,
               name: req.body.name,
               email: req.body.email,
               password: req.body.password,
          });

          res.status(200).json({ data: user });
     } else if (req.method == "DELETE") {
          const user = await deleteUser({
               id: req.query.id,
          });

          res.status(200).json({ data: user, message: "berhasil hapus data" });
     } else {
          const user = await getUniqueUser({
               id: req.query.id,
          });

          res.status(200).json({ data: user });
     }
}
