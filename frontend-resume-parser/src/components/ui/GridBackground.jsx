import React from "react";
import { cn } from "@/lib/utils";

export const GridBackground = ({ children, className }) => {
    return (
        // Use Mantine CSS variables for background colors
        <div className={cn("h-screen w-full relative flex items-center justify-center", className)}
            style={{
                backgroundColor: 'var(--mantine-color-body)',
                // We can use a svg pattern that adapts to currentColor or specific variables
            }}
        >
            <div className={cn(
                "absolute pointer-events-none inset-0 flex items-center justify-center",
                "bg-[url('https://ui.aceternity.com/_next/static/media/grid.02241639.svg')]", // Using the simple grid SVG usually works, or inline it.
                // Let's rely on standard Aceternity technique but tint it with Mantine vars.
                // Actually, "grid-black/[0.2]" relies on Tailwind. 
                // Let's make it standard:
                "opacity-[0.3]"
            )}
                style={{
                    backgroundImage: `radial-gradient(var(--mantine-color-dimmed) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}
            >
            </div>

            {/* Radial gradient mask for fading edges */}
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center"
                style={{
                    background: `radial-gradient(circle at center, transparent 10%, var(--mantine-color-body) 100%)`
                }}
            ></div>

            <div className="relative z-20 w-full max-w-7xl">
                {children}
            </div>
        </div>
    );
};
