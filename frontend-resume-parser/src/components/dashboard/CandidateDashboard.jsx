"use client";
import React from 'react';
import { Table, Container, Title, Badge, Text, Anchor, Box } from '@mantine/core';
import Link from 'next/link';

const MOCK_CANDIDATES = [
    {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        company: 'TechCorp Inc.',
        status: 'Parsed',
    },
    {
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        company: 'WebSolutions LLC',
        status: 'Docs Requested',
    },
    {
        id: 3,
        name: 'Charlie Davis',
        email: 'charlie.davis@example.com',
        company: 'StartUp Hub',
        status: 'Docs Submitted',
    },
    {
        id: 4,
        name: 'Diana Evans',
        email: 'diana.evans@example.com',
        company: 'DataWorks Co.',
        status: 'Parsed',
    },
    {
        id: 5,
        name: 'Ethan Hunt',
        email: 'ethan.hunt@example.com',
        company: 'CloudScale Inc.',
        status: 'Docs Requested',
    },
];

const StatusBadge = ({ status }) => {
    let color = 'gray';
    switch (status) {
        case 'Parsed':
            color = 'green';
            break;
        case 'Docs Requested':
            color = 'yellow';
            break;
        case 'Docs Submitted':
            color = 'blue';
            break;
    }
    return <Badge color={color} variant="light">{status}</Badge>;
};

export const CandidateDashboard = () => {
    const rows = MOCK_CANDIDATES.map((candidate) => (
        <Table.Tr key={candidate.id}>
            <Table.Td>
                <Anchor component={Link} href={`/candidate/${candidate.id}`} fw={500}>
                    {candidate.name}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{candidate.email}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{candidate.company}</Text>
            </Table.Td>
            <Table.Td>
                <StatusBadge status={candidate.status} />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Container size="xl" py="xl">
            <Title order={2} mb="lg">Recent Applicants</Title>
            <Box style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', marginTop: "40px" }}>
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Company</Table.Th>
                            <Table.Th>Extraction Status</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Box>
        </Container>
    );
};
