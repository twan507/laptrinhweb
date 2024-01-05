import { useState, useEffect } from 'react'
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';

export interface IUsers {
    _id: string
    email: string
    name: string
    role: string
    password: string
    age: string
    gender: string
    address: string
}

const UserTable = () => {

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU5NTA5NzNkZWM1ODM1Njk2N2Q0YWM3IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDQ0MzI3OTcsImV4cCI6MTc5MDgzMjc5N30.Z2aHczaPRogpAFYs14MMOf51ddxtzffCtS3t6swXEHs"

    const [listUsers, setListUsers] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<null|IUsers>(null)

    const columns: ColumnsType<IUsers> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (value, record) => {
                return (<a>{record.email}</a>)
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: '',
            render: (value, record) => {
                return (<button onClick={() => {
                    setIsUpdateModalOpen(true)
                    setDataUpdate(record)
                }}>Edit</button>)
            }
        },
    ]

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        const res = await fetch("http://localhost:8000/api/v1/users/all",
            {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                }
            })
        const d = await res.json()
        setListUsers(d.data.result)
    }

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h2>HTML Table</h2>
                <div>
                    <Button
                        icon={<PlusCircleOutlined />}
                        type={"primary"}
                        onClick={() => setIsCreateModalOpen(true)}
                    >Add new</Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            />

            <CreateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateUserModal
                access_token={access_token}
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div>
    )
}

export default UserTable