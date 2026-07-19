export default function Loading() {
  return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-ft-gray-soft">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fekitech-blue"></div>
        <p className="mt-4 text-sm text-gray-500">Loading editor...</p>
      </div>
    </div>
  );
}
