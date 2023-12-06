import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import YTForm from './components/YTForm'
import TestForm from './components/TestForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <TestForm/>
    </>
  )
}

export default App
