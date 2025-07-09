import type { ApiResponse } from "@/lib/types"

export function createSuccessResponse<T>(message: string, data?: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  }
}

export function createErrorResponse(message: string, errors?: Record<string, string>): ApiResponse {
  return {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  }
}

export function handleApiError(error: unknown): ApiResponse {
  console.error("API Error:", error)

  if (error instanceof Error) {
    return createErrorResponse(error.message)
  }

  return createErrorResponse("An unexpected error occurred")
}
