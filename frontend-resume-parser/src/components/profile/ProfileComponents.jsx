"use client";
import React, { useState } from 'react';
import { Paper, Group, Stack, Text, Avatar, Badge, Button, Title, ThemeIcon, Box, Kbd, Modal, FileButton, Accordion } from '@mantine/core';
import { Mail, Phone, MapPin, CheckCircle, ShieldCheck, Upload, Eye } from 'lucide-react';

export const SummaryBox = ({ candidate }) => {
    const suitableProfiles = ['Frontend Engineer', 'Full Stack Developer', 'React Developer', 'UI Engineer'];

    return (
        <Paper p="md" radius="md" withBorder h="100%" bg="var(--mantine-color-body)">
            <Group justify="space-between" align="flex-start" mb="sm">
                <Avatar size={80} radius="xl" color="blue" variant="light">
                    {candidate.name.charAt(0)}
                </Avatar>

                <Stack align="flex-end" gap="xs">
                    <Badge
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                    >
                        AI Confidence: 98%
                    </Badge>
                    <Group gap={4}>
                        {suitableProfiles.map((profile, index) => (
                            <Kbd key={index} size="xs">{profile}</Kbd>
                        ))}
                    </Group>
                </Stack>
            </Group>

            <Stack gap="xs">
                <Title order={2}>{candidate.name}</Title>
                <Text size="lg" c="dimmed">{candidate.role}</Text>

                <Group gap="md" mt="xs">
                    <Group gap={4}>
                        <Mail size={16} className="text-gray-500" />
                        <Text size="sm">alice.johnson@example.com</Text>
                    </Group>
                    <Group gap={4}>
                        <Phone size={16} className="text-gray-500" />
                        <Text size="sm">+1 (555) 123-4567</Text>
                    </Group>
                    <Group gap={4}>
                        <MapPin size={16} className="text-gray-500" />
                        <Text size="sm">San Francisco, CA</Text>
                    </Group>
                </Group>

                <Text mt="sm" lineClamp={3}>
                    Passionate Senior Frontend Engineer with over 5 years of experience building scalable web applications. Expert in React ecosystem and modern UI/UX principles. dedicated to clean code and performance optimization.
                </Text>
            </Stack>
        </Paper>
    );
};

export const SkillsBox = ({ skills }) => {
    return (
        <Paper p="md" radius="md" withBorder h="100%" bg="var(--mantine-color-body)">
            <Title order={4} mb="sm">Technical Skills</Title>
            <Group gap="xs">
                {skills.map((skill, index) => (
                    <Badge
                        key={index}
                        size="lg"
                        variant="light"
                        color={['blue', 'cyan', 'teal', 'grape', 'violet', 'indigo'][index % 6]}
                    >
                        {skill}
                    </Badge>
                ))}
            </Group>
        </Paper>
    );
};

export const TimelineBox = () => {
    const totalExperience = 7;

    const experiences = [
        {
            role: 'Senior Frontend Engineer',
            company: 'TechCorp Inc.',
            period: '2021 - Present',
            description: 'Led migration to Next.js 14, improving application performance by 40%. Managed a team of 4 developers and established code review standards.'
        },
        {
            role: 'Frontend Developer',
            company: 'WebSolutions LLC',
            period: '2018 - 2021',
            description: 'Developed 20+ client websites using React and Gatsby. Implemented responsive designs and optimized SEO performance.'
        },
        {
            role: 'Junior Web Developer',
            company: 'StartUp Hub',
            period: '2017 - 2018',
            description: 'Assisted in building MVP for a fintech product. Worked with REST APIs and modern JavaScript frameworks.'
        }
    ];

    return (
        <Paper p="md" radius="md" withBorder h="100%" style={{ display: 'flex', flexDirection: 'column' }} bg="var(--mantine-color-body)">
            <Group justify="space-between" mb="sm">
                <Title order={4}>Experience History</Title>
                <Badge size="lg" variant="light" color="blue">{totalExperience}+ Years</Badge>
            </Group>

            <Box style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                <Accordion variant="separated">
                    {experiences.map((exp, index) => (
                        <Accordion.Item key={index} value={`exp-${index}`}>
                            <Accordion.Control>
                                <Group justify="space-between" wrap="nowrap">
                                    <Box style={{ flex: 1 }}>
                                        <Text fw={600} size="sm">{exp.company}</Text>
                                        <Text size="xs" c="dimmed" mt={2}>{exp.period}</Text>
                                    </Box>
                                    <Text size="sm" c="blue" fw={500} mr="md">{exp.role}</Text>
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Text size="sm" c="dimmed">{exp.description}</Text>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Box>
        </Paper>
    );
};

export const IdentityBox = () => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [aadharDoc, setAadharDoc] = useState(null);
    const [panDoc, setPanDoc] = useState(null);

    const handleRequest = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1500);
    };

    const DocumentUploadSection = ({ title, file, setFile }) => {
        const [showPreview, setShowPreview] = useState(false);
        const fileUrl = file ? URL.createObjectURL(file) : null;

        return (
            <Paper p="md" withBorder>
                <Stack gap="sm">
                    <Text fw={500} size="sm">{title}</Text>
                    {file ? (
                        <>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">{file.name}</Text>
                                <Group gap="xs">
                                    <Button
                                        size="xs"
                                        variant="light"
                                        leftSection={<Eye size={14} />}
                                        onClick={() => setShowPreview(!showPreview)}
                                    >
                                        {showPreview ? 'Hide' : 'View'}
                                    </Button>
                                    <FileButton onChange={setFile} accept="image/*,application/pdf">
                                        {(props) => <Button size="xs" variant="outline" {...props}>Change</Button>}
                                    </FileButton>
                                </Group>
                            </Group>
                            {showPreview && fileUrl && (
                                <Box mt="xs">
                                    {file.type.startsWith('image/') ? (
                                        <img
                                            src={fileUrl}
                                            alt={title}
                                            style={{
                                                width: '100%',
                                                maxHeight: '300px',
                                                objectFit: 'contain',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    ) : (
                                        <iframe
                                            src={fileUrl}
                                            style={{
                                                width: '100%',
                                                height: '300px',
                                                border: '1px solid var(--mantine-color-gray-3)',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    )}
                                </Box>
                            )}
                        </>
                    ) : (
                        <FileButton onChange={setFile} accept="image/*,application/pdf">
                            {(props) => (
                                <Button
                                    {...props}
                                    variant="light"
                                    leftSection={<Upload size={16} />}
                                    fullWidth
                                >
                                    Upload Document
                                </Button>
                            )}
                        </FileButton>
                    )}
                </Stack>
            </Paper>
        );
    };

    return (
        <>
            <Paper p="md" radius="md" withBorder h="100%" bg="var(--mantine-color-body)">
                <Stack justify="space-between" h="100%">
                    <Box>
                        <Group mb="sm">
                            <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                                <ShieldCheck size={20} />
                            </ThemeIcon>
                            <Title order={4}>Identity Verification</Title>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Verify candidate identity before scheduling an interview.
                        </Text>
                    </Box>

                    <Group grow>
                        {sent ? (
                            <Button variant="light" color="green" leftSection={<CheckCircle size={16} />}>
                                Request Sent
                            </Button>
                        ) : (
                            <Button color="blue" onClick={handleRequest} loading={loading}>
                                Request Government ID
                            </Button>
                        )}
                        <Button variant="outline" color="gray" onClick={() => setModalOpened(true)}>
                            Upload Manually
                        </Button>
                    </Group>
                </Stack>
            </Paper>

            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Upload Identity Documents"
                size="lg"
            >
                <Stack gap="md">
                    <DocumentUploadSection title="Aadhar Card" file={aadharDoc} setFile={setAadharDoc} />
                    <DocumentUploadSection title="PAN Card" file={panDoc} setFile={setPanDoc} />
                </Stack>
            </Modal>
        </>
    );
};
