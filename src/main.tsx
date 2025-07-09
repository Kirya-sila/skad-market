import { router } from '@/app/router/router'
import '@assets/typography/index.css'
import '@shared/ui/styles/normalize.css'
import '@shared/ui/styles/variables.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { installExtensions } from './shared/extensions'

const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)
installExtensions()

root.render(<RouterProvider router={router} />)
