module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define("notes", {
    UId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.STRING,
    },
    updateCount: {
      type: DataTypes.INTEGER,
      defaultValue: "0",
    },
  });

  return notes;
};
