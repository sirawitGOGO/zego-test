import { DataTypes, Model, Sequelize } from "sequelize";
import { LanguageAbility } from "../interface/interface";
import { LanguageAbilityDTO } from "../service/dto/dto";

export default function LanguageAbilityModel(sequelize: Sequelize) {
    const LanguageAbility = sequelize.define<Model<LanguageAbility, LanguageAbilityDTO>>(
        'languageAbility',
        {
            languageAbilityId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            candidateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            language: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            speaking: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            writing: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            reading: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'languageAbility',
            paranoid: true,
            underscored: false,
            timestamps: true,
        }
    );

    return LanguageAbility;
};