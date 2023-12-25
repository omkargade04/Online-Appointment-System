import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'

function DoctorForm({onFinish, initialValues}) {
    
  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={{
        ...initialValues,
        ...(initialValues && {
            timings: [
                moment(initialValues?.timings[0], "HH:mm"),
                moment(initialValues?.timings[1], "HH:mm"),
            ]
        })
    }}>
            
            <h1 className="card-title mt-3">Personel Information</h1>
            
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="First Name" name="firstName" rules={[{required: true}]}>
                        <Input placeholder="First Name"></Input>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="last Name" name="lastName" rules={[{required: true}]}>
                        <Input placeholder="Last Name"></Input>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Phone Number" name="phoneNumber" rules={[{required: true}]}>
                        <Input placeholder="Phone Number"></Input>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Website" name="website" rules={[{required: true}]}>
                        <Input placeholder="Website"></Input>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Address" name="address" rules={[{required: true}]}>
                        <Input placeholder="Address"></Input>
                    </Form.Item>
                </Col>
            </Row>
            <hr />

            <h1 className="card-title mt-3">Professional Information</h1>

            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Specialization" name="specialization" rules={[{required: true}]}>
                        <Input placeholder="Specialization"></Input>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Experience" name="experience" rules={[{required: true}]}>
                        <Input placeholder="Experience" type="number"></Input>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Fee Per Cunsultation" name="feePerCunsultation" rules={[{required: true}]}>
                        <Input placeholder="Fee Per Cunsultation" type="number"></Input>
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Timings" name="timings" rules={[{required: true}]}>
                    <TimePicker.RangePicker format='HH:mm' />
                    </Form.Item>
                </Col>
                
            </Row>

            <div className="flex justify-content-right">
                {/* <Button className="primary-button">SUBMIT</Button> */}
                <Button className="primary-button" htmlType="submit">SUBMIT</Button>
            </div>

        </Form>
  )
}

export default DoctorForm