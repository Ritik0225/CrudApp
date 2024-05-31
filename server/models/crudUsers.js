import mongoose from "mongoose";

const crudUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true 
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    }

}, {
    collection: "crud-users"
})

const crudUser = mongoose.model("CrudUser", crudUserSchema)

export default crudUser