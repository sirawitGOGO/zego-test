export interface Candidate {
    fullName: string;
    nickName: string;
    position1: string;
    salary1: number;
    position2: string;
    salary2: number;
    canWorkOvertime: boolean; 
    canWorkUpCountry: boolean;
    others: string | null;
    emergencyPersonName: string;
    emergencyPersonAddress:	string;
    emergencyPersonTel:	string;
    sourceOfJobInformation:	string;
    disease: boolean;
    diseaseDetail: string | null;
    applied: boolean;
    appliedDate: Date | null;
    relativePersonName:	string | null;
}

export interface PersonalInformation {
    address: string;
    postCode: string;
    tel: string;
    lineId:	string | null;
    instagram: string | null;
    email: string;
    facebook: string | null;
    accommodation: string;
    dob: Date;
    race: string;
    nationality: string;
    religion: string;
    identityCard: string;
    expirationDate: Date;
    height: number;
    weight: number;
    militaryStatus: string;
    maritalStatus: string;
    gender:	string;
}

export interface FamilyInformation {
    fatherName:	string;
    fatherAge:	number;
    fatherOccupation: string;
    motherName:	string;
    motherAge: number;
    motherOccupation: string;
    partnerName: string | null;
    partnerWorkPlace: string | null;
    partnerPosition:	string | null;
    numberOfChildren: number | null;
    numberOfSon: number | null;
    numberOfDaughter: number | null;
    numberOfSibling: number | null;
    numberOfBrother: number | null;
    numberOfSister:	number | null;
    birthOrder:	number | null;
}

export interface SiblingInformation {
    fullName: string;
    age: number;
    occupation:	string;
}

export interface Education {
    educationLevel:	string;
    institution: string;
    major: string | null;
    startDate: Date;
    endDate: Date;
}

export interface WorkExperience {
    companyName: string;
    startDate: Date;
    endDate: Date;
    position: string;
    jobDescription:	string;
    salary:	number;
    reasonRegistration:	string | null;
}

export interface LanguageAbility {
    language: string;
    speaking: string;
    writing: string;
    reading: string;
}

export interface SpecialAbility {
    typing:	boolean;
    typingThai:	number | null;
    typingEng: number | null;
    computer: boolean;
    computerDetail:	string | null;
    driving: boolean;
    drivingLicenseNo: string | null;
    officeMachine: string | null;
    hobbies: string | null;
    sport: string | null;
    specialKnowledge: string | null;
    others: string | null;
}