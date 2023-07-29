const mongoose=require( "mongoose" );
const bcrypt=require( "bcryptjs" );

const userSchema=mongoose.Schema( {
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    username: {
        type: String,
    },
} );

userSchema.pre( "save", async function ( next )
{
    try
    {
        const salt=await bcrypt.genSalt( 10 );
        const hashedPassword=await bcrypt.hash( this.password, salt );
        this.password=hashedPassword;
        next();
    } catch ( error )
    {
        next( error );
    }
} );

userSchema.methods.isValidPassword=async function ( password )
{
    try
    {
        return await bcrypt.compare( password, this.password );
    } catch ( error )
    {
        throw error;
    }
};

module.exports=mongoose.model( "registration", userSchema );
