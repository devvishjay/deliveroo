const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Customers = db.Customers;

async function register(req, res) {
    const { name, email, password } = req.body;

    try {

        const customer = await Customers.findOne({ where: { email } });

        if (customer) {
            return res.status(401).json({ error: 'Customer already registered!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
       const newCustomer= await Customers.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ customerId: newCustomer.id }, process.env.JWT_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Customer registered successfully',
            token,
            Customers: {
                id: newCustomer.id,
                name: newCustomer.name,
                email: newCustomer.email,
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
        const customer = await Customers.findOne({ where: { email } });

        if (!customer || !(await bcrypt.compare(password, customer.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ customerId: customer.id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({
            message: 'Customers Login successfully',
            token,
            Customers: {
                id: customer.id,
                name: customer.name,
                email: customer.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
        console.log("error",error)
    }
}

async function socialLogin(req, res) {
    const { data} = req.body;
    try {
        const user = await Customers.findOne({ where: { email: data.email } });

        let newUser;
        if (!user) {
             newUser= await Customers.create({
                name: data.name,
                email: data.email,
                password:' ',
            });
             await newUser.save();
        }
        res.status(200).json({
            message: "Social Login successfully",
            user:user || newUser,
           
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
    socialLogin
};
