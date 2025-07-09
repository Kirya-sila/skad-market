import React from 'react'
import Link from 'next/link'

export default function NotFound() {
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
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link 
        href="/"
        style={{
          background: '#0070f3',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '20px'
        }}
      >
        Go back home
      </Link>
    </div>
  )
}