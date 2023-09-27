module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define( "user", {
        username: { type: DataTypes.STRING, allowNull: false},
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true, //checks for email format
            },
            allowNull: false
        },
        password: { type: DataTypes.STRING, allowNull: false },
        avatar: { type: DataTypes.STRING}
    }, {timestamps: true}, )
    return User;
};