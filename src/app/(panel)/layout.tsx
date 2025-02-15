import React from 'react'

export default function PanelLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mx-auto max-w-[1440px] lg:px-20 lg:bg-[#F4F5FC] lg:h-full">
            {children}
        </div>
    )
}
