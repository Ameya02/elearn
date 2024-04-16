const bcrypt = require("bcrypt");

const { User } = require("../models");




// UPDATE a user

const updatePassword = async (req, res) => {
  const { password } = req.body;
  try {
    if(req.user.user_id != req.params.id){
      res.status(401).json({message:"You are not authorized to update this user"});
      return;
    }
    if(!password){
      res.status(400).json({message:"Password is required"});
      return;
    }
    let user = User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    await User.update(
      { password},
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ msg: "User update successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }


}
const updateUser = async (req, res) => {
  const { username, photo, headline, bio } = req.body;
  try {
    if(req.user.user_id != req.params.id){
      res.status(401).json({message:"You are not authorized to update this user"});
      return;
    }
    if(!username){
      res.status(400).json({message:"Username is required"});
      return;
    }
    let user = User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    await User.update(
      { username, password, headline, bio, photo},
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ msg: "User update successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }

};

// DELETE a user
const deleteUser = async (req, res) => {
  
  try {
    if(req.user.user_id != req.params.id){
      res.status(403).json({message:"You are not authorized to update this user"});
      return;
    }
    let user = User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "User deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }

};

const getProfile = async (req, res) => {
  try {
    let user = await User.findByPk(req.user.id,{
      attributes: {exclude: ["id","password","isAdmin"]},
    
    });
    if (!user) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(user);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}

module.exports = {updateUser, deleteUser, getProfile};