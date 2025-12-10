"use client";
import { use, useEffect, useState } from 'react';
import { CandidateProfile } from "@/components/profile/CandidateProfile";
import { Center, Loader, Text } from '@mantine/core';
import axios from 'axios';

export default function CandidatePage({ params }) {
    const { id } = use(params);
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCandidate() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${id}/`);
                setCandidate(response.data);
            } catch (err) {
                console.error('Error fetching candidate:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchCandidate();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen w-full pt-16 flex items-center justify-center" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
                <Center>
                    <Loader size="lg" />
                </Center>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full pt-16 flex items-center justify-center" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
                <Text c="red">Error loading candidate: {error}</Text>
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="min-h-screen w-full pt-16 flex items-center justify-center" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
                <Text c="dimmed">Candidate not found</Text>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen w-full pt-16"
            style={{ backgroundColor: 'var(--mantine-color-body)' }}
        >
            <CandidateProfile candidate={candidate} />
        </div>
    );
}
