import { DataTypes, Model, Sequelize } from "sequelize";
import { FamilyInformation } from "../interface/interface";

export default function FamilyInformationModel(sequelize: Sequelize) {
    const FamilyInformation = sequelize.define<Model<FamilyInformation, FamilyInformation>>(
        'familyInformation',
        {
            familyInformationId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            candidateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fatherName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fatherAge: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fatherOccupation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            motherName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            motherAge: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            motherOccupation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            partnerName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            partnerWorkPlace: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            partnerPosition: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            numberOfChildren: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            numberOfSon: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            numberOfDaughter: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            numberOfSibling: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            numberOfBrother: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            numberOfSister: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            birthOrder: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'familyInformation',
            paranoid: true,
            underscored: false,
            timestamps: true,
        }
    );

    return FamilyInformation;
};