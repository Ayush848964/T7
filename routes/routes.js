const express = require ('express');

const userObj = require("../model/user");

var uuid = require('uuid');

const router = express.Router();


//POST API to add a new user
router.post('/add', async (req, res) => {
    const body = req.body;

    try {
      if (Object.keys(body).length === 0) {
        return res.status(400).json({ success: false, data: 'Incorrect Request' });
      }

      const newUser = new userObj();
      newUser.email = body.email
      newUser.firstName = body.firstName
      await newUser.save(); 
      return res.status(200).json({ message: 'User added', success: true, id: newUser.id });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' + err });
    }
  });




//GET API to get the list of users
router.get('/users', async (req, res) => {
    try {
      const users = await userObj.find(); 
      if (users.length === 0) {
        return res.status(404).json({ success: false, data: 'User not found!!' });
      }
      return res.status(200).json({ message: 'Users retrieved', success: true, users: users });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error!' });
    }
  });



//GET API to fetch a user

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await userObj.findOne({ _id: userId }); 
      if (!user) {
        return res.status(404).json({ success: false, data: 'User not found.' });
      }
      return res.status(200).json({ success: true, user: user });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error!'+err });
    }
  });



//PUT API to update a specific user
router.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const body = req.body;
    try {
      if (Object.keys(body).length === 0) {
        return res.status(400).json({ message: 'Incorrect request' });
      }
      const user = await userObj.findOneAndUpdate({ _id: userId }, body, { new: true }); 
      if (!user) {
        return res.status(404).json({ success: false, data: 'User not found.' });
      }
      return res.status(200).json({ message: 'User updated', success: true });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error'+err + userId });
    }
  });



// DELETE API to delete a user
router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await userObj.findOneAndDelete({ _id: userId }); 
      if (!user) {
        return res.status(404).json({ success: false, data: 'User not found.' });
      }
      return res.status(200).json({ message: 'User deleted', success: true });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' + err });
    }
  });


  


module.exports = router;