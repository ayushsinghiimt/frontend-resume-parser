"use client";
import React, { useState } from 'react';
import { Paper, Group, Stack, Text, Avatar, Badge, Button, Title, ThemeIcon, Box, Kbd, Modal, FileButton, Accordion } from '@mantine/core';
import { Mail, Phone, MapPin, CheckCircle, ShieldCheck, Upload, Eye } from 'lucide-react';
import axios from 'axios';

export const SummaryBox = ({ candidate, onIdentityRequest, onUploadDocuments, requestSent, onViewMessage, loading }) => {
    const confidenceScore = candidate.confidence_score
        ? Math.round(candidate.confidence_score * 100)
        : null;

    return (
        <Paper p="md" radius="md" withBorder style={{ display: 'flex', flexDirection: 'column' }} bg="var(--mantine-color-body)">
            <Group justify="space-between" align="center" mb="sm">
                <Avatar size={80} radius="xl" color="blue" variant="light">
                    {candidate.name ? candidate.name.charAt(0) : '?'}
                </Avatar>

                <Group style={{ flex: 1 }} justify="space-between" align="center">
                    {confidenceScore && (
                        <Badge
                            size="lg"
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                            ml="md"
                        >
                            AI Confidence: {confidenceScore}%
                        </Badge>
                    )}
                    <Group gap="xs">
                        {requestSent ? (
                            <Button
                                size="sm"
                                variant="light"
                                color="green"
                                leftSection={<CheckCircle size={14} />}
                                rightSection={<Eye size={14} />}
                                onClick={onViewMessage}
                            >
                                Request Sent
                            </Button>
                        ) : (
                            <Button size="sm" color="blue" onClick={onIdentityRequest} loading={loading}>
                                Request Govt ID
                            </Button>
                        )}
                        <Button size="sm" variant="outline" color="gray" onClick={onUploadDocuments}>
                            View / upload docs
                        </Button>
                    </Group>
                </Group>
            </Group>

            <Box style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                <Stack gap="xs">
                    <Title order={2}>{candidate.name || 'N/A'}</Title>
                    <Text size="lg" c="dimmed">
                        {candidate.experience && candidate.experience.length > 0
                            ? candidate.experience[0].position
                            : 'No position available'}
                    </Text>

                    <Group gap="md" mt="xs">
                        {candidate.email && (
                            <Group gap={4}>
                                <Mail size={16} className="text-gray-500" />
                                <Text size="sm">{candidate.email}</Text>
                            </Group>
                        )}
                        {candidate.phone && (
                            <Group gap={4}>
                                <Phone size={16} className="text-gray-500" />
                                <Text size="sm">{candidate.phone}</Text>
                            </Group>
                        )}
                        {candidate.location && (
                            <Group gap={4}>
                                <MapPin size={16} className="text-gray-500" />
                                <Text size="sm">{candidate.location}</Text>
                            </Group>
                        )}
                    </Group>

                    {candidate.summary && (
                        <Text mt="sm">
                            {candidate.summary}
                        </Text>
                    )}
                </Stack>
            </Box>
        </Paper>
    );
};

export const SkillsBox = ({ skills }) => {
    const skillsList = skills || [];

    return (
        <Paper p="md" radius="md" withBorder h="100%" style={{ display: 'flex', flexDirection: 'column' }} bg="var(--mantine-color-body)">
            <Title order={4} mb="sm">Technical Skills</Title>
            <Box style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                {skillsList.length > 0 ? (
                    <Group gap="xs">
                        {skillsList.map((skill, index) => (
                            <Badge
                                key={index}
                                size="lg"
                                variant="light"
                                color={['blue', 'cyan', 'teal', 'grape', 'violet', 'indigo'][index % 6]}
                            >
                                {skill.name}
                            </Badge>
                        ))}
                    </Group>
                ) : (
                    <Text c="dimmed" size="sm">No skills available</Text>
                )}
            </Box>
        </Paper>
    );
};

export const TimelineBox = ({ experience }) => {
    const experiences = experience || [];

    const calculateTotalYears = () => {
        if (experiences.length === 0) return 0;

        let totalMonths = 0;
        experiences.forEach(exp => {
            const start = exp.start_date || '';
            const end = exp.end_date || 'Present';

            if (start) {
                const startYear = parseInt(start.split('-')[0] || start);
                const endYear = end === 'Present'
                    ? new Date().getFullYear()
                    : parseInt(end.split('-')[0] || end);

                if (!isNaN(startYear) && !isNaN(endYear)) {
                    totalMonths += (endYear - startYear) * 12;
                }
            }
        });

        return Math.floor(totalMonths / 12);
    };

    const totalExperience = calculateTotalYears();

    return (
        <Paper p="md" radius="md" withBorder h="300px" style={{ display: 'flex', flexDirection: 'column' }} bg="var(--mantine-color-body)">
            <Group justify="space-between" mb="sm">
                <Title order={4}>Experience History</Title>
                {totalExperience > 0 && (
                    <Badge size="lg" variant="light" color="blue">{totalExperience}+ Years</Badge>
                )}
            </Group>

            <Box style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                {experiences.length > 0 ? (
                    <Accordion variant="separated">
                        {experiences.map((exp, index) => (
                            <Accordion.Item key={index} value={`exp-${index}`}>
                                <Accordion.Control>
                                    <Group justify="space-between" wrap="nowrap">
                                        <Box style={{ flex: 1 }}>
                                            <Text fw={600} size="sm">{exp.company}</Text>
                                            <Text size="xs" c="dimmed" mt={2}>
                                                {exp.start_date || 'Unknown'} - {exp.end_date || 'Present'}
                                            </Text>
                                        </Box>
                                        <Text size="sm" c="blue" fw={500} mr="md">{exp.position}</Text>
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Text size="sm" c="dimmed">{exp.description || 'No description available'}</Text>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <Text c="dimmed" size="sm">No experience available</Text>
                )}
            </Box>
        </Paper>
    );
};

export const ProjectsBox = ({ projects }) => {
    const projectsList = projects || [];

    return (
        <Paper p="md" radius="md" withBorder h="300" style={{ display: 'flex', flexDirection: 'column' }} bg="var(--mantine-color-body)">
            <Group justify="space-between" mb="sm">
                <Title order={4}>Projects</Title>
                {projectsList.length > 0 && (
                    <Badge size="lg" variant="light" color="grape">{projectsList.length} Project{projectsList.length !== 1 ? 's' : ''}</Badge>
                )}
            </Group>

            <Box style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                {projectsList.length > 0 ? (
                    <Accordion variant="separated">
                        {projectsList.map((project, index) => (
                            <Accordion.Item key={index} value={`project-${index}`}>
                                <Accordion.Control>
                                    <Group justify="space-between" wrap="nowrap">
                                        <Box style={{ flex: 1 }}>
                                            <Text fw={600} size="sm">{project.name}</Text>
                                            {project.start_date && (
                                                <Text size="xs" c="dimmed" mt={2}>
                                                    {project.start_date} - {project.end_date || 'Present'}
                                                </Text>
                                            )}
                                        </Box>
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack gap="xs">
                                        <Text size="sm" c="dimmed">{project.description || 'No description available'}</Text>
                                        {project.technologies && (
                                            <Group gap={4}>
                                                <Text size="xs" fw={600}>Tech:</Text>
                                                <Text size="xs" c="dimmed">{project.technologies}</Text>
                                            </Group>
                                        )}
                                        {project.url && (
                                            <Text size="xs">
                                                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--mantine-color-blue-6)' }}>
                                                    View Project →
                                                </a>
                                            </Text>
                                        )}
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <Text c="dimmed" size="sm">No projects available</Text>
                )}
            </Box>
        </Paper>
    );
};

export const IdentityBox = ({ candidate, onDocumentsUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(!!candidate?.document_request_message);
    const [modalOpened, setModalOpened] = useState(false);
    const [messageModalOpened, setMessageModalOpened] = useState(false);
    const [aadharDoc, setAadharDoc] = useState(null);
    const [panDoc, setPanDoc] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const handleRequest = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${candidate.id}/request-documents/`
            );

            setSent(true);
            if (onDocumentsUpdate) {
                const updatedCandidate = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${candidate.id}/`
                );
                onDocumentsUpdate(updatedCandidate.data);
            }
        } catch (err) {
            console.error('Error requesting documents:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!aadharDoc && !panDoc) {
            setUploadError('Please select at least one document to upload');
            return;
        }

        setUploadLoading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            if (aadharDoc) formData.append('aadhar_document', aadharDoc);
            if (panDoc) formData.append('pan_document', panDoc);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${candidate.id}/submit-documents/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setModalOpened(false);
            setAadharDoc(null);
            setPanDoc(null);

            if (onDocumentsUpdate) {
                onDocumentsUpdate(response.data);
            }
        } catch (err) {
            console.error('Error uploading documents:', err);
            setUploadError(err.response?.data?.error || 'Failed to upload documents');
        } finally {
            setUploadLoading(false);
        }
    };

    const parseEmailMessage = (message) => {
        if (!message) return { subject: '', body: '' };

        const lines = message.split('\n');
        const subjectLine = lines[0] || '';
        const subject = subjectLine.replace('Subject: ', '');
        const body = lines.slice(2).join('\n');

        return { subject, body };
    };

    const emailData = parseEmailMessage(candidate?.document_request_message);

    const DocumentUploadSection = ({ title, file, setFile, existingDoc }) => {
        const [showPreview, setShowPreview] = useState(false);
        const fileUrl = file ? URL.createObjectURL(file) : existingDoc;
        const isPDF = file?.type === 'application/pdf' || existingDoc?.endsWith('.pdf');

        return (
            <Paper p="md" withBorder>
                <Stack gap="sm">
                    <Text fw={500} size="sm">{title}</Text>
                    {(file || existingDoc) ? (
                        <>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">
                                    {file ? file.name : 'Document uploaded'}
                                </Text>
                                <Group gap="xs">
                                    {fileUrl && (
                                        <Button
                                            size="xs"
                                            variant="light"
                                            leftSection={<Eye size={14} />}
                                            onClick={() => {
                                                if (isPDF) {
                                                    window.open(fileUrl, '_blank');
                                                } else {
                                                    setShowPreview(!showPreview);
                                                }
                                            }}
                                        >
                                            {isPDF ? 'Open' : (showPreview ? 'Hide' : 'View')}
                                        </Button>
                                    )}
                                    <FileButton onChange={setFile} accept="image/*,application/pdf">
                                        {(props) => <Button size="xs" variant="outline" {...props}>Change</Button>}
                                    </FileButton>
                                </Group>
                            </Group>
                            {showPreview && fileUrl && !isPDF && (
                                <Box mt="xs">
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

    const hasAadhar = candidate?.aadhar_document;
    const hasPan = candidate?.pan_document;
    const hasDocuments = hasAadhar || hasPan;

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
                            {hasDocuments
                                ? `${hasAadhar ? 'Aadhar' : ''}${hasAadhar && hasPan ? ' and ' : ''}${hasPan ? 'PAN' : ''} document${hasAadhar && hasPan ? 's' : ''} uploaded`
                                : 'Verify candidate identity before scheduling an interview.'
                            }
                        </Text>
                    </Box>

                    <Group grow>
                        {sent ? (
                            <Button
                                variant="light"
                                color="green"
                                leftSection={<CheckCircle size={16} />}
                                rightSection={<Eye size={16} />}
                                onClick={() => setMessageModalOpened(true)}
                            >
                                Request Sent
                            </Button>
                        ) : (
                            <Button color="blue" onClick={handleRequest} loading={loading}>
                                Request Government ID
                            </Button>
                        )}
                        <Button variant="outline" color="gray" onClick={() => setModalOpened(true)}>
                            {hasDocuments ? 'View/Update Documents' : 'Upload Manually'}
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
                    <DocumentUploadSection
                        title="Aadhar Card"
                        file={aadharDoc}
                        setFile={setAadharDoc}
                        existingDoc={candidate?.aadhar_document}
                    />
                    <DocumentUploadSection
                        title="PAN Card"
                        file={panDoc}
                        setFile={setPanDoc}
                        existingDoc={candidate?.pan_document}
                    />

                    {uploadError && <Text c="red" size="sm">{uploadError}</Text>}

                    <Button
                        onClick={handleUpload}
                        loading={uploadLoading}
                        leftSection={<Upload size={16} />}
                    >
                        Upload Documents
                    </Button>
                </Stack>
            </Modal>

            <Modal
                opened={messageModalOpened}
                onClose={() => setMessageModalOpened(false)}
                title="Document Request Email"
                size="lg"
            >
                <Stack gap="md">
                    <Box>
                        <Text fw={600} size="sm" c="dimmed" mb={4}>Subject:</Text>
                        <Text>{emailData.subject}</Text>
                    </Box>
                    <Box>
                        <Text fw={600} size="sm" c="dimmed" mb={4}>Message:</Text>
                        <Text style={{ whiteSpace: 'pre-wrap' }}>{emailData.body}</Text>
                    </Box>
                </Stack>
            </Modal>
        </>
    );
};
