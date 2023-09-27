module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define( "task", {
        userid: { type: DataTypes.INTEGER, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        due_date: { type: DataTypes.DATE},
        status: { type: DataTypes.STRING, defaultValue: "open" }, // open / complete / deleted
        priority: { type: DataTypes.STRING, defaultValue: "normal" }, // low / normal / high

    }, {timestamps: true}, )
    return Task;
};