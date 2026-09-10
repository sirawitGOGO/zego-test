import React from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Divider, Space, Card } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { FamilyInformationDTO } from '../interface/request';

interface FamilyInfoFormProps {
    onFormSubmit: (values: FamilyInformationDTO) => void;
    onBack: () => void;
    isLoading?: boolean;
}

export const FamilyInfoForm: React.FC<FamilyInfoFormProps> = ({ onFormSubmit, onBack, isLoading }) => {
    const [form] = Form.useForm<FamilyInformationDTO>();

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFormSubmit}
        >
            <Divider orientation="vertical">ข้อมูลบิดา-มารดา</Divider>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="ชื่อ-นามสกุล บิดา" name="fatherName" rules={[{ required: true }]}>
                        <Input placeholder="ระบุชื่อ-นามสกุล" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="อายุ (ปี)" name="fatherAge" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="อาชีพ" name="fatherOccupation" rules={[{ required: true }]}>
                        <Input placeholder="ระบุอาชีพ" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="ชื่อ-นามสกุล มารดา" name="motherName" rules={[{ required: true }]}>
                        <Input placeholder="ระบุชื่อ-นามสกุล" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="อายุ (ปี)" name="motherAge" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="อาชีพ" name="motherOccupation" rules={[{ required: true }]}>
                        <Input placeholder="ระบุอาชีพ" />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="vertical">ข้อมูลคู่สมรส (ถ้ามี)</Divider>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="ชื่อ-นามสกุล คู่สมรส" name="partnerName">
                        <Input placeholder="ระบุชื่อ-นามสกุล (ถ้ามี)" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="สถานที่ทำงาน" name="partnerWorkPlace">
                        <Input placeholder="ระบุสถานที่ทำงาน" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="ตำแหน่ง" name="partnerPosition">
                        <Input placeholder="ระบุตำแหน่ง" />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="vertical">ข้อมูลบุตร</Divider>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="จำนวนบุตรทั้งหมด (คน)" name="numberOfChildren">
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="บุตรชาย (คน)" name="numberOfSon">
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="บุตรสาว (คน)" name="numberOfDaughter">
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="vertical">ข้อมูลพี่น้อง</Divider>
            <Row gutter={16}>
                <Col xs={24} md={6}>
                    <Form.Item label="จำนวนพี่น้องทั้งหมด (คน)" name="numberOfSibling">
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="พี่ชาย/น้องชาย (คน)" name="numberOfBrother">
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="พี่สาว/น้องสาว (คน)" name="numberOfSister">
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="คุณเป็นบุตรคนที่" name="birthOrder">
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>
                </Col>
            </Row>

            {/* ส่วนสำหรับเพิ่มข้อมูลพี่น้องแบบ Dynamic */}
            <Form.List name="siblings">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', marginBottom: 24 }}>
                        {fields.map((field, index) => (
                            <Card
                                size="small"
                                title={`ข้อมูลพี่น้องคนที่ ${index + 1}`}
                                key={field.key}
                                extra={<MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: 'red' }} />}
                            >
                                <Row gutter={16}>
                                    <Col xs={24} md={10}>
                                        <Form.Item label="ชื่อ-นามสกุล" name={[field.name, 'fullName']} rules={[{ required: true }]}>
                                            <Input placeholder="ระบุชื่อ" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={4}>
                                        <Form.Item label="อายุ (ปี)" name={[field.name, 'age']} rules={[{ required: true }]}>
                                            <InputNumber style={{ width: '100%' }} min={0} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={10}>
                                        <Form.Item label="อาชีพ" name={[field.name, 'occupation']} rules={[{ required: true }]}>
                                            <Input placeholder="ระบุอาชีพ" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            เพิ่มรายชื่อพี่น้อง
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