const db = require('../models');
const { uploadImage, removeImage } = require('../utils/imageUpload');
const User = db.Users;
const DishCategories = db.DishCategories;
const Dish = db.Dishes;
const DishItem = db.DishItems;

// --------------  Dish Category ----------------
async function createDishCategory(req, res) {
    const { userId } = req.user;
    const { name } = req.body;
    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await User.findOne({ where: { id: userId } });
        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!.' });
        }

        const newCategory = new DishCategories({
            name
        });
        await newCategory.save();
        return res.status(200).json({ message: 'Category created successfully', data: newCategory });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Create failed' });
    }
}

async function readDishCategory(req, res) {
    const { userId } = req.user;
    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await User.findOne({ where: { id: userId } });

        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!' });
        }

        const dishCategories = await DishCategories.findAll();

        return res.status(200).json({ message: 'Dishe Categories fetch successfully', data: dishCategories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Fetch failed' });
    }
}

async function deleteDishCategory(req, res) {
    const { userId } = req.user;

    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await User.findOne({ where: { id: userId } });

        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!' });
        }

        await DishCategories.destroy({ where: { id: req.params.id }});

        return res
            .status(200)
            .json({ message: 'Dish category deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Deleted failed' });
    }
}

// --------------  Dish ----------------
async function createDish(req, res) {
    const { userId } = req.user;
    const {
        name,
        description,
        contains,
        calories,
        price,
        activeStatus,
        quantityPerOrder,
        restaurantId,
    } = req.body;

    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await User.findOne({ where: { id: userId } });

        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!' });
        }

        if (req.files) {
            const results = await uploadImage(req.files.imageFile);
            if (results.error) {
                res.send(results);
            }
            req.body.imagePath = results.fileName;
        }


        const dishData = {
            name,
            description,
            contains,
            calories,
            price,
            image: req.body.imagePath,
            activeStatus,
            quantityPerOrder,
            restaurantId,
        };

        const createdDish = new Dish(dishData);
        await createdDish.save();

        return res.status(200).json({ message: 'Dish created successfully', data: createdDish });
    } catch (error) {
        removeImage(req.body.imagePath);
        console.error(error);
        return res.status(500).json({ error: 'Create failed' });
    }
}

//--------- Pagination Added----------------
async function readDishByRestaurant(req, res) {
    const { userId } = req.user;
    const { page = 1, perPage = 10 } = req.query;
  
    try {
      const userFind = await User.findOne({ where: { id: userId } });
  
      if (!userFind) {
        return res.status(400).json({ error: 'User Not Found!' });
      }
  
      const offset = (page - 1) * perPage;
      const limit = parseInt(perPage);
  
      const dishes = await Dish.findAndCountAll({
        where: { restaurantId: req.params.id },
        include: [db.DishItems, db.DishCategories],
        limit,
        offset,
      });
  
      const totalPages = Math.ceil(dishes.count / perPage);
  
      return res.status(200).json({
        message: 'Dishes fetched successfully',
        data: {
          dishes: dishes.rows,
          currentPage: page,
          totalPages,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Fetch failed' });
    }
  }

async function updateDish(req, res) {
    const { userId } = req.user;
    const { name, description, contains, calories, price, activeStatus, quantityPerOrder } = req.body;

    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await User.findOne({ where: { id: userId } });

        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!' });
        }

        const existingDish = await Dish.findOne({ where:{ id: req.params.id } });

        if (!existingDish) {
            return res.status(404).json({ error: 'Dish Not Found!' });
        }

        if (req.files) {
            const results = await uploadImage(req.files.imageFile);
            if (results.error) {
                res.send(results);
            }
            req.body.imagePath = results.fileName;
        }

        if (name !== undefined) {
            existingDish.name = name;
        }

        if (description !== undefined) {
            existingDish.description = description;
        } else {
            existingDish.description = existingDish.description;
        }

        if (contains !== undefined) {
            existingDish.contains = contains;
        }

        if (calories !== undefined) {
            existingDish.calories = calories;
        }

        if (price !== undefined) {
            existingDish.price = price;
        }

        if (req.body.imagePath) {
            existingDish.image = req.body.imagePath;
        } else {
            existingDish.image = existingDish.image;
        }

        if (activeStatus !== undefined) {
            existingDish.activeStatus = activeStatus;
        }

        if (quantityPerOrder !== undefined) {
            existingDish.quantityPerOrder = quantityPerOrder;
        }

        const updatedDish = await existingDish.save();
        if (!updatedDish) {
            return res.status(404).json({ error: 'Unable to Update Dish!' });
        }

        return res
            .status(200)
            .json({ message: 'Dish updated successfully', data: updatedDish });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Update failed' });
    }
}

async function deleteDish(req, res) {
    const { userId } = req.user;

    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await User.findOne({ where: { id: userId } });

        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!' });
        }

        const existingDish = await Dish.findOne({ where: { id: req.params.id }});
        removeImage(existingDish.image);

        await Dish.destroy({ where: { id: req.params.id }});

        return res
            .status(200)
            .json({ message: 'Dish deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Deleted failed' });
    }
}

// --------------  Dish Items----------------

async function createDishItem(req, res) {
    const { userId } = req.user;
    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const { itemType, name, contains, price, calorie, activeStatus, quantityPerOrder, dishId } = req.body;
        const userFind = await User.findOne({ where: { id: userId } });

        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!' });
        }
        const newDishItem = new DishItem({
          itemType,
          name,
          contains,
          price,
          calorie,
          activeStatus,
          quantityPerOrder,
          dishId,
        });
        await newDishItem.save();
        return res.status(200).json({ message: 'Dish Item created successfully', data: newDishItem });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Create failed' });
    }
}


async function updateDishItem(req, res) {
    const { userId } = req.user;
    
    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const { itemType, name, contains, price, calorie, activeStatus, quantityPerOrder, dishId } = req.body;
        const userFind = await User.findOne({ where: { id: userId } });

        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!' });
        }

        // Find the existing DishItem by its ID
        const existingDishItem = await DishItem.findOne({ where: { id: req.params.id } });

        if (!existingDishItem) {
            return res.status(404).json({ error: 'Dish Item Not Found!' });
        }

        // Update DishItem properties if they are defined in the request body
        if (itemType !== undefined) {
            existingDishItem.itemType = itemType;
        } else {
            existingDishItem.itemType = existingDishItem.itemType;
        }

        if (name !== undefined) {
            existingDishItem.name = name;
        } else {
            existingDishItem.name = existingDishItem.name;
        }

        if (contains !== undefined) {
            existingDishItem.contains = contains;
        } else {
            existingDishItem.contains = existingDishItem.contains;
        }

        if (price !== undefined) {
            existingDishItem.price = price;
        } else {
            existingDishItem.price = existingDishItem.price;
        }

        if (calorie !== undefined) {
            existingDishItem.calorie = calorie;
        } else {
            existingDishItem.calorie = existingDishItem.calorie;
        }

        if (activeStatus !== undefined) {
            existingDishItem.activeStatus = activeStatus;
        } else {
            existingDishItem.activeStatus = existingDishItem.activeStatus;
        }

        if (quantityPerOrder !== undefined) {
            existingDishItem.quantityPerOrder = quantityPerOrder;
        } else {
            existingDishItem.quantityPerOrder = existingDishItem.quantityPerOrder;
        }

        if (dishId !== undefined) {
            existingDishItem.dishId = dishId;
        } else {
            existingDishItem.dishId = existingDishItem.dishId;
        }

       const updateData = await existingDishItem.save();

        return res.status(200).json({ message: 'Dish Item updated successfully', data: updateData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Update failed' });
    }
}

async function deleteDishItem(req, res) {
    const { userId } = req.user;

    try {
        if(userId === undefined){
            return res.status(403).json({ error: 'Invalid Access!' });
        }
        const userFind = await User.findOne({ where: { id: userId } });

        if (!userFind) {
            return res.status(400).json({ error: 'User Not Found!' });
        }

         await DishItem.destroy({ where: { id: req.params.id }});

        return res
            .status(200)
            .json({ message: 'Dish Item deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Deleted failed' });
    }
}



module.exports = {
    createDishCategory,
    readDishCategory,
    deleteDishCategory,
    createDish,
    readDishByRestaurant,
    updateDish,
    deleteDish,
    createDishItem,
    updateDishItem,
    deleteDishItem
};
