import { useState } from "react"
import { Modal, Input, notification, Form, Button, Select, InputNumber } from 'antd';
const { Option } = Select;

interface IProps {
    access_token: string
    getData: any
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (v: boolean) => void
}

const CreateUserModal = (props: IProps) => {

    const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen } = props

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("")

    const handleOk = async () => {
        const data = { name, email, password, age, gender, address, role }
        const res = await fetch("http://localhost:8000/api/v1/users",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data })
            })
        const d = await res.json()
        if (d.data) {
            await getData()
            notification.success({
                message: "Tạo mới user thành công"
            })
            handleClose()
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message)
            })
        }
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const handleClose = () => {
        setIsCreateModalOpen(false)
        setName("")
        setEmail("")
        setPassword("")
        setGender("")
        setAge("")
        setAddress("")
        setRole("")
    }

    return (
        <Modal
            title="Add new users"
            open={isCreateModalOpen}
            onOk={handleOk}
            onCancel={handleClose}
            maskClosable={false}>

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                    <Input placeholder="Input your Name" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input placeholder="Input your Email" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password placeholder="Input your Password" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'Please input your Age!' }]}
                >
                    <InputNumber placeholder="Input your Age number" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "5px" }}
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please input your Role!' }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your Address!' }]}
                >
                    <Input placeholder="Input your Address" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "5px" }}
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please input your Role!' }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="user">user</Option>
                        <Option value="admin">admin</Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            {/* <div>
                <label>Name:</label>
                <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <Input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <Input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <label>Age:</label>
                <Input
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                />
            </div>
            <div>
                <label>Gender:</label>
                <Input
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                />
            </div>
            <div>
                <label>Address:</label>
                <Input
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </div>
            <div>
                <label>Role:</label>
                <Input
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                />
            </div> */}
        </Modal>
    )
}

export default CreateUserModal