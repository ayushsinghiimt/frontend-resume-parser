"use client";

import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const NOTIFICATION_ID = 'server-status-notification';

export function ServerStatusNotification() {
    useEffect(() => {
        let isMounted = true;
        let timeoutId = null;

        const checkServerHealth = async () => {
            try {
                // Attempt to reach the server
                await axios.get(`${API_URL}/api/health/`, { timeout: 2500 });

                // --- SUCCESS ---
                if (!isMounted) return;

                // Update the existing notification to Green/Success
                notifications.update({
                    id: NOTIFICATION_ID,
                    color: 'green',
                    title: 'Server Connected!',
                    message: 'You can now start using the application.',
                    icon: <IconCheck size={16} />,
                    loading: false,
                    autoClose: 5000, // Close automatically after 3 seconds
                    withCloseButton: true,
                });

                // We stop here (no new timeout)

            } catch (error) {
                // --- FAILURE / LOADING ---
                if (!isMounted) return;

                // Show (or refresh) the loading notification
                // Using .show with a specific ID prevents duplicates
                notifications.show({
                    id: NOTIFICATION_ID,
                    loading: true,
                    title: 'Server Starting...',
                    message: 'The backend is waking up. This usually takes 20-40 seconds.',
                    autoClose: false, // Keep open while loading
                    withCloseButton: false,
                    color: 'blue',
                });

                // Retry after 3 seconds
                timeoutId = setTimeout(checkServerHealth, 2000);
            }
        };

        // Start the process
        checkServerHealth();

        // Cleanup function
        return () => {
            isMounted = false;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return null;
}