import { DataTypes, Model, Sequelize } from "sequelize";
import { PersonalInformation } from "../interface/interface";
import { PersonalInformationDTO } from "../service/dto/dto";

export default function PersonalInformationModel(sequelize: Sequelize) {
    const PersonalInformation = sequelize.define<Model<PersonalInformation, PersonalInformationDTO>>(
        'personalInformation',
        {
            personalInformationId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            candidateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            postCode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tel: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lineId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagram: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            facebook: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            accommodation: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dob: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            race: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nationality: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            religion: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            identityCard: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            expirationDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            height: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            weight: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            militaryStatus: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            maritalStatus: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'personalInformation',
            paranoid: true,
            underscored: false,
            timestamps: true,
        }
    );

    return PersonalInformation;
};