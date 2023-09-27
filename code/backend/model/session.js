module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define( "session", {
        userid: { type: DataTypes.INTEGER, unique: true, allowNull: false},
        token: { type: DataTypes.STRING, allowNull: false},
        expires_at: { type: DataTypes.DATE, allowNull: false}
    }, {timestamps: true}, )
    return Session;
};