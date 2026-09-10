import React, { useState } from 'react';
import { Card, Layout, Typography, Steps } from 'antd';
import { useApplyJob } from './service/hook/useApplyJob';
import type { CreateApplicationRequest, FamilyInformationDTO } from './interface/request';
import dayjs from 'dayjs';
import type { Candidate, PersonalInformation, SpecialAbility } from './interface/interface';
import { CandidateForm } from './component/CandidateForm';
import { PersonalInfoForm } from './component/PersonalInfoForm';
import { FamilyInfoForm } from './component/FamilyInfoForm';
import { EducationForm, type EducationFormValues } from './component/EducationForm';
import { WorkExperienceForm, type WorkExperienceFormValues } from './component/WorkExperienceForm';
import { LanguageAbilityForm, type LanguageAbilityFormValues } from './component/LanguageAbilityForm';
import { SpecialAbilityForm } from './component/SpecialAbilityForm';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [candidateData, setCandidateData] = useState<Candidate | null>(null);
  const [personalInfoData, setPersonalInfoData] = useState<PersonalInformation | null>(null);
  const [familyInfoData, setFamilyInfoData] = useState<FamilyInformationDTO | null>(null);
  const [educationData, setEducationData] = useState<EducationFormValues | null>(null);
  const [workExperienceData, setWorkExperienceData] = useState<WorkExperienceFormValues | null>(null);
  const [languageAbilityData, setLanguageAbilityData] = useState<LanguageAbilityFormValues | null>(null);

  const { mutate, isPending } = useApplyJob();

  const resetAllForms = () => {
    setCandidateData(null);
    setPersonalInfoData(null);
    setFamilyInfoData(null);
    setEducationData(null);
    setWorkExperienceData(null);
    setLanguageAbilityData(null);
    setCurrentStep(0);
  };

  const handleCandidateSubmit = (values: Candidate) => {
    setCandidateData(values);
    setCurrentStep(1);
  };

  const handlePersonalSubmit = (values: PersonalInformation) => {
    setPersonalInfoData(values);
    setCurrentStep(2);
  };

  const handleFamilySubmit = (values: FamilyInformationDTO) => {
    setFamilyInfoData(values);
    setCurrentStep(3);
  };

  const handleEducationSubmit = (values: EducationFormValues) => {
    setEducationData(values);
    setCurrentStep(4);
  };

  const handleWorkExperienceSubmit = (values: WorkExperienceFormValues) => {
    setWorkExperienceData(values);
    setCurrentStep(5);
  };

  const handleLanguageAbilitySubmit = (values: LanguageAbilityFormValues) => {
    setLanguageAbilityData(values);
    setCurrentStep(6);
  };

  const handleSpecialAbilitySubmit = (values: SpecialAbility) => {
    if (!candidateData || !personalInfoData || !familyInfoData || !educationData || !workExperienceData || !languageAbilityData) {
      console.error("ข้อมูลหน้าก่อนหน้าสูญหาย กรุณากรอกให้ครบถ้วน");
      alert("เกิดข้อผิดพลาด: ข้อมูลบางส่วนสูญหาย กรุณาย้อนกลับไปตรวจสอบ");
      return;
    }

    const formattedCandidate = {
      ...candidateData,
      appliedDate: candidateData.appliedDate ? (candidateData.appliedDate as unknown as dayjs.Dayjs).toDate() : null,
    };

    const formattedPersonalInfo = {
      ...personalInfoData,
      dob: (personalInfoData.dob as unknown as dayjs.Dayjs).toDate(),
      expirationDate: (personalInfoData.expirationDate as unknown as dayjs.Dayjs).toDate(),
    };

    const formattedEducation = educationData.educations.map(edu => ({
      ...edu,
      startDate: (edu.startDate as unknown as dayjs.Dayjs).toDate(),
      endDate: (edu.endDate as unknown as dayjs.Dayjs).toDate(),
    }));

    const formattedWorkExperience = (workExperienceData.workExperiences || []).map(work => ({
      ...work,
      startDate: (work.startDate as unknown as dayjs.Dayjs).toDate(),
      endDate: (work.endDate as unknown as dayjs.Dayjs).toDate(),
    }));

    const payload: CreateApplicationRequest = {
      candidate: formattedCandidate,
      personalInformation: formattedPersonalInfo,
      familyInformation: familyInfoData,
      education: formattedEducation,
      workExperience: formattedWorkExperience,
      languageAbility: languageAbilityData.languageAbilities || [],
      specialAbility: values,
    };

    mutate(payload, {
      onSuccess: () => {
        alert("ส่งใบสมัครเรียบร้อยแล้ว");
        resetAllForms();
      },
      onError: (error) => {
        console.error("Error submitting application:", error);
        alert("เกิดข้อผิดพลาดในการส่งใบสมัคร กรุณาลองใหม่อีกครั้ง");
      }
    });
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const steps = [
    {
      title: 'ข้อมูลตำแหน่ง',
      content: <CandidateForm onFormSubmit={handleCandidateSubmit} />,
    },
    {
      title: 'ข้อมูลส่วนตัว',
      content: <PersonalInfoForm onFormSubmit={handlePersonalSubmit} onBack={handleBack} />,
    },
    {
      title: 'ข้อมูลครอบครัว',
      content: <FamilyInfoForm onFormSubmit={handleFamilySubmit} onBack={handleBack} />,
    },
    {
      title: 'ประวัติการศึกษา',
      content: <EducationForm onFormSubmit={handleEducationSubmit} onBack={handleBack} />,
    },
    {
      title: 'ประวัติการทำงาน',
      content: <WorkExperienceForm onFormSubmit={handleWorkExperienceSubmit} onBack={handleBack} />,
    },
    {
      title: 'ความสามารถทางภาษา',
      content: <LanguageAbilityForm onFormSubmit={handleLanguageAbilitySubmit} onBack={handleBack} />,
    },
    {
      title: 'ความสามารถพิเศษ',
      content: <SpecialAbilityForm
        onFormSubmit={handleSpecialAbilitySubmit}
        onBack={handleBack}
        isLoading={isPending}
      />,
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          ระบบรับสมัครงานออนไลน์
        </Title>
      </Header>

      <Content style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <div style={{ width: '100%', maxWidth: '1000px', marginBottom: '24px', overflowX: 'auto' }}>
          <Steps current={currentStep} items={steps.map(item => ({ title: item.title }))} size="small" responsive={true} />
        </div>

        <Card
          title={steps[currentStep].title}
          style={{ width: '100%', maxWidth: '900px' }}
        >
          {steps[currentStep].content}
        </Card>

      </Content>
    </Layout>
  );
};

export default App;