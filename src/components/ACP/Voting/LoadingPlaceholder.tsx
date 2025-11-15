export const LoadingPlaceholder = () => (
    <div className="flex flex-col gap-2 items-center justify-center px-3 py-10 bg-gray-900/60 rounded-xl">
        <div className="loading loading-lg loading-ring text-primary" />

        <span className="text-sm text-gray-400">
            Φόρτωση δεδομένων...
        </span>
    </div>
);