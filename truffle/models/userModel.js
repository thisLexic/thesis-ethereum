const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = {
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
    
}

// userSchema.pre('save', function(next) {
//     if (this.isModified('password')) {
//         bcrypt.hash(this.password, 8, (err,hash) => {
//             if(err) return next(err);

//             this.password = hash;
//             next();
//         })
//     }
// })


// userSchema.methods.comparePassword = async function(password) {
//     if(!password) throw new Error ('password is missing')

//     try {
//         const result = await bcrypt.compare(password, this.password)
//         return result;
//     } catch (error) {
//         console.log('error while comparing password', error.message)
//     }
// }

const User = mongoose.model("User", userSchema)

module.exports = User