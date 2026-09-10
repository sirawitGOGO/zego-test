import { DataTypes, Model, Sequelize } from "sequelize";
import { SpecialAbility } from "../interface/interface";
import { SpecialAbilityDTO } from "../service/dto/dto";

export default function SpecialAbilityModel(sequelize: Sequelize) {
    const SpecialAbility = sequelize.define<Model<SpecialAbility, SpecialAbilityDTO>>(
        'specialAbility',
        {
            specialAbilityId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            candidateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            typing: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            typingThai: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            typingEng: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            computer: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            computerDetail: {
                type: DataTypes.TEXT, // ใช้ TEXT เพราะรายละเอียดอาจจะยาว
                allowNull: true,
            },
            driving: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            drivingLicenseNo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            officeMachine: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            hobbies: {
                type: DataTypes.TEXT, 
                allowNull: true,
            },
            sport: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            specialKnowledge: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            others: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: 'specialAbility',
            paranoid: true,
            underscored: false,
            timestamps: true,
        }
    );

    return SpecialAbility;
};