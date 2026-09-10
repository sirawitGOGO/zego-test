
# Project Idea

#### สรุปกระบวนการคิด

ผมแยกแต่ละส่วนในใบสมัครงานให้ออกเป็นตารางข้อมูล จากนั้นก็เริ่ม Design Database และข้อมูลในแต่ละตารางก็อิงมาจากส่วนที่ต้องกรอกในใบสมัครงาน และโยงความสัมพันธ์ให้ตรงกัน พอได้ Database ที่เหมาะสมแล้วก็เริ่มเขียน API สมัครงาน โดยต้องการให้มีการส่งข้อมูล 1 Request ที่เป็น JSON แบบรวมข้อมูลทุกตารางเพื่อไปบันทึกข้อมูลลงฐานข้อมูลทุกตารางได้เลย เมื่อได้ API แล้วก็สร้างหน้าเว็บโดยแบ่งฟอร์มแต่ละส่วนเป็น Component โดยที่ 1 Component แทน 1 ตาราง เพื่อให้ฟอร์มการสมัครเป็นแบบ Multi-step Form กรอกให้ครบทุกฟอร์มแล้วถึงจะบันทึกข้อมูลลง Database ได้


## Database

ใช้ PostgreSQL มีตารางประกอบด้วย

- candidate (ข้อมูลตำแหน่ง)
- personalInformation (ข้อมูลส่วนตัว)
- familyInformation (ข้อมูลครอบครัว)
- education (ประวัติการศึกษา)
- workExperience (ประวัติการทำงาน)
- languageAbility (ความสามารถทางภาษา)
- specialAbility (ความสามารถพิเศษ)
- siblingInformation (ข้อมูลพี่น้อง เป็นส่วนหนึ่งของข้อมูลครอบครัว)

โดยจำแนกความสัมพันธ์ของแต่ละตารางดังนี้

#### one to one

- candidate - personalInformation
- candidate - familyInformation
- candidate - specialAbility

#### one to many

- candidate - education
- candidate - workExperience
- candidate - languageAbility
- familyInformation - siblingInformation
## Backend

ใช้ Node.js, Typescript และ Sequelize ORM และมี API 1 เส้น และเนื่องจากการส่งข้อมูลต้องส่งข้อมูลของทุกตารางเพื่อบันทึกข้อมูลในรอบเดียว จึงมีการใช้ `sequelize.transaction()` ครอบการทำงานทั้งหมด หากมีตารางไหนบันทึกไม่สำเร็จ ระบบจะสั่ง rollback() พาข้อมูลทั้งหมดกลับไปจุดเริ่มต้นทันที ไม่มีการบันทึกข้อมูลเกิดขึ้น แต่ถ้าผ่านทั้งหมดถึงจะสั่ง commit() บันทึกข้อมูลทั้งหมด

โครงสร้างส่วน Backend และหน้าที่ของแต่ละส่วน
```
src/
 ┣ database/
 ┃ ┗ database.ts             # ตั้งค่าการเชื่อมต่อ PostgreSQL และ Sequelize
 ┣ interface/
 ┃ ┣ interface.ts            # Interface ของตาราง
 ┃ ┗ dto.ts                  # Data Transfer Objects (Payload ของ API)
 ┣ models/
 ┃ ┣ candidate.model.ts      # ตารางหลัก (Primary Table)
 ┃ ┣ personalInformation.model.ts
 ┃ ┣ familyInformation.model.ts
 ┃ ┣ siblingInformation.model.ts
 ┃ ┣ education.model.ts
 ┃ ┣ workExperience.model.ts
 ┃ ┣ languageAbility.model.ts
 ┃ ┗ specialAbility.model.ts
 ┃ ┗ index.ts                # Associate ตารางต่าง ๆ
 ┣ service/
 ┃ ┗ service.ts              # Business logic
 ┣ controller/
 ┃ ┗ controller.ts           # จัดการ Req/Res
 ┣ routes/
 ┃ ┗ route.ts                # กำหนด API Endpoint
 ┗ server.ts                 
```

#### API บันทึกข้อมูลการสมัครงาน

```http
  POST /api/appliappliedJob
```

Request body

```json
{
    candidate: CandidateData;
    personalInformation: PersonalInformationData;
    familyInformation: {
        FamilyInformation,
        siblings: SiblingInformationData[]
    };
    education: EducationData[];
    workExperience: WorkExperienceData[];
    languageAbility: LanguageAbilityData[];
    specialAbility: SpecialAbilityData;
}
```

## Frontend

ใช้ React, TypeScript, Ant Design และ React Query และจาก Request body ที่ Backend ต้องการมีการส่งข้อมูลมาเยอะจึงต้องสร้างฟอร์มการสมัครให้เป็นแบบ Multi-step Form หรือก็คือกรอกข้อมูลสั้นๆ แต่แบ่งเป็นหลายส่วนตามตารางในฐานข้อมูล เพื่อไม่ให้ผู้ใช้ต้องกรอกข้อมูลเยอะในหน้าเดียว หรือไม่ให้ผู้ใช้งานต้องกรอกข้อมูลทุกอย่างในหน้าเดียว

โครงสร้างส่วน Frontend และหน้าที่ของแต่ละส่วน

```
src/
 ┣ interface/
 ┃ ┣ interface.ts       # เก็บ Interface พื้นฐานที่ตรงกับฐานข้อมูล (Candidate, Education ฯลฯ)
 ┃ ┗ request.ts         # เก็บ DTO สำหรับสร้าง Payload ก่อนยิง API
 ┣ service/
 ┃ ┣ api/
 ┃ ┃ ┗ submitApplication.ts  # ฟังก์ชันยิง API ด้วย Axios สำหรับ API บันทึกการสมัครงาน
 ┃ ┗ hook/
 ┃   ┗ useApplyJob.ts        # React Query (useMutation) จัดการ Loading/Error/Success
 ┣ component/
 ┃ ┣ CandidateForm.tsx       # Step 1: ข้อมูลตำแหน่ง
 ┃ ┣ PersonalInfoForm.tsx    # Step 2: ข้อมูลส่วนตัว
 ┃ ┣ FamilyInfoForm.tsx      # Step 3: ข้อมูลครอบครัว (Dynamic พี่น้อง)
 ┃ ┣ EducationForm.tsx       # Step 4: ประวัติการศึกษา (Dynamic)
 ┃ ┣ WorkExperienceForm.tsx  # Step 5: ประวัติการทำงาน (Dynamic)
 ┃ ┣ LanguageAbilityForm.tsx # Step 6: ความสามารถทางภาษา (Dynamic)
 ┃ ┗ SpecialAbilityForm.tsx  # Step 7: ความสามารถพิเศษ
 ┗ App.tsx                   # ควบคุม Flow ของฟอร์มทั้งหมด
```

ขั้นตอนการทำงานของส่วน Frontend

- ผู้ใช้กรอกฟอร์มทีละหน้า เมื่อกด "ถัดไป" จะเข้าสู่ฟังก์ชัน onFormSubmit

- App.tsx รับข้อมูลจากฟอร์มมาเก็บไว้ใน State ของตัวเอง และเพิ่มค่า currentStep + 1 เพื่อเปลี่ยนหน้า UI เป็น Component Form

- ผู้ใช้กรอกฟอร์มความสามารถพิเศษส่วนสุดท้าน และกด "บันทึกใบสมัครงานทั้งหมด"

- App.tsx เช็คว่า State ตั้งแต่หน้า 1-6 มีครบถ้วนหรือไม่

- วนลูปแปลงวันที่ใน Object และ Array จาก Day.js เป็น Date เนื่องจาก Date Input ของ Antd เก็บข้อมูลเวลาเป็น Day.js จึงต้องแปลงให้เป็น Date ก่อน

- โยน Payload ของข้อมูลเข้า mutate(payload) ของ React Query

- เมื่อ Backend ตอบกลับว่าสำเร็จ Hook จะแจ้งเตือน และล้างข้อมูลทั้งหมดของทุกฟอร์ม และพาผู้ใช้กลับไปหน้าแรก