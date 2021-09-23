import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const scholars = await prisma.scholar.findMany();

    const wallet = scholars.map((s) => s.roninAddress);

    const data = wallet.map((w) => {
      const response = await fetch(
        `https://axie-infinity.p.rapidapi.com/get-final-data/${w}`,
        {
          method: "GET",
          params: { id: `${w}` },
          headers: {
            "x-rapidapi-host": "axie-infinity.p.rapidapi.com",
            "x-rapidapi-key":
              "eff4c955f3msh02e43841cd4395ap14c428jsnd03186b393e5",
          },
        }
      );
      return response;
    });

    res.status(200).json(data);
  }
}
