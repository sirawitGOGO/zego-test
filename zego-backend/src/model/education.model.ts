import { DataTypes, Model, Sequelize } from "sequelize";
import { Education } from "../interface/interface";
import { EducationDTO } from "../service/dto/dto";

export default function EducationModel(sequelize: Sequelize) {
    const Education = sequelize.define<Model<Education, EducationDTO>>(
        'education',
        {
            educationId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            candidateId: { 
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            educationLevel: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            institution: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            major: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            startDate: {
                type: DataTypes.DATE, 
                allowNull: false,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: 'education',
            paranoid: true,
            underscored: false,
            timestamps: true,
        }
    );

    return Education;
};