"use client";
import React, { useState } from 'react';
import { Grid, Button, Box } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SummaryBox, SkillsBox, TimelineBox, IdentityBox } from './ProfileComponents';

export const CandidateProfile = ({ candidate: initialCandidate }) => {
    const [candidate, setCandidate] = useState(initialCandidate);

    const handleDocumentsUpdate = (updatedCandidate) => {
        setCandidate(updatedCandidate);
    };

    return (
        <Box px="sm" py="xs">
            <Button
                component={Link}
                href="/dashboard"
                variant="subtle"
                leftSection={<ArrowLeft size={16} />}
                color="gray"
                mb="sm"
            >
                Back to Dashboard
            </Button>

            <Grid gutter="sm">
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <SummaryBox candidate={candidate} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} style={{ maxHeight: '500px' }}>
                    <SkillsBox skills={candidate.skills} />

                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TimelineBox experience={candidate.experience} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <IdentityBox candidate={candidate} onDocumentsUpdate={handleDocumentsUpdate} />
                </Grid.Col>
            </Grid>
        </Box>
    );
};
