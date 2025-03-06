import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const initData = ["Apple", "Banana", "Cherry"]

function ItemList() {
  const [list, setList] = useState(initData)

  const removeData = (index) => {
    const newData = initData.toSpliced(index, 1)
    setList(newData)
  }

  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>
          <span>{item}</span>
          <button type="button" onClick={() => removeData(index)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <ItemList />
  )
}

export default App
