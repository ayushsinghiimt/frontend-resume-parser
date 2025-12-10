"use client";
import React, { useState } from 'react';
import { Grid, Button, Box, Modal, Stack, Text, Paper, FileButton, Group } from '@mantine/core';
import { ArrowLeft, Upload, Eye } from 'lucide-react';
import Link from 'next/link';
import { SummaryBox, SkillsBox, TimelineBox, ProjectsBox } from './ProfileComponents';
import axios from 'axios';

export const CandidateProfile = ({ candidate: initialCandidate }) => {
    const [candidate, setCandidate] = useState(initialCandidate);
    const [modalOpened, setModalOpened] = useState(false);
    const [messageModalOpened, setMessageModalOpened] = useState(false);
    const [aadharDoc, setAadharDoc] = useState(null);
    const [panDoc, setPanDoc] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDocumentsUpdate = (updatedCandidate) => {
        setCandidate(updatedCandidate);
    };

    const handleIdentityRequest = async () => {
        setLoading(true);
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${candidate.id}/request-documents/`
            );

            const updatedCandidate = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${candidate.id}/`
            );
            setCandidate(updatedCandidate.data);
        } catch (err) {
            console.error('Error requesting documents:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadDocuments = () => {
        setModalOpened(true);
    };

    const handleViewMessage = () => {
        setMessageModalOpened(true);
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
            setCandidate(response.data);
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

    return (
        <Box px="200px"  >
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
                <Grid.Col >
                    <SummaryBox
                        candidate={candidate}
                        onIdentityRequest={handleIdentityRequest}
                        onUploadDocuments={handleUploadDocuments}
                        requestSent={!!candidate.document_request_message}
                        onViewMessage={handleViewMessage}
                    />
                </Grid.Col>
                <Grid.Col>
                    <TimelineBox experience={candidate.experience} />


                </Grid.Col>

                <Grid.Col>
                    <ProjectsBox projects={candidate.projects} />
                </Grid.Col>
                <Grid.Col>
                    <SkillsBox skills={candidate.skills} />
                </Grid.Col>
            </Grid>

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
        </Box>
    );
};
