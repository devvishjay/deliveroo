const Sequelize = require('sequelize');
const db = require('../models');
const { generateOrderID } = require('../utils/orderIDGenarate');
const Customers = db.Customers;
const Orders = db.Orders;
const Users = db.Users;


// --------------  order ----------------
async function createOrder(req, res) {
    const { customerId } = req.user;
    try {
        if(customerId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const { address, city, items, total, discount, restaurantId } = req.body;

        const userFind = await Customers.findOne({ where: { id: customerId } });
        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!.' });
        }
        const lastOrder = await Orders.findOne({
            attributes: [
                [Sequelize.fn('MAX', Sequelize.col('orderId')), 'lastOrderID'],
            ],
        });
        // Generate the next order ID
        const nextOrderID = generateOrderID(lastOrder.dataValues.lastOrderID || 'OD000000');

        const newOrder = await Orders.create({
            orderId: nextOrderID,
            customerId: customerId,
            address,
            city,
            items,
            total,
            discount,
            restaurantId
        });
        io.emit('new-order', newOrder);
        return res.status(200).json({ message: 'Order created successfully', data: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Create order failed' });
    }
}


async function readOrdersOfRestaurant(req, res) {
    const { userId } = req.user;
    try {
      if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await Users.findOne({ where: { id: userId } });
        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!.' });
        }
        const orders = await Orders.findAll({
            where:{
                restaurantId: req.params.id
            }
        });
        
        return res.status(200).json({ message: 'Orders fetch successfully', data: orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Fetch orders failed' });
    }
}

async function readOrdersOfCustomer(req, res) {
    const { customerId } = req.user;
    try {
        if(customerId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await Customers.findOne({ where: { id: customerId } });
        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!.' });
        }
        const orders = await Orders.findAll({
            where:{
                customerId
            }
        });
        
        return res.status(200).json({ message: 'Orders fetch successfully', data: orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Fetch orders failed' });
    }
}



// Update the status of an order
async function updateOrderStatus (req, res){
    const { userId } = req.user;

  try {
    const { orderId, status } = req.body;
    if(userId === undefined){
        return res.status(403).json({ error: 'Invalid Access!' });
    }

    const userFind = await Users.findOne({ where: { id: userId } });
    if (!userFind) {
        return res.status(400).json({ error: 'User Not Found!.' });
    }

    const order = await Orders.findOne({
      where: { orderId },
    });
    console.log("order", order)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    const updateData= await order.save();
    console.log("order Save", order)

    return res.status(200).json({ message: 'Order status updated successfully', data:updateData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Update order status failed' });
  }
};


module.exports = { createOrder, readOrdersOfRestaurant, readOrdersOfCustomer, updateOrderStatus }