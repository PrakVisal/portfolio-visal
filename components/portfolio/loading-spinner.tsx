export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Loading portfolio...</p>
      </div>
    </div>
  )
}
