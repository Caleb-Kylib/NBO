// src/components/ui/TrustBadge.jsx
import React from 'react';
import { GoVerified, GoUnverified } from 'react-icons/go';
import { RiShieldCheckFill } from 'react-icons/ri';
import clsx from 'clsx';

const TrustBadge = ({ status }) => {
    const styles = {
        verified: {
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            icon: GoVerified,
            label: 'Verified',
        },
        claimed: {
            color: 'text-green-600',
            bg: 'bg-green-100',
            icon: RiShieldCheckFill,
            label: 'Claimed',
        },
        unverified: {
            color: 'text-gray-500',
            bg: 'bg-gray-100',
            icon: GoUnverified,
            label: 'Unverified',
        },
    };

    const config = styles[status] || styles.unverified;
    const Icon = config.icon;

    return (
        <div className={clsx("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", config.bg, config.color)}>
            <Icon className="text-sm" />
            <span>{config.label}</span>
        </div>
    );
};

export default TrustBadge;
