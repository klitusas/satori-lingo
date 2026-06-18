import React from 'react';

export const ZenClearedAnimation = () => (
    <div className="w-48 h-48 flex items-center justify-center relative select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="#F5F3EF" stroke="#E3DFD5" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="90" r="30" fill="#C28C7E" className="animate-pulse" style={{ animationDuration: '4s' }} />
            <path d="M 40 135 Q 70 120 100 135 T 160 135" fill="none" stroke="#4F5D4E" strokeWidth="3" strokeLinecap="round" className="animate-sway" />
            <path d="M 40 148 Q 70 133 100 148 T 160 148" fill="none" stroke="#7A756B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M 60 60 L 62 65 L 67 67 L 62 69 L 60 74 L 58 69 L 53 67 L 58 65 Z" fill="#C28C7E" className="animate-float" style={{ animationDelay: '0.5s' }} />
            <path d="M 145 55 L 147 58 L 151 60 L 147 62 L 145 65 L 143 62 L 139 60 L 143 58 Z" fill="#4F5D4E" className="animate-float" style={{ animationDelay: '1.5s' }} />
        </svg>
    </div>
);

export const SenseiLoaderAnimation = () => (
    <div className="w-24 h-24 flex items-center justify-center relative select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#E3DFD5" strokeWidth="2" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#C28C7E" strokeWidth="2.5" className="animate-pulse-ring" />
            <g className="animate-spin-slow origin-center" style={{ transformOrigin: '50px 50px' }}>
                <circle cx="50" cy="20" r="4.5" fill="#4F5D4E" />
                <circle cx="50" cy="80" r="4.5" fill="#4F5D4E" />
                <circle cx="20" cy="50" r="4.5" fill="#4F5D4E" />
                <circle cx="80" cy="50" r="4.5" fill="#4F5D4E" />
            </g>
        </svg>
    </div>
);

export const SearchEmptyAnimation = () => (
    <div className="w-32 h-32 flex items-center justify-center relative select-none">
        <svg viewBox="0 0 120 120" className="w-full h-full">
            <g className="animate-float">
                <rect x="35" y="20" width="50" height="65" rx="5" fill="#F5F3EF" stroke="#E3DFD5" strokeWidth="2" />
                <line x1="45" y1="35" x2="75" y2="35" stroke="#7A756B" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <line x1="45" y1="47" x2="65" y2="47" stroke="#7A756B" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <line x1="45" y1="59" x2="75" y2="59" stroke="#7A756B" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            </g>
            <g className="animate-sway-heavy" style={{ transformOrigin: '75px 75px' }}>
                <circle cx="75" cy="72" r="12" fill="none" stroke="#C28C7E" strokeWidth="2.5" />
                <line x1="84" y1="81" x2="95" y2="92" stroke="#C28C7E" strokeWidth="3" strokeLinecap="round" />
            </g>
        </svg>
    </div>
);
