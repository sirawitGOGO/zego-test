import { DataTypes, Model, Sequelize } from "sequelize";
import { SiblingInformation } from "../interface/interface";
import { SiblingInformationDTO } from "../service/dto/dto";

export default function SiblingInformationModel(sequelize: Sequelize) {
    const SiblingInformation = sequelize.define<Model<SiblingInformation, SiblingInformationDTO>>(
        'siblingInformation',
        {
            siblingInformationId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            familyInformationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            occupation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'siblingInformation',
            paranoid: true,
            underscored: false,
            timestamps: true,
        }
    );

    return SiblingInformation;
};