'use client'

import React from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>Something went wrong!</h1>
      <p>An error occurred while loading this page.</p>
      {error.message && (
        <details style={{ margin: '20px 0', textAlign: 'left' }}>
          <summary>Error details</summary>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto',
            maxWidth: '100%'
          }}>
            {error.message}
          </pre>
        </details>
      )}
      <button
        onClick={reset}
        style={{
          background: '#0070f3',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Try again
      </button>
    </div>
  )
}