import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getPost = async () => {
     const response = await prisma.post.findMany();
     return response;
};

const newPost = async ({ name, content }) =>
     await prisma.post.create({
          data: {
               name: name,
               content: content,
               created_at: new Date(),
          },
     });

export default async function handler(req, res) {
     if (req.method == "POST") {
          const post = await newPost({
               name: req.body.name,
               content: req.body.content,
          });

          res.status(200).json({ data: post });
     } else {
          const post = await getPost();

          res.status(200).json({ data: post });
     }
}
