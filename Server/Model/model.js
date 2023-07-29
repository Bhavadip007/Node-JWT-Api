const mongoose=require( 'mongoose' );

const userSchema=new mongoose.Schema( {
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: Number
    }
}, { collection: 'Users' } )

module.exports=mongoose.model( 'Users', userSchema )