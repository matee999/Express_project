'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Profesor, Messages}) {
      // define association here
      this.belongsTo(Profesor, {foreignKey: 'profesorId', as: 'profesor'});
      this.hasMany(Messages, { foreignKey: 'subjectId', as: 'messages', onDelete: 'cascade', hooks: true });
    }
  }
  Subject.init({
    name: {
      type: DataTypes.STRING(2048),
      allowNull: false
    },
    espb: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};