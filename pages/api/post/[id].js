import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUniquePost = async ({ id }) => {
     const response = await prisma.post.findUnique({
          where: {
               id: parseInt(id),
          },
     });

     return response;
};

const updatePost = async ({ id, name, content }) =>
     await prisma.post.update({
          data: {
               name: name,
               content: content,
          },
          where: {
               id: parseInt(id),
          },
     });

const deletePost = async ({ id }) => {
     await prisma.post.delete({
          where: {
               id: parseInt(id),
          },
     });
};

export default async function handler(req, res) {
     if (req.method == "PATCH") {
          const post = await updatePost({
               id: req.query.id,
               name: req.body.name,
               content: req.body.content,
          });

          res.status(200).json({ data: post });
     } else if (req.method == "DELETE") {
          const post = await deletePost({
               id: req.query.id,
          });

          res.status(200).json({ data: post, message: "berhasil hapus data" });
     } else {
          const post = await getUniquePost({
               id: req.query.id,
          });

          res.status(200).json({ data: post });
     }
}
