import { DataTypes, Model, Sequelize } from "sequelize";
import { WorkExperience } from "../interface/interface";
import { WorkExperienceDTO } from "../service/dto/dto";

export default function WorkExperienceModel(sequelize: Sequelize) {
    const WorkExperience = sequelize.define<Model<WorkExperience, WorkExperienceDTO>>(
        'workExperience',
        {
            workExperienceId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            candidateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            companyName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            jobDescription: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            salary: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            reasonRegistration: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: 'workExperience',
            paranoid: true,
            underscored: false,
            timestamps: true,
        }
    );

    return WorkExperience;
};