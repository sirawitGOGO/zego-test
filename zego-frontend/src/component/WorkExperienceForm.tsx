import React from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Divider, Space, Card, DatePicker } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { WorkExperience } from '../interface/interface';

const { TextArea } = Input;

export interface WorkExperienceFormValues {
    workExperiences: WorkExperience[];
}

interface WorkExperienceFormProps {
    onFormSubmit: (values: WorkExperienceFormValues) => void;
    onBack: () => void;
    isLoading?: boolean;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ onFormSubmit, onBack, isLoading }) => {
    const [form] = Form.useForm<WorkExperienceFormValues>();

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFormSubmit}
            initialValues={{ workExperiences: [{}] }}
        >
            <Divider orientation="vertical">ประวัติการทำงาน (เริ่มจากที่ทำงานล่าสุด)</Divider>
            
            <Form.List name="workExperiences">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', marginBottom: 24 }}>
                        {fields.map((field, index) => (
                            <Card
                                size="small"
                                title={`ประวัติการทำงานที่ ${index + 1}`}
                                key={field.key}
                                extra={<MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: 'red' }} />}
                            >
                                <Row gutter={16}>
                                    <Col xs={24} md={12}>
                                        <Form.Item label="ชื่อบริษัท" name={[field.name, 'companyName']} rules={[{ required: true }]}>
                                            <Input placeholder="ระบุชื่อบริษัท" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item label="ตำแหน่ง" name={[field.name, 'position']} rules={[{ required: true }]}>
                                            <Input placeholder="ระบุตำแหน่งที่ทำ" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="วันที่เริ่มงาน" name={[field.name, 'startDate']} rules={[{ required: true }]}>
                                            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="เลือกวันที่เริ่มงาน" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="วันที่สิ้นสุด" name={[field.name, 'endDate']} rules={[{ required: true }]}>
                                            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="เลือกวันที่สิ้นสุด" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="เงินเดือน (บาท)" name={[field.name, 'salary']} rules={[{ required: true }]}>
                                            <InputNumber style={{ width: '100%' }} min={0} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24}>
                                        <Form.Item label="รายละเอียดงาน (Job Description)" name={[field.name, 'jobDescription']} rules={[{ required: true }]}>
                                            <TextArea rows={3} placeholder="อธิบายลักษณะงานที่รับผิดชอบ..." />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24}>
                                        <Form.Item label="เหตุผลที่ลาออก" name={[field.name, 'reasonRegistration']}>
                                            <Input placeholder="ระบุเหตุผล (ถ้ามี)" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            เพิ่มประวัติการทำงาน
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