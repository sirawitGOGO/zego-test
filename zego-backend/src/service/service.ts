import db from '../database/database';
import { CandidateDTO, CreateApplicationDTO, EducationDTO, FamilyInformationDTO, LanguageAbilityDTO, PersonalInformationDTO, SiblingInformationDTO, SpecialAbilityDTO, WorkExperienceDTO } from './dto/dto';

const service = {
    createApplication: async (data: CreateApplicationDTO) => {
        const t = await db.sequelize.transaction();

        try {
            const newCandidate = await db.CandidateModel.create(
                data.candidate as CandidateDTO, 
                { transaction: t }
            );
            
            const candidateId = newCandidate.get('candidateId') as number;

            // 2. สร้าง Personal Information
            await db.PersonalInformationModel.create(
                {
                    ...data.personalInformation,
                    candidateId: candidateId,
                } as PersonalInformationDTO,
                { transaction: t }
            );

            const { siblings, ...familyData } = data.familyInformation;
            
            const newFamilyInfo = await db.FamilyInformationModel.create(
                {
                    ...familyData,
                    candidateId: candidateId,
                } as FamilyInformationDTO extends Omit<'siblings', 'familyInformationId' | 'candidateId'> ? FamilyInformationDTO : never,
                { transaction: t }
            );

            // ถ้ามีข้อมูลพี่น้อง ให้บันทึกแบบ Bulk
            if (siblings && siblings.length > 0) {
                const familyInformationId = newFamilyInfo.get('familyInformationId') as number;
                const siblingsData = siblings.map(sibling => ({
                    ...sibling,
                    familyInformationId: familyInformationId,
                }));

                await db.SiblingInformationModel.bulkCreate(siblingsData as SiblingInformationDTO[], { transaction: t });
            }

            // 4. สร้าง Education แบบ Bulk
            if (data.education && data.education.length > 0) {
                const educationData = data.education.map(edu => ({
                    ...edu,
                    candidateId: candidateId,
                }));
                await db.EducationModel.bulkCreate(educationData as EducationDTO[], { transaction: t });
            }

            // 5. สร้าง Work Experience แบบ Bulk
            if (data.workExperience && data.workExperience.length > 0) {
                const workExpData = data.workExperience.map(work => ({
                    ...work,
                    candidateId: candidateId,
                }));
                await db.WorkExperienceModel.bulkCreate(workExpData as WorkExperienceDTO[], { transaction: t });
            }

            // 6. สร้าง Language Ability แบบ Bulk
            if (data.languageAbility && data.languageAbility.length > 0) {
                const languageData = data.languageAbility.map(lang => ({
                    ...lang,
                    candidateId: candidateId,
                }));
                await db.LanguageAbilityModel.bulkCreate(languageData as LanguageAbilityDTO[], { transaction: t });
            }

            // 7. สร้าง Special Ability
            await db.SpecialAbilityModel.create(
                {
                    ...data.specialAbility,
                    candidateId: candidateId,
                } as SpecialAbilityDTO,
                { transaction: t }
            );

            await t.commit();
            
            return {
                status: 'success',
                message: 'Application created successfully',
                candidateId: candidateId
            };

        } catch (error) {
            await t.rollback();
            console.error('Error creating application transaction:', error);
            throw new Error('Failed to create application');
        }
    }
}

export default service;