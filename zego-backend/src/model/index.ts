import { Sequelize } from "sequelize";
import CandidateModel from "./candidate.model";
import PersonalInformationModel from "./personalInformation.model";
import FamilyInformationModel from "./familyInformation.model";
import SiblingInformationModel from "./siblingInformation.model";
import EducationModel from "./education.model";
import WorkExperienceModel from "./workExperience.model";
import LanguageAbilityModel from "./languageAbility.model";
import SpecialAbilityModel from "./specialAbility.model";

export default function initModel(sequelize: Sequelize) {
    const model = {
        CandidateModel: CandidateModel(sequelize),
        PersonalInformationModel: PersonalInformationModel(sequelize),
        FamilyInformationModel: FamilyInformationModel(sequelize),
        SiblingInformationModel: SiblingInformationModel(sequelize),
        EducationModel: EducationModel(sequelize),
        WorkExperienceModel: WorkExperienceModel(sequelize),
        LanguageAbilityModel: LanguageAbilityModel(sequelize),
        SpecialAbilityModel: SpecialAbilityModel(sequelize),
    };

    CandidateModel(sequelize).hasOne(PersonalInformationModel(sequelize), { foreignKey: 'candidateId' });
    CandidateModel(sequelize).hasOne(FamilyInformationModel(sequelize), { foreignKey: 'candidateId' });
    FamilyInformationModel(sequelize).hasMany(SiblingInformationModel(sequelize), { foreignKey: 'familyInformationId' });
    CandidateModel(sequelize).hasMany(EducationModel(sequelize), { foreignKey: 'candidateId' });
    CandidateModel(sequelize).hasMany(WorkExperienceModel(sequelize), { foreignKey: 'candidateId' });
    CandidateModel(sequelize).hasMany(LanguageAbilityModel(sequelize), { foreignKey: 'candidateId' });
    CandidateModel(sequelize).hasOne(SpecialAbilityModel(sequelize), { foreignKey: 'candidateId' });

    return model;
}