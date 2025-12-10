import { CandidateDashboard } from "@/components/dashboard/CandidateDashboard";
import { GridBackground } from "@/components/ui/GridBackground";

export default function DashboardPage() {
    return (
        <GridBackground>
            <div className=" pb-10 w-full min-h-screen relative z-30">
                <CandidateDashboard />
            </div>
        </GridBackground>
    );
}
