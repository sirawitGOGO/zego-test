import React from 'react';
import { Form, Input, Button, Row, Col, Divider, Space, Card, DatePicker, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { Education } from '../interface/interface'; // ปรับ path ให้ตรงกับที่เก็บ interface

// สร้าง Interface ครอบ Array ไว้ เพื่อให้ Form.List จัดการได้ง่าย
export interface EducationFormValues {
    educations: Education[];
}

interface EducationFormProps {
    onFormSubmit: (values: EducationFormValues) => void;
    onBack: () => void;
    isLoading?: boolean;
}

export const EducationForm: React.FC<EducationFormProps> = ({ onFormSubmit, onBack, isLoading }) => {
    const [form] = Form.useForm<EducationFormValues>();

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFormSubmit}
            // กำหนดให้มีฟอร์มว่าง 1 อันตั้งแต่แรก
            initialValues={{ educations: [{}] }}
        >
            <Divider orientation="vertical">ประวัติการศึกษา (เริ่มจากระดับสูงสุด)</Divider>
            
            <Form.List name="educations">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', marginBottom: 24 }}>
                        {fields.map((field, index) => (
                            <Card
                                size="small"
                                title={`ประวัติการศึกษาที่ ${index + 1}`}
                                key={field.key}
                                // ซ่อนปุ่มลบถ้ามีแค่ 1 รายการ
                                extra={fields.length > 1 ? (
                                    <MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: 'red' }} />
                                ) : null}
                            >
                                <Row gutter={16}>
                                    <Col xs={24} md={12}>
                                        <Form.Item label="ระดับการศึกษา" name={[field.name, 'educationLevel']} rules={[{ required: true }]}>
                                            <Select placeholder="เลือกระดับการศึกษา">
                                                <Select.Option value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น</Select.Option>
                                                <Select.Option value="มัธยมศึกษาตอนปลาย/ปวช.">มัธยมศึกษาตอนปลาย/ปวช.</Select.Option>
                                                <Select.Option value="อนุปริญญา/ปวส.">อนุปริญญา/ปวส.</Select.Option>
                                                <Select.Option value="ปริญญาตรี">ปริญญาตรี</Select.Option>
                                                <Select.Option value="ปริญญาโท">ปริญญาโท</Select.Option>
                                                <Select.Option value="ปริญญาเอก">ปริญญาเอก</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item label="ชื่อสถาบัน" name={[field.name, 'institution']} rules={[{ required: true }]}>
                                            <Input placeholder="ระบุชื่อสถาบัน" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="สาขาวิชา/วิชาเอก" name={[field.name, 'major']}>
                                            <Input placeholder="ระบุสาขาวิชา (ถ้ามี)" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="วันที่เริ่มศึกษา" name={[field.name, 'startDate']} rules={[{ required: true }]}>
                                            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="เลือกวันที่เริ่ม" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="วันที่สำเร็จการศึกษา" name={[field.name, 'endDate']} rules={[{ required: true }]}>
                                            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="เลือกวันที่สิ้นสุด" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            เพิ่มประวัติการศึกษา
                        </Button>
                    </div>
                )}
            </Form.List>

            <Form.Item>
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