import React from 'react';
import { Form, Input, Button, Row, Col, Divider, Space, Card, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { LanguageAbility } from '../interface/interface';

export interface LanguageAbilityFormValues {
    languageAbilities: LanguageAbility[];
}

interface LanguageAbilityFormProps {
    onFormSubmit: (values: LanguageAbilityFormValues) => void;
    onBack: () => void;
    isLoading?: boolean;
}

export const LanguageAbilityForm: React.FC<LanguageAbilityFormProps> = ({ onFormSubmit, onBack, isLoading }) => {
    const [form] = Form.useForm<LanguageAbilityFormValues>();

    // ตัวเลือกสำหรับระดับความสามารถ
    const proficiencyOptions = [
        { value: 'ดีมาก', label: 'ดีมาก (Excellent)' },
        { value: 'ดี', label: 'ดี (Good)' },
        { value: 'พอใช้', label: 'พอใช้ (Fair)' },
        { value: 'พื้นฐาน', label: 'พื้นฐาน (Basic)' },
    ];

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFormSubmit}
            initialValues={{ languageAbilities: [{}] }}
        >
            <Divider orientation="vertical">ความสามารถทางภาษา (Language Ability)</Divider>
            
            <Form.List name="languageAbilities">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', marginBottom: 24 }}>
                        {fields.map((field, index) => (
                            <Card
                                size="small"
                                title={`ภาษาที่ ${index + 1}`}
                                key={field.key}
                                extra={<MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: 'red' }} />}
                            >
                                <Row gutter={16}>
                                    <Col xs={24}>
                                        <Form.Item label="ภาษา (Language)" name={[field.name, 'language']} rules={[{ required: true }]}>
                                            <Input placeholder="เช่น ภาษาอังกฤษ, ภาษาญี่ปุ่น" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="การพูด (Speaking)" name={[field.name, 'speaking']} rules={[{ required: true }]}>
                                            <Select placeholder="เลือกระดับ" options={proficiencyOptions} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="การอ่าน (Reading)" name={[field.name, 'reading']} rules={[{ required: true }]}>
                                            <Select placeholder="เลือกระดับ" options={proficiencyOptions} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="การเขียน (Writing)" name={[field.name, 'writing']} rules={[{ required: true }]}>
                                            <Select placeholder="เลือกระดับ" options={proficiencyOptions} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            เพิ่มภาษา
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