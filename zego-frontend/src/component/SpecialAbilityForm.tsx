import React from 'react';
import { Form, Input, InputNumber, Switch, Button, Row, Col, Divider, Space } from 'antd';
import type { SpecialAbility } from '../interface/interface';

interface SpecialAbilityFormProps {
    onFormSubmit: (values: SpecialAbility) => void;
    onBack: () => void;
    isLoading?: boolean;
}

const { TextArea } = Input;

export const SpecialAbilityForm: React.FC<SpecialAbilityFormProps> = ({ onFormSubmit, onBack, isLoading }) => {
    const [form] = Form.useForm<SpecialAbility>();

    // ใช้ Watch เพื่อตรวจสอบสถานะสวิตช์แบบ Real-time
    const canType = Form.useWatch('typing', form);
    const hasComputerSkill = Form.useWatch('computer', form);
    const canDrive = Form.useWatch('driving', form);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFormSubmit}
            initialValues={{
                typing: false,
                computer: false,
                driving: false,
            }}
        >
            <Divider orientation="vertical">ความสามารถพิเศษ (Special Abilities)</Divider>
            
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="พิมพ์ดีดได้หรือไม่" name="typing" valuePropName="checked">
                        <Switch checkedChildren="ได้" unCheckedChildren="ไม่ได้" />
                    </Form.Item>
                </Col>
                {canType && (
                    <>
                        <Col xs={24} md={8}>
                            <Form.Item label="พิมพ์ไทย (คำ/นาที)" name="typingThai" rules={[{ required: true, message: 'โปรดระบุคำ/นาที' }]}>
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label="พิมพ์อังกฤษ (คำ/นาที)" name="typingEng" rules={[{ required: true, message: 'โปรดระบุคำ/นาที' }]}>
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                    </>
                )}
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="ความสามารถทางคอมพิวเตอร์" name="computer" valuePropName="checked">
                        <Switch checkedChildren="มี" unCheckedChildren="ไม่มี" />
                    </Form.Item>
                </Col>
                {hasComputerSkill && (
                    <Col xs={24} md={16}>
                        <Form.Item label="รายละเอียด (โปรแกรมที่ถนัด)" name="computerDetail" rules={[{ required: true }]}>
                            <Input placeholder="เช่น Microsoft Office, Photoshop, VS Code" />
                        </Form.Item>
                    </Col>
                )}
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="ขับรถยนต์ได้หรือไม่" name="driving" valuePropName="checked">
                        <Switch checkedChildren="ได้" unCheckedChildren="ไม่ได้" />
                    </Form.Item>
                </Col>
                {canDrive && (
                    <Col xs={24} md={16}>
                        <Form.Item label="เลขที่ใบอนุญาตขับขี่" name="drivingLicenseNo" rules={[{ required: true }]}>
                            <Input placeholder="ระบุเลขที่ใบขับขี่" />
                        </Form.Item>
                    </Col>
                )}
            </Row>

            <Divider orientation="vertical">งานอดิเรกและความสามารถอื่นๆ</Divider>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="เครื่องใช้สำนักงานที่ใช้งานได้" name="officeMachine">
                        <Input placeholder="เช่น เครื่องถ่ายเอกสาร, เครื่องสแกนเนอร์" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="กีฬาที่ชอบ" name="sport">
                        <Input placeholder="เช่น ฟุตบอล, แบดมินตัน" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="งานอดิเรก" name="hobbies">
                        <TextArea rows={2} placeholder="ระบุงานอดิเรก" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="ความรู้พิเศษอื่นๆ" name="specialKnowledge">
                        <TextArea rows={2} placeholder="ความรู้พิเศษที่เกี่ยวข้องกับตำแหน่งงาน" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24}>
                    <Form.Item label="รายละเอียดอื่นๆ เพิ่มเติม" name="others">
                        <TextArea rows={2} placeholder="ข้อมูลเพิ่มเติมที่อยากให้เราทราบ..." />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item style={{ marginTop: '24px' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button size="large" onClick={onBack}>
                        ย้อนกลับ
                    </Button>
                    <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
                        บันทึกใบสมัครงานทั้งหมด
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};