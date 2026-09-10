import React from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Row, Col, Divider, Select, Space } from 'antd';
import type { PersonalInformation } from '../interface/interface';

interface PersonalInfoFormProps {
    onFormSubmit: (values: PersonalInformation) => void;
    onBack: () => void;
    isLoading?: boolean;
}

const { TextArea } = Input;

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onFormSubmit, onBack, isLoading }) => {
    const [form] = Form.useForm<PersonalInformation>();

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFormSubmit}
        >
            <Divider orientation="vertical">ข้อมูลที่พักและการติดต่อ</Divider>
            <Row gutter={16}>
                <Col xs={24}>
                    <Form.Item label="ที่อยู่ปัจจุบัน" name="address" rules={[{ required: true, message: 'กรุณากรอกที่อยู่' }]}>
                        <TextArea rows={2} placeholder="บ้านเลขที่, ถนน, ตำบล, อำเภอ, จังหวัด" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="รหัสไปรษณีย์" name="postCode" rules={[{ required: true }]}>
                        <Input placeholder="เช่น 10110" maxLength={5} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="เบอร์โทรศัพท์" name="tel" rules={[{ required: true }]}>
                        <Input placeholder="เช่น 0812345678" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="อีเมล" name="email" rules={[{ required: true, type: 'email' }]}>
                        <Input placeholder="example@email.com" />
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="ลักษณะที่พักอาศัย" name="accommodation" rules={[{ required: true }]}>
                        <Select placeholder="เลือกที่พักอาศัย">
                            <Select.Option value="บ้านส่วนตัว">บ้านส่วนตัว</Select.Option>
                            <Select.Option value="บ้านเช่า">บ้านเช่า</Select.Option>
                            <Select.Option value="หอพัก/อพาร์ตเมนต์">หอพัก/อพาร์ตเมนต์</Select.Option>
                            <Select.Option value="อาศัยกับญาติ">อาศัยกับญาติ</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Line ID" name="lineId">
                        <Input placeholder="ระบุ Line ID" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Facebook" name="facebook">
                        <Input placeholder="ระบุชื่อ Facebook" />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="vertical">ข้อมูลส่วนบุคคล</Divider>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="วัน/เดือน/ปีเกิด" name="dob" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="เลือกวันเกิด" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="เลขบัตรประจำตัวประชาชน" name="identityCard" rules={[{ required: true, len: 13 }]}>
                        <Input placeholder="เลข 13 หลัก" maxLength={13} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="วันหมดอายุบัตรประชาชน" name="expirationDate" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="เลือกวันหมดอายุ" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={6}>
                    <Form.Item label="เชื้อชาติ" name="race" rules={[{ required: true }]}>
                        <Input placeholder="เช่น ไทย" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="สัญชาติ" name="nationality" rules={[{ required: true }]}>
                        <Input placeholder="เช่น ไทย" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="ศาสนา" name="religion" rules={[{ required: true }]}>
                        <Input placeholder="เช่น พุทธ" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="เพศ" name="gender" rules={[{ required: true }]}>
                        <Select placeholder="เลือกเพศ">
                            <Select.Option value="ชาย">ชาย</Select.Option>
                            <Select.Option value="หญิง">หญิง</Select.Option>
                            <Select.Option value="อื่นๆ">อื่นๆ</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={6}>
                    <Form.Item label="ส่วนสูง (ซม.)" name="height" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="น้ำหนัก (กก.)" name="weight" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="สถานภาพสมรส" name="maritalStatus" rules={[{ required: true }]}>
                        <Select placeholder="เลือกสถานภาพ">
                            <Select.Option value="โสด">โสด</Select.Option>
                            <Select.Option value="สมรส">สมรส</Select.Option>
                            <Select.Option value="หย่าร้าง">หย่าร้าง</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="สถานภาพทางทหาร" name="militaryStatus" rules={[{ required: true }]}>
                        <Select placeholder="เลือกสถานภาพ">
                            <Select.Option value="ได้รับการยกเว้น">ได้รับการยกเว้น</Select.Option>
                            <Select.Option value="ผ่านการเกณฑ์แล้ว">ผ่านการเกณฑ์แล้ว</Select.Option>
                            <Select.Option value="ยังไม่ได้รับการเกณฑ์">ยังไม่ได้รับการเกณฑ์</Select.Option>
                            <Select.Option value="หญิง (ไม่ต้องเกณฑ์)">หญิง (ไม่ต้องเกณฑ์)</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item style={{ marginTop: '24px' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button size="large" onClick={onBack}>
                        ย้อนกลับ
                    </Button>
                    <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
                        ถัดไป
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};