const UserModel = require('../models/user')

//create user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ "msg": "Contect can not be empty" })
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
    })
    await user.save().then((data) => {
        res.status(201).send({
            "msg": "user created",
            user: data,
        })
    }).catch((err) => {
        res.status(500).send({
            "msg": err || "Some error occurred while creating user"
        })
    })
}
//find all users
exports.findAll = async (req, res) => {
    try {
        console.log("Inside try block")
        const user = await UserModel.find()
        res.status(200).json(user)
    }
    catch (err) {
        res.status(404).json({
            "msg": err.msg
        })
    }
}
//find one user by id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({ "email": req.body.email })
        res.status(200).json(user)
    }
    catch (err) {
        res.status(404).json({
            "msg": err.msg,
        })
    }
}

//update a user
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            "msg": "Data to updated can not be empty"
        })
    }
    const id = req.params.id

    console.log("****** ", id)

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).
        then((data) => {
            if (!data) {
                res.status(400).send({
                    "msg": "user not found"
                })
            }
            else {
                res.send({
                    "msg": "user updated sucessfully"
                })
            }
        }).catch((err) => {
            res.status(404).send({
                "msg": err.msg
            })
        })
}

//delete a user

exports.delete = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then((data) => {
        if (!data) {
            res.status(404).send({
                "msg": "User not found"
            })
        }
        else {
            res.send({
                "id": res.params.id,
                "msg": "user deleted sucessfully"
            })
        }
    }).catch((err) => {
        res.status(500).send({
            "msg": err.msg
        })
    })
}