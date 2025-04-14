'use client'

import type { Config } from '@measured/puck'

import { Puck } from '@measured/puck'
import ReactDOM from 'react-dom'
import '@measured/puck/puck.css'

import './styles.css'

interface PuckEditorOverlayProps {
  close: () => void
}

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

export const PuckBuilderOverlay: React.FC<PuckEditorOverlayProps> = ({ close }) => {
  return ReactDOM.createPortal(
    <div>
      <button className={'button'} onClick={close} type="button">
        Back
      </button>
      <Puck config={config} data={initialData} onPublish={save} />
    </div>,
    document.querySelector('.collection-edit') as HTMLElement,
  )
}
