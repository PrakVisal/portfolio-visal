export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-32 w-32 animate-spin rounded-full border-b-4 border-yellow-500"></div>
        <p className="text-lg text-gray-600">Loading portfolio...</p>
      </div>
    </div>
  )
}
