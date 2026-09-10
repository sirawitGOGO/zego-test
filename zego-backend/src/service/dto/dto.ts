import { Candidate, Education, FamilyInformation, LanguageAbility, PersonalInformation, SiblingInformation, SpecialAbility, WorkExperience } from "../../interface/interface";

export interface CreateApplicationDTO {
    candidate: CandidateDTO;
    personalInformation: PersonalInformationDTO;
    familyInformation: FamilyInformationDTO;
    education: EducationDTO[];
    workExperience: WorkExperienceDTO[];
    languageAbility: LanguageAbilityDTO[];
    specialAbility: SpecialAbilityDTO;
}

export interface CandidateDTO extends Omit<Candidate, 'candidateId'> { }
export interface PersonalInformationDTO extends Omit<PersonalInformation, 'personalInformationId' | 'candidateId'> { }
export interface FamilyInformationDTO extends Omit<FamilyInformation, 'familyInformationId' | 'candidateId'> {
    siblings: SiblingInformationDTO[] | null;
}

export interface SiblingInformationDTO extends Omit<SiblingInformation, 'siblingInformationId' | 'familyInformationId'> { }
export interface EducationDTO extends Omit<Education, 'educationId' | 'candidateId'> { }
export interface WorkExperienceDTO extends Omit<WorkExperience, 'workExperienceId' | 'candidateId'> { }
export interface LanguageAbilityDTO extends Omit<LanguageAbility, 'languageAbilityId' | 'candidateId'> { }
export interface SpecialAbilityDTO extends Omit<SpecialAbility, 'specialAbilityId' | 'candidateId'> { }
