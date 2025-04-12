'use client'

import { Config, Puck } from '@measured/puck'
import React from 'react'

import '@measured/puck/puck.css'

interface Components {
  content: {
    title: string
  }
}

// Create Puck component config
const config: Config<Components> = {
  components: {
    content: {
      render: () => {
        return <p>Test Block</p>
      },
    },
  },
}

// Describe the initial data
const initialData = {
  // Retrieve the data from the mongodb database of payload
}

// Save the data to your database
const save = (data: any) => {
  // Save to the mongodb database of payload
}

const PuckBuilderAdminPage: React.FC = () => {
  return (
    <div>
      <Puck config={config} data={initialData} onPublish={save} />
    </div>
  )
}

export default PuckBuilderAdminPage
