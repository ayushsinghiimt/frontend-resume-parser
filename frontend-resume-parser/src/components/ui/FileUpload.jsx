"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Card, Text, Progress, Group, rem, Stack, ThemeIcon, Alert } from '@mantine/core';
import axios from 'axios';
// Actually, using basic HTML events on a motion.div is often smoother for custom hero animations than overriding a library component's styles heavily.

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const FileUpload = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(null);
    const [uploadedData, setUploadedData] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.docx'))) {
            processFile(droppedFile);
        } else {
            setError('Please upload a PDF or DOCX file');
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = async (selectedFile) => {
        setFile(selectedFile);
        setUploading(true);
        setProgress(0);
        setError(null);
        setCompleted(false);

        const formData = new FormData();
        formData.append('resume_file', selectedFile);

        try {
            const response = await axios.post(
                `${API_URL}/api/candidates/upload/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    },
                }
            );

            setUploadedData(response.data);
            setCompleted(true);
            setUploading(false);
            console.log('Upload successful:', response.data);
        } catch (err) {
            setUploading(false);
            setCompleted(false);
            setProgress(0);

            if (err.response) {
                setError(err.response.data.resume_file?.[0] || 'Upload failed. Please try again.');
            } else if (err.request) {
                setError('Cannot connect to server. Make sure the backend is running.');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error('Upload error:', err);
        }
    };

    const resetUpload = () => {
        setFile(null);
        setCompleted(false);
        setProgress(0);
        setError(null);
        setUploadedData(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <Card
                padding="xl"
                radius="md"
                withBorder
                shadow="sm"
                bg="var(--mantine-color-body)"
            >
                {!file ? (
                    <motion.div
                        className={`
                            relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
                        `}
                        style={{
                            borderColor: isDragging
                                ? 'var(--mantine-color-blue-filled)'
                                : 'var(--mantine-color-dimmed)',
                            backgroundColor: isDragging
                                ? 'var(--mantine-color-blue-light)'
                                : 'transparent'
                        }}
                        animate={{
                            scale: isDragging ? 1.02 : 1,
                        }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.docx"
                            onChange={handleFileSelect}
                        />

                        <Stack align="center" gap="md">
                            <ThemeIcon
                                size={60}
                                radius="50%"
                                variant="light"
                                color="gray"
                            >
                                <Upload size={30} />
                            </ThemeIcon>
                            <div>
                                <Text size="lg" fw={500}>
                                    Click to upload or drag and drop
                                </Text>
                                <Text size="sm" c="dimmed" mt={4}>
                                    PDF or DOCX (max 10MB)
                                </Text>
                            </div>
                        </Stack>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Stack gap="md">
                            {error && (
                                <Alert icon={<AlertCircle size={16} />} color="red" variant="light">
                                    {error}
                                </Alert>
                            )}

                            <Group position="apart" className='justify-between'>
                                <Group gap="sm">
                                    <ThemeIcon size="lg" radius="md" variant="light" color={completed ? 'green' : error ? 'red' : 'blue'}>
                                        <FileText size={20} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="sm" fw={500}>{file.name}</Text>
                                        <Text size="xs" c="dimmed">{(file.size / 1024 / 1024).toFixed(2)} MB</Text>
                                    </div>
                                </Group>
                                {completed && <CheckCircle className="text-green-500 w-5 h-5" />}
                                {error && <AlertCircle className="text-red-500 w-5 h-5" />}
                            </Group>

                            {(uploading || completed) && !error && (
                                <div className="space-y-2">
                                    <Group position="apart" className='justify-between text-sm'>
                                        <Text size="xs" c="dimmed">{completed ? 'Upload Complete' : 'Uploading...'}</Text>
                                        <Text size="xs" fw={500}>{progress}%</Text>
                                    </Group>
                                    <Progress
                                        value={progress}
                                        animated={uploading}
                                        color={completed ? 'green' : 'blue'}
                                        size="sm"
                                        radius="xl"
                                    />
                                </div>
                            )}

                            {completed && uploadedData && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Alert icon={<CheckCircle size={16} />} color="green" variant="light">
                                        {uploadedData.message}
                                    </Alert>
                                </motion.div>
                            )}

                            {(completed || error) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <button
                                        onClick={resetUpload}
                                        className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 underline"
                                    >
                                        Upload another resume
                                    </button>
                                </motion.div>
                            )}
                        </Stack>
                    </motion.div>
                )}
            </Card>
        </div>
    );
};
