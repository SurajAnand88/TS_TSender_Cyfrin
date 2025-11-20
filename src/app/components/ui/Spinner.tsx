export function Spinner() {
    return (
        // <div className="inline mx-2">
            <svg className={`size-5 animate-spin text-white inline box-border mx-2 mb-1`} viewBox="0 0 50 50">

            <circle
                className="opacity-25"
                cx="25"
                cy="25"
                r="20"
                stroke="currentColor"
                stroke-width="5"
                fill="none"
            />
            <circle
                className="opacity-75"
                cx="25"
                cy="25"
                r="20"
                stroke="currentColor"
                stroke-width="5"
                fill="none"
                stroke-dasharray="90"
                stroke-dashoffset="60"
            />
        </svg>
        // </div>
    )
}