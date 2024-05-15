import mongoose from 'mongoose';
// import Blog from './Blog';

const Schema= mongoose.Schema;

const UserSchema= new Schema(
    {
        name:{
            type : String,
            required: true
        },
        email:{
            type : String,
            required: true,
            unique: true
        },
        password:
        {
            type : String,
            required: true,
            minlength: 8
        },
        cpassword:
        {
            type : String,
            required: true,
            minlength: 8
        },
        blogs:
        [{
            type: mongoose.Types.ObjectId,
            ref : "Blog",
            require:"true"
        }],
})
export default mongoose.model("User", UserSchema);
