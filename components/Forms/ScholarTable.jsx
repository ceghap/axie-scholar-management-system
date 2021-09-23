import React, { useContext, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { scholarsContext } from "../../providers/ScholarsProvider";

async function deleteScholar(id) {
  const response = await fetch(`/api/scholars/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const ScholarTable = () => {
  const [scholars, setScholars] = useContext(scholarsContext);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const toast = useToast();

  const delScholar = async (id) => {
    const del = await deleteScholar(id);

    if (del) {
      const index = scholars.findIndex((s) => s.id === id);
      scholars.splice(index, 1);

      setScholars([...scholars]);

      toast({
        title: "Scholar deleted.",
        description: `deleted scholar ${id}.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Scholar
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  delScholar(selectedId);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Table>
        <Thead>
          <Tr>
            <Th>Scholar Name</Th>
            <Th>Ronin Address</Th>
            <Th>Manager %</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {scholars &&
            scholars.map((scholar) => (
              <Tr key={scholar.id}>
                <Td>{scholar.name}</Td>
                <Td>{scholar.roninAddress}</Td>
                <Td>{scholar.managerCut}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    mr="2"
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedId(scholar.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button colorScheme="blue" onClick={() => alert(scholar.id)}>
                    <EditIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};
