import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import ReactCountryFlag from 'react-country-flag';
import formatDate from '@/utils/formatDate';


function RankTable({ teams, ...props }) {
  const nameCellMaxWidth = useBreakpointValue({
    base: '10rem',
    md: '14rem',
    xl: '16rem',
    '2xl': '18rem',
  });

  return (
    <Box
      maxW="70%"
      mx="auto"
      mt="180px"
      overflowY="auto"
      borderRadius="2xl"
      boxShadow="lg"
    >
      <Table
        variant="simple"
        align="center"
        bgColor="#1B1A27"
        borderRadius="small"
        fontSize="1.1rem"
        {...props}
      >
        <colgroup>
          <col width="13.49%" />
          <col width="28.27%" />
          <col width="18.94%" />
          <col />
        </colgroup>
        <Thead>
          <Tr>
            <Th
              color="#717480"
              borderBottomColor="#9D1CF5"
              fontSize="1.1rem"
              h="4rem"
              p={0}
              textAlign="center"
            >
              Rank
            </Th>
            <Th
              color="#717480"
              borderBottomColor="#9D1CF5"
              fontSize="1.1rem"
              h="4rem"
              p={0}
              textAlign="center"
            >
              Team Name
            </Th>
            <Th
              color="#717480"
              borderBottomColor="#9D1CF5"
              fontSize="1.1rem"
              h="4rem"
              p={0}
              textAlign="center"
            >
              Score
            </Th>
            <Th
              color="#717480"
              borderBottomColor="#9D1CF5"
              fontSize="1.1rem"
              h="4rem"
              p={0}
              textAlign="center"
            >
              Last Submission Time
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {teams?.slice(0, 10).map((team, idx) => {
            if (team === null) {
              return (
                <Tr key={`${team}${idx}`}>
                  <Td colSpan={4}>&nbsp;</Td>
                </Tr>
              );
            }
            return (
              <Tr key={team.rank}>
                <Td
                  color="white"
                  borderBottomColor="#161318"
                  fontSize="1.1rem"
                  h="3.2rem"
                  p={0}
                  textAlign="center"
                >
                  {team.rank}
                </Td>
                <Td
                  color="white"
                  borderBottomColor="#161318"
                  fontSize="1.1rem"
                  h="3.2rem"
                  p={0}
                  textAlign="center"
                >
                  <Flex
                    minW="9rem"
                    maxW={nameCellMaxWidth}
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                    columnGap="0.75rem"
                    overflow="auto"
                    mx="auto"
                    justify="space-between"
                  >
                    <ReactCountryFlag
                      svg
                      countryCode={team.country}
                      alt={`${team.country}`}
                    />
                    <Text
                      textAlign="center"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      fontSize="1.1rem"
                    >
                      {team.teamName}
                    </Text>
                  </Flex>
                </Td>
                <Td
                  color="white"
                  borderBottomColor="#161318"
                  fontSize="1.1rem"
                  h="3.2rem"
                  p={0}
                  textAlign="center"
                >
                  {team.currentScore}
                </Td>
                <Td
                  color="white"
                  borderBottomColor="#161318"
                  fontSize="1.1rem"
                  h="3.2rem"
                  p={0}
                  textAlign="center"
                >
                  {formatDate(team.submissionTime)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default RankTable;