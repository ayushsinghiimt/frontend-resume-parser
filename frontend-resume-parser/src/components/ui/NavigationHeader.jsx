"use client";
import React, { useEffect, useState } from 'react';
import { useMantineColorScheme, Group, ActionIcon, Title, Box, Container, Paper, Button } from '@mantine/core';
import { FileText, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export const NavigationHeader = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const dark = colorScheme === 'dark';

    return (
        <Box
            component="header"
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        >
            <Paper
                shadow="sm"
                radius={0}
                className="bg-opacity-80 backdrop-blur-md border-b-[1px]"
                // Mantine handles border color in dark mode automatically if we use standard borders, 
                // but explicit style helps matching the "transparent/glass" feel if desired.
                // For "standard" dark mode, we might want a solid background or just standard Paper.
                // User said "horrible... shift completely to Mantine". Standard Paper is best.
                withBorder
                style={{ backgroundColor: 'var(--mantine-color-body)', opacity: 0.95 }}
            >
                <Container size="xl" h={64}>
                    <Group justify="space-between" h="100%">
                        {/* Left: Logo */}
                        <Group gap="xs" component={Link} href="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                            <ThemeIconVariant wrapper />
                            <Title order={3} size="h3" fw={500}
                                style={{
                                    background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-violet-6))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                TraqCheck Resume Parser
                            </Title>
                            <Group gap="md" ml="100px">
                                <Button component={Link} href="/" variant="subtle" size="sm">Home</Button>
                                <Button component={Link} href="/dashboard" variant="subtle" size="sm">Dashboard</Button>
                            </Group>
                        </Group>

                        {mounted && (
                            <ActionIcon
                                variant="default"
                                size="lg"
                                radius="xl"
                                onClick={() => toggleColorScheme()}
                                aria-label="Toggle theme"
                            >
                                {dark ? <Sun size={18} /> : <Moon size={18} />}
                            </ActionIcon>
                        )}
                    </Group>
                </Container>
            </Paper>
        </Box>
    );
};

// Helper for the Logo Icon
const ThemeIconVariant = () => (
    <div style={{
        padding: '6px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-violet-6))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    }}>
        <FileText size={20} />
    </div>
);
