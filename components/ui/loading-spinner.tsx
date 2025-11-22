'use client'

import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimationData from '@/lib/loading-animation'

interface LoadingSpinnerProps {
  size?: number
  className?: string
  fullscreen?: boolean
}

// Lottie-based loading component
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = '', fullscreen = true }) => {
  return (
    <div
      className={
        fullscreen
          ? `fixed inset-0 z-50 flex items-center justify-center bg-yellow-400 ${className}`
          : `relative flex items-center justify-center w-full h-full min-h-[120px] bg-yellow-400 ${className}`
      }
      style={
        fullscreen
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          : undefined
      }
    >
      <div className="w-64 h-64 flex-shrink-0">
        <Lottie
          animationData={loadingAnimationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
          renderer="svg"
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid meet',
          }}
        />
      </div>
    </div>
  )
}

export default LoadingSpinner 