import { useState, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function ContactForm() {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailPattern.test(email)
  }

  const onNameInput = useCallback((e) => {
    const value = e.target.value
    setNameValue(value)
    if (!value.trim()) setNameError('Name cannot be empty')
    else setNameError('')
  })

  const onEmailInput = useCallback((e) => {
    const value = e.target.value
    setEmailValue(value)
    if (!isEmailValid(value)) setEmailError('Email must be a valid email format')
    else setEmailError('')
  })

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (!nameError && !emailError && nameValue && emailValue) setSubmitMessage('Form successfully submitted')
    else {
      setSubmitMessage('')
      if (!nameValue.trim()) setNameError('Name cannot be empty')
      else setNameError('')
      if (!isEmailValid(emailValue)) setEmailError('Email must be a valid email format')
      else setEmailError('')
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type='text'
          value={nameValue}
          onChange={onNameInput}
          placeholder='Name'
        />
        {nameError && <p>{nameError}</p>}
      </div>
      <div>
        <input
          type='email'
          value={emailValue}
          onChange={onEmailInput}
          placeholder='Email'
        />
        {emailError && <p>{emailError}</p>}
      </div>
      <div>
        <button type='submit'>Submit</button>
        {submitMessage && <p>{submitMessage}</p>}
      </div>
    </form>
  )
}

function App() {
  return (
    <ContactForm />
  )
}

export default App
