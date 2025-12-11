"use client";

import { useEffect, useState, useRef } from 'react';
import { notifications } from '@mantine/notifications';
import { IconServer, IconCheck } from '@tabler/icons-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function ServerStatusNotification() {
    const [isChecking, setIsChecking] = useState(true);
    const [hasShownNotification, setHasShownNotification] = useState(false);
    const notificationId = useRef('server-status-notification');
    const pollIntervalRef = useRef(null);

    const checkServerHealth = async () => {
        try {
            await axios.get(`${API_URL}/api/health/`, {
                timeout: 5000,
            });

            // Server is up!
            if (hasShownNotification) {
                notifications.update({
                    id: notificationId.current,
                    color: 'green',
                    title: 'Server Connected!',
                    message: 'You can now start using the application.',
                    icon: <IconCheck size={16} />,
                    autoClose: 2000,
                });
            }

            setIsChecking(false);
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = null;
            }
        } catch (error) {
            // Server is down/starting
            if (!hasShownNotification) {
                notifications.show({
                    id: notificationId.current,
                    loading: true,
                    title: 'Server Starting...',
                    message: 'The backend is waking up from serverless mode. This usually takes 20-40 seconds. Please wait.',
                    autoClose: false,
                    withCloseButton: false,
                });
                setHasShownNotification(true);
            }
        }
    };

    useEffect(() => {
        // Initial check
        checkServerHealth();

        // Poll every 3 seconds if server is not ready
        pollIntervalRef.current = setInterval(() => {
            if (isChecking) {
                checkServerHealth();
            }
        }, 3000);

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, [isChecking, hasShownNotification]);

    return null; // This component doesn't render anything
}
