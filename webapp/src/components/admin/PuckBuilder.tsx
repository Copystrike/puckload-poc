'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useRouteTransition } from '@payloadcms/ui'

const PuckBuilder: React.FC = () => {
  const router = useRouter()
  const { startRouteTransition } = useRouteTransition()

  const handleClick = useCallback(() => {
    startRouteTransition(() => {
      // This corresponds with the /app/admin/puck-builder/page.tsx
      router.push('/admin/puck-builder')
    })
  }, [router, startRouteTransition])

  return (
    <div
      style={{
        padding: '1.5rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>Visual Page Builder</h4>
      <button
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.1s ease-out', // Refined transitions
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 1px rgba(0, 0, 0, 0.1)', // More pronounced shadow for depth
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#333' // Lighter on hover
          e.currentTarget.style.boxShadow =
            '0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.1)' // Lift shadow on hover
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#000' // Reset background
          e.currentTarget.style.boxShadow =
            '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 1px rgba(0, 0, 0, 0.1)' // Reset shadow
          e.currentTarget.style.transform = 'translateY(0)' // Ensure transform resets if mouse leaves during active state
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.backgroundColor = '#222' // Darker when pressed
          e.currentTarget.style.boxShadow =
            'inset 0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.1)' // Inset shadow for pressed effect
          e.currentTarget.style.transform = 'translateY(1px)' // Simulate pressing down
        }}
        onClick={handleClick}
      >
        Open {/* Clear action text */}
        <PuckLogo />
      </button>
      <p style={{ marginTop: '1rem', color: '#555', fontSize: '0.9rem', lineHeight: '1.5' }}>
        The visual editor for React. Puck empowers developers to build amazing visual editing
        experiences into their own React applications, powering the next generation of content
        tools, no-code builders and WYSIWYG editors.
      </p>
    </div>
  )
}

const PuckLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1300 326"
    width="100"
    height="25"
    style={{ marginBottom: '-3px' }}
    fill="currentColor"
  >
    <path d="M368.9 5.9H455c48.1 0 88.1 15.4 88.1 70.4 0 54.4-37 71.1-85.8 71.1H420v90.4h-51.1V5.9zm51.1 98.2h34c18 0 36-6.2 36-27.8 0-23.9-24.2-27.2-43.9-27.2H420v55zM786 148.3c0 54.7-33.4 95.3-97.6 95.3-64.5 0-97.9-40.6-97.9-95.3V5.9h51.1v140.5c0 28.5 19.6 50.1 46.8 50.1 26.8 0 46.5-21.6 46.5-50.1V5.9H786v142.4zM997.1 66.1c-10.1-12.1-24.9-19-43.9-19-38.6 0-67.1 31.4-67.1 74.7s28.5 74.7 65.5 74.7c20.6 0 37.3-9.2 47.8-24.9l42.6 31.8c-19.3 27.5-52.1 40.3-83.8 40.3-72.4 0-125.1-47.5-125.1-121.8C833.1 47.5 885.8 0 958.2 0c25.9 0 58.6 8.8 78.3 34.1l-39.4 32zM1083.2 5.9h51.1v96.3l90-96.3h66.8L1188 113.6l112 124.1h-71.4l-94.3-110v110h-51.1V5.9zM149.3 237.7H82.5v-24.4h66.9v24.4zm82.5-82.5h-24.4V88.4h24.4v66.8zm-207.4 0H0V88.4h24.4v66.8zM149.3 30.3H82.5V5.9h66.9v24.4zM45.6 237.7H0v-45.6h24.4v21.2h21.2v24.4zM231.8 51.5h-24.4V30.3h-21.2V5.9h45.6v45.6zm-207.4 0H0V5.9h45.6v24.4H24.4v21.2zM164.8 170.7l27.5 155.2L320 198.2l-155.2-27.5z"></path>
  </svg>
)

export default PuckBuilder
