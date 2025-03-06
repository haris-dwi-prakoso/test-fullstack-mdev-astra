import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function FetchList() {
  const [isLoading, setIsLoading] = useState(true)
  const [responseData, setResponseData] = useState([])
  const [responseError, setResponseError] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      setIsLoading(false)
      if (!response.ok) setResponseError("Error retrieving data from API")
      else {
        const data = await response.json()
        setResponseData(data)
      }
    }

    if (isLoading) fetchData()
  }, [])

  return (
    <>
      {isLoading && <h2>{"Now Loading..."}</h2>}
      {responseError && <p>{responseError}</p>}
      {responseData.length > 0 && <div>
        <h1>List of posts</h1>
        {responseData.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <span>{post.body}</span>
          </div>
        ))}
      </div>}
    </>
  )
}

function App() {

  return (
    <FetchList />
  )
}

export default App
