import React from 'react';
import { Form, Input, InputNumber, Switch, DatePicker, Button, Row, Col, Divider, Select } from 'antd';
import type { Candidate } from '../interface/interface';

interface CandidateFormProps {
    onFormSubmit: (values: Candidate) => void;
    isLoading?: boolean;
}

const { TextArea } = Input;

export const CandidateForm: React.FC<CandidateFormProps> = ({ onFormSubmit, isLoading }) => {
    const [form] = Form.useForm<Candidate>();

    // ใช้ Form.useWatch เพื่อซ่อน/แสดง ฟิลด์ตามเงื่อนไข
    const hasDisease = Form.useWatch('disease', form);
    const hasApplied = Form.useWatch('applied', form);

    const handleFinish = (values: Candidate) => {
        // ส่งข้อมูลกลับไปให้ App.tsx จัดการต่อ
        onFormSubmit(values);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
                canWorkOvertime: true,
                canWorkUpCountry: true,
                disease: false,
                applied: false,
            }}
        >
            <Divider orientation="vertical">ข้อมูลส่วนตัว (Candidate Information)</Divider>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="ชื่อ-นามสกุล" name="fullName" rules={[{ required: true, message: 'กรุณากรอกชื่อ-นามสกุล' }]}>
                        <Input placeholder="เช่น สมชาย ใจดี" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="ชื่อเล่น" name="nickName" rules={[{ required: true, message: 'กรุณากรอกชื่อเล่น' }]}>
                        <Input placeholder="เช่น สม" />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="vertical">ตำแหน่งที่ต้องการสมัคร</Divider>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="ตำแหน่งอันดับ 1" name="position1" rules={[{ required: true, message: 'กรุณากรอกตำแหน่งที่ 1' }]}>
                        <Input placeholder="เช่น Full Stack Developer" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="เงินเดือนที่ต้องการ (อันดับ 1)" name="salary1" rules={[{ required: true, message: 'กรุณากรอกเงินเดือนที่ต้องการ' }]}>
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="ระบุตัวเลข" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="ตำแหน่งอันดับ 2" name="position2" rules={[{ required: true, message: 'กรุณากรอกตำแหน่งที่ 2' }]}>
                        <Input placeholder="เช่น Backend Developer" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="เงินเดือนที่ต้องการ (อันดับ 2)" name="salary2" rules={[{ required: true, message: 'กรุณากรอกเงินเดือนที่ต้องการ' }]}>
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="ระบุตัวเลข" />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="vertical">ความพร้อมในการทำงาน</Divider>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label="สามารถทำงานล่วงเวลาได้" name="canWorkOvertime" valuePropName="checked">
                        <Switch checkedChildren="ได้" unCheckedChildren="ไม่ได้" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="สามารถไปปฏิบัติงานต่างจังหวัดได้" name="canWorkUpCountry" valuePropName="checked">
                        <Switch checkedChildren="ได้" unCheckedChildren="ไม่ได้" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="แหล่งที่มาของข่าวสารสมัครงาน" name="sourceOfJobInformation" rules={[{ required: true, message: 'กรุณาระบุแหล่งที่มา' }]}>
                        <Select
                            placeholder="เลือกแหล่งที่มา"
                            options={[
                                { value: 'Facebook', label: 'Facebook' },
                                { value: 'LinkedIn', label: 'LinkedIn' },
                                { value: 'JobsDB', label: 'JobsDB' },
                                { value: 'Website', label: 'เว็บไซต์บริษัท' },
                                { value: 'Friend', label: 'คนรู้จักแนะนำ' },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="vertical">ข้อมูลสุขภาพและประวัติการสมัคร</Divider>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="มีโรคประจำตัวร้ายแรงหรือไม่" name="disease" valuePropName="checked">
                        <Switch checkedChildren="มี" unCheckedChildren="ไม่มี" />
                    </Form.Item>
                    {hasDisease && (
                        <Form.Item label="รายละเอียดโรคประจำตัว" name="diseaseDetail" rules={[{ required: true, message: 'กรุณาระบุรายละเอียด' }]}>
                            <Input placeholder="ระบุโรคประจำตัว" />
                        </Form.Item>
                    )}
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="เคยสมัครงานที่นี่มาก่อนหรือไม่" name="applied" valuePropName="checked">
                        <Switch checkedChildren="เคย" unCheckedChildren="ไม่เคย" />
                    </Form.Item>
                    {hasApplied && (
                        <Form.Item label="วันที่เคยสมัคร (โดยประมาณ)" name="appliedDate">
                            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                        </Form.Item>
                    )}
                </Col>
            </Row>

            <Divider orientation="vertical">บุคคลที่ติดต่อได้ในกรณีฉุกเฉิน</Divider>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="ชื่อ-นามสกุล บุคคลติดต่อฉุกเฉิน" name="emergencyPersonName" rules={[{ required: true }]}>
                        <Input placeholder="ระบุชื่อ-นามสกุล" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="เบอร์โทรศัพท์ติดต่อฉุกเฉิน" name="emergencyPersonTel" rules={[{ required: true }]}>
                        <Input placeholder="ระบุเบอร์โทรศัพท์" />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item label="ที่อยู่บุคคลติดต่อฉุกเฉิน" name="emergencyPersonAddress" rules={[{ required: true }]}>
                        <TextArea rows={2} placeholder="ระบุที่อยู่" />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="vertical">ข้อมูลอื่นๆ</Divider>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="มีญาติ/คนรู้จักทำงานที่นี่หรือไม่ (ระบุชื่อ)" name="relativePersonName">
                        <Input placeholder="ระบุชื่อ (ถ้ามี)" />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item label="ข้อมูลอื่นๆ เพิ่มเติม" name="others">
                        <TextArea rows={3} placeholder="ข้อมูลเพิ่มเติมที่อยากให้เราทราบ..." />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" size="large" loading={isLoading} block>
                    ถัดไป
                </Button>
            </Form.Item>
        </Form>
    );
};