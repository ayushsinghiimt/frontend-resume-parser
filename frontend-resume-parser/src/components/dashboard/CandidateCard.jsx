"use client";
import React from 'react';
import Link from 'next/link';
import { Card, Text, Badge, Group, Stack, Avatar } from '@mantine/core';

export const CandidateCard = ({ candidate }) => {
    return (
        <Card
            component={Link}
            href={`/candidate/${candidate.id}`}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            // Light mode: white bg. Dark mode: dark gray (mantine-color-dark-7 is standard)
            // Border: standard Mantine border handles dark mode automatically.
            className="cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md"
            bg="var(--mantine-color-body)"
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Group>
                    <Avatar radius="xl" color="blue" variant="light">
                        {candidate.name.charAt(0)}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                            {candidate.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {candidate.role}
                        </Text>
                    </div>
                </Group>
            </Card.Section>

            <Stack mt="md" gap="xs">
                <Text size="sm" lineClamp={2}>
                    {candidate.experience} • {candidate.skills.join(', ')}
                </Text>
            </Stack>

            <Card.Section inheritPadding py="xs" mt="md" withBorder>
                <Group justify="space-between">
                    <Text size="xs" c="dimmed">
                        Status
                    </Text>
                    <StatusBadge status={candidate.status} />
                </Group>
            </Card.Section>
        </Card>
    );
};

const StatusBadge = ({ status }) => {
    let color = 'gray';
    let label = status;

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
        default:
            color = 'gray';
    }

    return (
        <Badge color={color} variant="light" size="sm">
            {label}
        </Badge>
    );
};
