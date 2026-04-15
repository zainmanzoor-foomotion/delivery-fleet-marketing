interface DatabaseIconProps {
    size?: number
    primaryColor?: string
    stroke?: string
}

export function DatabaseIcon({
    size = 44,
    primaryColor = "#F4B812",
    stroke = "#F4B812",
}: DatabaseIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M28.3337 7.08301V26.9163C28.3337 29.2636 23.2596 31.1663 17.0003 31.1663C10.7411 31.1663 5.66699 29.2636 5.66699 26.9163V7.08301Z"
                fill={primaryColor}
                stroke={stroke}
                strokeWidth="1.5"
            />

            <path
                d="M17.0003 11.333C23.2596 11.333 28.3337 9.43022 28.3337 7.08301C28.3337 4.7358 23.2596 2.83301 17.0003 2.83301C10.7411 2.83301 5.66699 4.7358 5.66699 7.08301C5.66699 9.43022 10.7411 11.333 17.0003 11.333Z"
                fill="white"
                stroke={stroke}
                strokeWidth="1.5"
            />

            <path
                d="M9.91699 15.3594C10.7692 15.6156 11.7223 15.8266 12.7503 15.9827"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M30 17C30 19.2092 24.1797 21 17 21C9.82029 21 4 19.2092 4 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M9.91699 25.2764C10.7692 25.5326 11.7223 25.7436 12.7503 25.8997"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}