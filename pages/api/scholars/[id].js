import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    const deleteScholar = await prisma.scholar.delete({ where: { id: id } });

    if (deleteScholar) res.status(200).json({ id });
  }
}
