import { DataTypes, Model, Sequelize } from "sequelize";
import { Candidate } from "../interface/interface";
import { CandidateDTO } from "../service/dto/dto";

export default function CandidateModel(sequelize: Sequelize) {
    const Candidate = sequelize.define<Model<Candidate, CandidateDTO>>(
        'candidate',
        {
            candidateId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nickName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            position1: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            salary1: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            position2: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            salary2: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            canWorkOvertime: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            canWorkUpCountry: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            others: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            emergencyPersonName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            emergencyPersonAddress: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            emergencyPersonTel: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sourceOfJobInformation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            disease: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            diseaseDetail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            applied: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            appliedDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            relativePersonName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'candidate',
            paranoid: true,
            underscored: false,
            timestamps: true,
        }
    );

    return Candidate;
};