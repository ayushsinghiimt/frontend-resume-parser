"use client";
import React, { useState, useEffect } from 'react';
import { Table, Container, Title, Badge, Text, Anchor, Box, LoadingOverlay } from '@mantine/core';
import Link from 'next/link';
import axios from 'axios';

const StatusBadge = ({ status }) => {
    let color = 'gray';
    let label = status;

    switch (status) {
        case 'completed':
            color = 'green';
            label = 'Parsed';
            break;
        case 'processing':
            color = 'blue';
            label = 'Processing';
            break;
        case 'pending':
            color = 'yellow';
            label = 'Pending';
            break;
        case 'failed':
            color = 'red';
            label = 'Failed';
            break;
    }
    return <Badge color={color} variant="light">{label}</Badge>;
};

export const CandidateDashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCandidates() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/`);
                setCandidates(response.data);
            } catch (err) {
                console.error('Error fetching candidates:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCandidates();
    }, []);

    const rows = candidates.map((candidate) => (
        <Table.Tr key={candidate.id}>
            <Table.Td>
                <Anchor component={Link} href={`/candidate/${candidate.id}`} fw={500}>
                    {candidate.name || 'N/A'}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{candidate.email || 'N/A'}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{candidate.company || 'N/A'}</Text>
            </Table.Td>
            <Table.Td>
                <StatusBadge status={candidate.parsing_status} />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Container size="xl" py="xl">
            <Title order={2} mb="lg">Recent Applicants</Title>
            <Box style={{ borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden', marginTop: "40px", position: 'relative' }}>
                <LoadingOverlay visible={loading} />
                {error && <Text c="red">Error loading candidates: {error}</Text>}
                {!loading && !error && candidates.length === 0 && (
                    <Text c="dimmed">No candidates found. Upload a resume to get started.</Text>
                )}
                {!loading && !error && candidates.length > 0 && (
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
                )}
            </Box>
        </Container>
    );
};
