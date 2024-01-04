import { useState } from "react"

interface IProps {
    name: string
    age: number
    info: {
        gender: string
        address: string
    }
    popup_alert: (v: string) => void
    listTodo: string[]
    setlistTodo: (v: string[]) => void
}

const InputTodo = (props: IProps) => {

    const {popup_alert, setlistTodo, listTodo} = props
    const [todo, setTodo] = useState("")

    const handleClick = (todo: string) => {
        if (!todo) {
            popup_alert("empty todo")
            return
        }
        setlistTodo([...listTodo, todo])
        setTodo("")
    }

    return (
        <div style={{border: "1px red solid"}}>
            <div>Add new todo</div>
            <input
                value={todo}
                type='text'
                onChange={(event) => {
                    setTodo(event.target.value)
                }}
            />
            <div>My to do is {todo}</div>
            <button onClick={() => handleClick(todo)}>Save</button>

        </div>
    )
}

export default InputTodo