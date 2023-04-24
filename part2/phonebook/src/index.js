import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const contacts = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Matvey Sokolovsky', number: '39-23-6423122', id: 4 },
    { name: 'John Lennon', number: '7-916-066-03-12', id: 5 },
    { name: 'Thelonious Monk', number: '35-32864724', id: 6 },
    { name: 'Anatoly Yatskov', number: '+1-347-620-0909', id: 7 },
  ]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App contacts={contacts}/>)