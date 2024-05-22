import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password  = await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await  bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.toggleBlockStatus = async function(){
    this.isBlocked = !this.isBlocked
    await this.save()
}
const User = mongoose.model('User',userSchema)

export default User