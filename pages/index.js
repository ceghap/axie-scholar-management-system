import React, { useEffect, useState } from "react";
import Head from "next/head";
import { SlpTable } from "@components/SlpTable";
import { ArenaTable } from "@components/ArenaTable";
import { Loader } from "@components/Loader";
import _ from "lodash";

import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
} from "@chakra-ui/react";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const scholars = await prisma.scholar.findMany();
  const ronin = scholars.map((d) => d.roninAddress.replace("ronin:", "0x"));

  return {
    props: {
      scholars,
      ronin,
    },
  };
}

export default function Home({ scholars, ronin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSlp, setDataSlp] = useState([]);
  const [dataArena, setDataArena] = useState([]);
  const [arenaMVP, setArenaMVP] = useState(null);
  const [slpMVP, setSlpMVP] = useState(null);

  useEffect(() => {
    if (dataSlp.length > 0 && dataArena.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [dataSlp, dataArena]);

  useEffect(() => {
    Promise.all(
      ronin.map((id) =>
        fetch(`https://api.lunaciaproxy.cloud/_stats/${id}`)
          .then((res) => res.json())
          .then((res) => res.stats)
      )
    ).then((response) => {
      const stats = scholars.map((s) => {
        if (
          response.find(
            (r) => r.client_id == s.roninAddress.replace("ronin:", "0x")
          )
        ) {
          const data = response.find(
            (r) => r.client_id == s.roninAddress.replace("ronin:", "0x")
          );

          return {
            ...s,
            data,
          };
        }
      });

      const sortedStats = _.orderBy(
        stats,
        [
          function (o) {
            return o.data.elo;
          },
        ],
        ["desc"]
      );

      setDataArena(sortedStats);
    });

    Promise.all(
      ronin.map((id) =>
        fetch(`https://api.lunaciaproxy.cloud/_earnings/${id}`)
          .then((res) => res.json())
          .then((res) => res.earnings)
      )
    ).then((response) => {
      const earnings = scholars.map((s) => {
        if (
          response.find(
            (r) => r.address == s.roninAddress.replace("ronin:", "0x")
          )
        ) {
          const data = response.find(
            (r) => r.address == s.roninAddress.replace("ronin:", "0x")
          );

          return {
            ...s,
            data,
          };
        }
      });

      const sortedEarnings = _.orderBy(
        earnings,
        [
          function (o) {
            return o.data.slp_inventory;
          },
        ],
        ["desc"]
      );

      setDataSlp(sortedEarnings);
    });
  }, [scholars]);

  return (
    <div>
      {isLoading && <Loader />}
      <Head>
        <title>Axie Space Guild</title>
        <meta name="description" content="ASG Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading my="10" as="h2" size="lg">
        Leaderboard
      </Heading>

      <Flex mb="4">
        <Stat>
          <StatLabel>Total</StatLabel>
          <StatNumber>{scholars.length}</StatNumber>
          <StatHelpText>Scholars</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Arena MVP</StatLabel>
          <StatNumber>
            {dataArena ? dataArena[0].data.elo : "No data"}
          </StatNumber>
          <StatHelpText>
            {dataArena ? dataArena[0].name : "No data"}
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>SLP MVP</StatLabel>
          <StatNumber>
            {dataSlp ? dataSlp[0].data.slp_inventory : "No data"}
          </StatNumber>
          <StatHelpText>{dataSlp ? dataSlp[0].name : "No data"}</StatHelpText>
        </Stat>
      </Flex>

      <Tabs>
        <TabList>
          <Tab>SLP</Tab>
          <Tab>Arena</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {dataSlp.length > 0 && <SlpTable data={dataSlp} />}
          </TabPanel>
          <TabPanel>
            {dataArena.length > 0 && <ArenaTable data={dataArena} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
