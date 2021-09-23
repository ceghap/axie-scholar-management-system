import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export const ArenaTable = ({ data }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Name</Th>
          <Th>Rank</Th>
          <Th>MMR</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.map((scholar, i) => (
            <Tr key={scholar.id}>
              <Td>{i + 1}</Td>
              <Td>{scholar.name}</Td>
              <Td>{scholar.data.rank}</Td>
              <Td>{scholar.data.elo}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
