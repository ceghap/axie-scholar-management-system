import { useFormik } from "formik";
import React, { useContext } from "react";
import { scholarsContext } from "../../providers/ScholarsProvider";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Flex,
  Spacer,
  Box,
  Heading,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

async function saveScholar(scholar) {
  const response = await fetch("/api/scholars", {
    method: "POST",
    body: JSON.stringify(scholar),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const AddScholarForm = () => {
  const [scholars, setScholars] = useContext(scholarsContext);

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      roninAddress: "",
      managerCut: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const save = await saveScholar(values);
      setScholars([...scholars, save]);
      if (save) {
        toast({
          title: "Scholar added.",
          description: `${save.name} : ${save.roninAddress}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        resetForm();
      }
    },
  });

  return (
    <Box>
      <Heading as="h2" size="md" mb="4">
        Add scholar
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <Flex align="end" justify="space-between">
          <FormControl id="name" pr="2">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormControl>
          <Spacer />
          <FormControl id="roninAddress" px="2">
            <FormLabel htmlFor="roninAddress">Ronin Address</FormLabel>
            <Input
              name="roninAddress"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.roninAddress}
            />
          </FormControl>
          <Spacer />
          <FormControl id="managerCut" px="2">
            <FormLabel htmlFor="managerCut">Manager %</FormLabel>
            <Input
              name="managerCut"
              onChange={formik.handleChange}
              value={formik.values.managerCut}
              type="number"
            />
          </FormControl>
          <Spacer />
          <FormControl pl="2">
            <Button
              leftIcon={<AddIcon />}
              mt={4}
              colorScheme="blue"
              width="100%"
              type="submit"
            >
              Add
            </Button>
          </FormControl>
        </Flex>
      </form>
    </Box>
  );
};
