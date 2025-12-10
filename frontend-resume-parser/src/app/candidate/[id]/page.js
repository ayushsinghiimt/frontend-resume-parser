import { CandidateProfile } from "@/components/profile/CandidateProfile";

// Mock Data Lookup (In a real app, fetch from API)
const getCandidate = (id) => {
    return {
        id: id,
        name: 'Alice Johnson',
        role: 'Senior Frontend Engineer',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Node.js', 'Framer Motion', 'Jest', 'AWS'],
    };
};

export default function CandidatePage({ params }) {
    const { id } = params;
    const candidate = getCandidate(id);

    // Removed GridBackground wrapper to fix layout issues
    // Using a simple full-width layout with Mantine body color
    return (
        <div
            className="min-h-screen w-full pt-16"
            style={{ backgroundColor: 'var(--mantine-color-body)' }}
        >
            <CandidateProfile candidate={candidate} />
        </div>
    );
}
