import { useEffect } from "react"
import { Modal, Input, notification, Form, InputNumber, Select } from 'antd';
import { IUsers } from "./users.table";
const { Option } = Select;

interface IProps {
    access_token: string
    getData: any
    isUpdateModalOpen: boolean
    setIsUpdateModalOpen: (v: boolean) => void
    dataUpdate: null | IUsers
    setDataUpdate: any
}

const UpdateUserModal = (props: IProps) => {

    const { access_token, getData, isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                password: dataUpdate.password,
                age: dataUpdate.age,
                gender: dataUpdate.gender,
                address: dataUpdate.address,
                role: dataUpdate.role,

            })
        }
    }, [dataUpdate])

    const onFinish = async (values: any) => {
        const { name, email, age, gender, address, role } = values
        const data = {
            _id: dataUpdate?._id,
            name, email, age, gender, address, role
        }
        const res = await fetch("http://localhost:8000/api/v1/users",
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
        const d = await res.json()
        if (d.data) {
            await getData()
            notification.success({
                message: "Cập nhật thông tin thành công"
            })
            handleClose()
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message)
            })
        }
    };

    const [form] = Form.useForm()

    const handleClose = () => {
        setIsUpdateModalOpen(false)
        form.resetFields()
        setDataUpdate(null)
    }

    return (
        <Modal
            title="Update a user"
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={handleClose}
            maskClosable={false}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                form={form}
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
                    rules={[{ required: (dataUpdate ? false : true), message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        disabled={dataUpdate ? true : false}
                    />
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
            </Form>

        </Modal>
    )
}

export default UpdateUserModal