const db = require('../models');

const User = db.Users;
const Restaurant = db.Restaurants;



async function createRestaurant(req, res) {
  const { name, openTime, closeTime, address, city, country, longitude, latitude, deliveryRatePerMile } = req.body;
  const {userId} = req.user;
  try {
    if(userId === undefined){
      return res.status(403).json({ error: 'Invalid Access!' });
  }
    const userFind = await User.findOne({ where: { id: userId } });
    if (!userFind) {
      return res.status(400).json({ error: 'User Not Found!.' });
    }

    const newRestaurant = new Restaurant({
      name,
      openTime,
      closeTime,
      address,
      city,
      country,
      longitude,
      latitude,
      deliveryRatePerMile,
      userId,
    });
    await newRestaurant.save();
    return res.status(200).json({ message: 'Restaurant registered successfully', data: newRestaurant });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Registration failed' });
  }
}


async function readRestaurantsOfUser(req, res) {
  const { userId } = req.user;
  try {
    if(userId === undefined){
      return res.status(403).json({ error: 'Invalid Access!' });
  }
    const userFind = await User.findOne({ where: { id: userId } });
    if (!userFind) {
      return res.status(400).json({ error: 'User Not Found!.' });
    }

    const restaurantFind = await Restaurant.findAll({ where: { userId: userId, activeStatus:true } });

    return res.status(200).json({ message: 'Restaurant Fetch successfully', data: restaurantFind });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Find failed' });
  }
}


async function readRestaurant(req, res) {
  const {id} = req.params;
  try {

    const restaurantFind = await Restaurant.findOne({ where: { id: id, activeStatus:true } });

 if (!restaurantFind) {
      return res.status(404).json({ error: 'Restaurant Not Found!.' });
    }
    return res.status(200).json({ message: 'Restaurant Fetch successfully', data: restaurantFind });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Find failed' });
  }
}


async function updateRestaurant(req, res) {
  const { userId } = req.user;
  const {id} = req.params; //Restaurant Id
  const {name, openTime, closeTime, address, city, country, longitude, latitude, deliveryRatePerMile } = req.body;

  try {
    if(userId === undefined){
      return res.status(403).json({ error: 'Invalid Access!' });
  }
    const userFind = await User.findOne({ where: { id: userId } });
    if (!userFind) {
      return res.status(400).json({ error: 'User Not Found!' });
    }

    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant || !restaurant.activeStatus) {
      return res.status(404).json({ error: 'Restaurant Not Found!' });
    }

    restaurant.name = name ? name : restaurant.name;
    restaurant.openTime = openTime ? openTime : restaurant.openTime;
    restaurant.closeTime = closeTime ? closeTime : restaurant.closeTime;
    restaurant.address = address ? address : restaurant.address;
    restaurant.city = city ? city : restaurant.city;
    restaurant.country = country ? country : restaurant.country;
    restaurant.longitude = longitude ? longitude : restaurant.longitude;
    restaurant.latitude = latitude ? latitude : restaurant.latitude;
    restaurant.deliveryRatePerMile = deliveryRatePerMile ? deliveryRatePerMile : restaurant.deliveryRatePerMile;
    restaurant.userId = userId ? userId : restaurant.userId;


    await restaurant.save();

    return res.status(200).json({ message: 'Restaurant updated successfully', data: restaurant });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Update failed' });
  }
}


async function deleteRestaurant(req, res) {
  const { userId } = req.user;
  const {id} = req.params; //Restaurant Id

  try {
    if(userId === undefined){
      return res.status(403).json({ error: 'Invalid Access!' });
  }
    const userFind = await User.findOne({ where: { id: userId } });
    if (!userFind) {
      return res.status(400).json({ error: 'User Not Found!' });
    }

    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant || !restaurant.activeStatus) {
      return res.status(404).json({ error: 'Restaurant Not Found!' });
    }

  
    restaurant.deliveryRatePerMile = (req.body.activeStatus === undefined ||  req.body.activeStatus === null) ? true : req.body.activeStatus;


    await restaurant.save();

    return res.status(200).json({ message: 'Restaurant Deleted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Update failed' });
  }
}

module.exports = { createRestaurant, readRestaurantsOfUser, readRestaurant, updateRestaurant, deleteRestaurant }