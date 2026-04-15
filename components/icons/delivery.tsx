interface DeliveryBoxIconProps {
    size?: number
    color?: string
    stroke?: string
}

export function DeliveryBoxIcon({
    size = 44,
    color = "#475569",
    stroke = "white",
}: DeliveryBoxIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.58203 13.75V24.75C4.58203 31.6639 4.58203 35.121 6.72991 37.2687C8.87781 39.4167 12.3348 39.4167 19.2487 39.4167H24.7487C31.6626 39.4167 35.1197 39.4167 37.2674 37.2687C39.4154 35.121 39.4154 31.6639 39.4154 24.75V13.75"
                fill={color}
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M19.5833 21C19.5833 21 15 24.3755 15 25.5833C15 26.7911 19.5833 30.1667 19.5833 30.1667M15.9167 25.5833H25.5417C27.82 25.5833 29.6667 27.4302 29.6667 29.7083C29.6667 31.9864 27.82 33.8333 25.5417 33.8333H24.1667"
                stroke='white'
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M27.6875 3.8335H16.4141C14.9397 3.8335 13.7813 3.83314 12.8379 3.92334C11.8788 4.01506 11.0854 4.20469 10.3428 4.61572C9.60006 5.02686 9.01769 5.59853 8.43066 6.36279C7.85336 7.11441 7.23877 8.09583 6.45605 9.34521L3.94629 13.3521C3.80154 13.5832 3.79369 13.8751 3.92578 14.1138C4.05793 14.3523 4.30934 14.5005 4.58203 14.5005H39.415C39.6852 14.5005 39.9352 14.3548 40.0684 14.1196C40.2013 13.8847 40.1973 13.5963 40.0586 13.3647L37.7627 9.53857C36.9875 8.24664 36.3792 7.23097 35.8037 6.45361C35.2187 5.66351 34.6341 5.07156 33.8809 4.64502C33.1274 4.2184 32.3186 4.02142 31.3398 3.92627C30.6177 3.85608 29.7715 3.83863 28.7578 3.83447L27.6875 3.8335Z"
                fill={color}
                stroke='white'
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M22 13.75V4.58337"
                stroke='white'
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}