import Head from "next/head";
import { AddScholarForm } from "@components/Forms/AddScholarForm";
import { ScholarTable } from "@components/Forms/ScholarTable";
import { Loader } from "@components/Loader";
import {
  Heading,
  Divider,
  useDisclosure,
  Box,
  Collapse,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";

import { BsUpload } from "react-icons/bs";

import { scholarsContext } from "../../providers/ScholarsProvider";

import React, { useState, useEffect, useContext } from "react";

export default function Manage() {
  const [scholars, setScholars] = useContext(scholarsContext);
  const [loading, setLoading] = useState(false);
  const { isOpen, onToggle } = useDisclosure();

  const getScholars = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/scholars");

      setScholars(await response.json());
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!scholars) {
      getScholars();
    }
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <Head>
        <title>Axie Space Guild</title>
        <meta name="description" content="ASG Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading my="10" as="h2" size="lg">
        Scholars
      </Heading>
      <Flex justify="flex-end">
        <Button ml="2" leftIcon={<Icon as={BsUpload} />} onClick={onToggle}>
          Upload
        </Button>
      </Flex>

      <AddScholarForm />
      <Divider my="10" />
      <ScholarTable />
    </div>
  );
}
