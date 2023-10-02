const { Op } = require('sequelize');
const db = require('../models');
const Orders = db.Orders;

async function getTotalSalesByTimePeriod() {
    let startDate, endDate;
    const { timePeriod } = req.body;
    if (timePeriod === 'daily') {
        // Calculate the start and end of the current day
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
    } else if (timePeriod === 'weekly') {
        // Calculate the start and end of the current week
        const today = new Date();
        startDate = new Date(today.setDate(today.getDate() - today.getDay()));
        endDate = new Date(today.setDate(today.getDate() + 6));
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
    } else if (timePeriod === 'monthly') {
        // Calculate the start and end of the current month
        const today = new Date();
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
    } else {
        return res.status(400).json({ error: 'Invalid time period specified.' });
    }

    try {
        const totalSales = await Orders.sum('total', {
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        return res.status(200).json(totalSales || 0);
    } catch (error) {
        return res.status(400).json({ error: 'An error occurred while calculating total sales' });

    }
}

async function getAverageOrderValueByTimePeriod(timePeriod) {
    let startDate, endDate;

    if (timePeriod === 'daily') {
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
    } else if (timePeriod === 'weekly') {
        const today = new Date();
        startDate = new Date(today.setDate(today.getDate() - today.getDay()));
        endDate = new Date(today.setDate(today.getDate() + 6));
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
    } else if (timePeriod === 'monthly') {
        const today = new Date();
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
    } else {
        return res.status(400).json({ error: 'Invalid time period specified.' });
    }

    try {
        const orders = await Orders.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const totalValue = orders.reduce((acc, order) => acc + order.total, 0);
        const averageOrderValue =
            orders.length > 0 ? totalValue / orders.length : 0;
        return res.status(200).json(averageOrderValue);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: 'An error occurred while calculating total sales' });
    }
}

module.exports = {
    getTotalSalesByTimePeriod,
    getAverageOrderValueByTimePeriod
};
