import type { Candidate, Education, FamilyInformation, LanguageAbility, PersonalInformation, SiblingInformation, SpecialAbility, WorkExperience } from "./interface";


export interface CreateApplicationRequest {
    candidate: Candidate;
    personalInformation: PersonalInformation;
    familyInformation: FamilyInformationDTO;
    education: Education[];
    workExperience: WorkExperience[];
    languageAbility: LanguageAbility[];
    specialAbility: SpecialAbility;
}

export interface FamilyInformationDTO extends FamilyInformation {
    siblings: SiblingInformation[] | null;
}
