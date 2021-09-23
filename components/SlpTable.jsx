import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import dayjs from "dayjs";

export const SlpTable = ({ data }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Name</Th>
          <Th>SLP/day</Th>
          <Th>Unclaimed SLP</Th>
          <Th>Next Claim</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.map((scholar, i) => {
            const lastClaim = dayjs(new Date(scholar.data.last_claimed * 1000));
            const today = dayjs(new Date());

            const totalDay = today.diff(lastClaim, "day");

            return (
              <Tr key={scholar.id}>
                <Td>{i + 1}</Td>
                <Td>{scholar.name}</Td>
                <Td>{Math.floor(scholar.data.slp_inventory / totalDay)}</Td>
                <Td>
                  {Math.floor(
                    scholar.data.slp_inventory -
                      scholar.data.slp_inventory * (scholar.managerCut / 100)
                  )}
                </Td>
                <Td>{scholar.data.next_claim}</Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};
