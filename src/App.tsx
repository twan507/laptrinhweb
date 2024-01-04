import { useState } from "react"
import InputTodo from "./todo/input.todo"

function App() {

  const name = "twan"
  const age = 25
  const info = {
    gender: "male",
    address: "hanoi"
  }

  const popup_alert = (popup: string): void => {
    alert(popup)
  }

  const [listTodo, setlistTodo] = useState(["todo 1", "todo 2", "todo 3", "todo 4", "todo 5"])

  return (
    <div>
      <InputTodo
        name={name}
        age={age}
        info={info}
        popup_alert={popup_alert}
        listTodo={listTodo}
        setlistTodo={setlistTodo}
      />

      <ul>
        {listTodo.map((item, index) => {
          return (<li key={index}>{item}</li>)
        })}
      </ul>
    </div>
  )
}

export default App