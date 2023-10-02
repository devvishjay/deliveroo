const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.Users;

async function register(req, res) {
    const { name, email, password } = req.body;

    try {

        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(401).json({ error: 'User already registered!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
       const newUser= await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Registration failed' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({
            message: 'User Login successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
        console.log("error",error)
    }
}

module.exports = {
    register,
    login,
};
