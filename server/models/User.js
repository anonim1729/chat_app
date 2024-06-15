import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

userSchema.statics.login = async (email, password) => {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw Error('user does not exists');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect Password');
    }

    return user;
}

userSchema.statics.signup = async (email, password) => {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email format');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is weak (try including atleast one uppercase,lowercase ,special character,number in your password)908');
    }

    const exists = await User.findOne({ email });
    if (exists) {
        throw Error('user already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    return user;
}

export const User = mongoose.model('User', userSchema);