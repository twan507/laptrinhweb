import '../../styles/users.css'
import { useState, useEffect } from 'react'

interface IUsers  {
    email: string
    name: string
    role: string
}


const UserTable = () => {

    const [listUsers, setListUsers] = useState([])

    console.log(">>> check listUsers", listUsers)

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {

        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU5NTA4OThmZGE0ODdjMjMwN2Q0NDczIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDQzNjAyMjYsImV4cCI6MTc5MDc2MDIyNn0.cpZy_BrH4GJIb6OTe8Bw13_4oe6wA7JhIHKhjm0Jt2w"

        const res = await fetch("http://localhost:8000/api/v1/users/all",
            {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                }
            })

        const d = await res.json()

        console.log(">>> check data:", d.data.result)
        setListUsers(d.data.result)
    }

    return (
        <div>
            <h2>HTML Table</h2>

            <table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Role</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers.map((item: IUsers, index) => {
                            return(
                                <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTable