import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const scholarData = JSON.parse(req.body);

    const savedScholar = await prisma.scholar.create({
      data: scholarData,
    });

    res.status(200).json(savedScholar);
  }

  if (req.method === "GET") {
    const scholars = await prisma.scholar.findMany();
    res.status(200).json(scholars);
  }
}
