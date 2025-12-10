"use client";
import { FileUpload } from "@/components/ui/FileUpload";
import { GridBackground } from "@/components/ui/GridBackground";
import { Container, Title, Text, Stack, Center, Button, Box } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <GridBackground>
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-start  sm:pt-32 p-8 relative z-50">
        <Container size="md">
          <Stack gap="lg" align="center">
            <Stack gap="xs" align="center" ta="center">
              <Title
                order={1}
                size="3.5rem"
                fw={900}
                style={{
                  lineHeight: 1.1,
                  letterSpacing: '-1px',
                }}
              >
                Transform Hiring with
                <br />
                <Text
                  component="span"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'violet', deg: 90 }}
                  inherit
                >
                  AI-Powered Resume Parsing
                </Text>
              </Title>
              <Text size="lg" c="dimmed" Maw={600} mx="auto">
                Effortlessly extract and analyze candidate data with our intelligent parsing engine.
              </Text>
            </Stack>

            <Box w="100%" mt="xl">
              <FileUpload />
              <Center mt="xl">
                <Button
                  component={Link}
                  href="/dashboard"
                  variant="subtle"
                  size="md"
                  color="gray"
                >
                  View Candidate Dashboard
                </Button>
              </Center>
            </Box>
          </Stack>
        </Container>
      </div>
    </GridBackground>
  );
}
