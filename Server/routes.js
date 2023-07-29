const express=require( 'express' );
const router=express.Router()
const Model=require( './Model/model' );
const { authSchema }=require( "./Helper/validation_schema" );
const User=require( "./Model/User" );
const createHttpError=require( "http-errors" );
const { signAccessToken, verifyAccessToken }=require( "./Helper/jwt-helper" );


router.post( "/register", async ( req, res, next ) =>
{
    try
    {
        const result=await authSchema.validateAsync( req.body );
        const doesExist=await User.findOne( { email: result.email } );
        if ( doesExist )
            throw createHttpError.Conflict( `${ result.email } is already exist!` );

        const user=new User( result );
        const savedUser=await user.save();
        await signAccessToken( savedUser.id );

        // res.send({ accessToken });
        res.send( { message: "User registered success" } );
    } catch ( err )
    {
        if ( err.isJoi===true ) err.status=401;
        next( err );
    }
} );

router.post( "/login", async ( req, res, next ) =>
{
    try
    {
        const result=await authSchema.validateAsync( req.body );
        const user=await User.findOne( { email: result.email } );
        if ( !user ) throw createHttpError.Unauthorized( "User not registered" );

        const isMatch=await user.isValidPassword( result.password );
        if ( !isMatch )
            throw createHttpError.Unauthorized( "Username/password not valid" );

        const accessToken=await signAccessToken( user.id );
        res.send( { accessToken } );
    } catch ( error )
    {
        if ( error.isJoi===true )
        {
            return next( createHttpError.BadRequest( "Invalid username/password" ) );
        }
        next( error );
    }
} );

router.get( "/user/:id", verifyAccessToken, async ( req, res ) =>
{
    try
    {
        const user=await User.findById( req.params.id );
        if ( !user ) throw createHttpError.Unauthorized( "User not registered" );

        res.json( {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
        } );
    } catch ( error )
    {
        res.send( "error"+error );
    }
} );

router.get( "/user", async ( req, res ) =>
{
    try
    {
        const user=await User.find();
        if ( user )
        {
            res.send( user );
        }
    } catch ( error )
    {
        res.send( "error"+error );
    }
} );


//Post Method
router.post( '/post', async ( req, res ) =>
{
    const data=new Model( {
        name: req.body.name,
        age: req.body.age
    } )
    try
    {
        const dataToSave=await data.save();
        res.status( 200 ).json( dataToSave )
    }
    catch ( error )
    {
        res.status( 400 ).json( { message: error.message } )
    }
} )

//Get all Method
router.get( '/getAll', ( req, res ) =>
{
    res.send( 'Get All API' )
} )

//Get by ID Method
router.get( '/getOne/:id', ( req, res ) =>
{
    res.send( 'Get by ID API' )
} )

//Update by ID Method
router.patch( '/update/:id', ( req, res ) =>
{
    res.send( 'Update by ID API' )
} )

//Delete by ID Method
router.delete( '/delete/:id', ( req, res ) =>
{
    res.send( 'Delete by ID API' )
} )

module.exports=router;