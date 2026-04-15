interface TickIconProps {
    size?: number
    stroke?: string
}

export function TickIcon({ size = 16, stroke = "#141B34" }: TickIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.5 12.25V7.75C14.5 4.56805 14.5 2.97703 13.5116 1.98851C12.5229 0.999999 10.9319 1 7.75 1H3.25M12.25 3.25L1 14.5"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}