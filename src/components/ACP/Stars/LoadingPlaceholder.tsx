export const LoadingPlaceholder = () => (
    <div className="flex flex-col gap-4 p-4 items-center bg-gray-900/60 text-gray-400 rounded-xl text-sm select-none">
        <div className="loading loading-spinner loading-xl text-primary" />

        <span>
            Φόρτωση ταλέντων...
        </span>
    </div>
);