interface TickDownIconProps {
    size?: number
    stroke?: string
}

export function TickDownIcon({
    size = 16,
    stroke = "#141B34",
}: TickDownIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.5 3.25L14.5 7.75C14.5 10.932 14.5 12.523 13.5116 13.5115C12.5229 14.5 10.9319 14.5 7.75 14.5L3.25 14.5M12.25 12.25L1 1"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}