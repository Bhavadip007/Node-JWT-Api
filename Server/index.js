const routes=require( './routes' );
const express=require( 'express' );
const mongoose=require( 'mongoose' );
// const mongoString=process.env.DATABASE_URL;
const mongoString="mongodb://localhost:27017/Mynode-app";
const bodyParser=require( 'body-parser' )
require( 'dotenv' ).config();
var cors = require('cors')

const app=express();
app.use(cors())
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.json() );
app.use( '/api', routes )

mongoose.set( "strictQuery", false )
mongoose.connect( mongoString );

const database=mongoose.connection;

database.on( 'error', ( error ) =>
{
    console.log( error )
} )

database.once( 'connected', () =>
{
    console.log( 'Database Connected' );
} )


app.listen( 3001, () =>
{
    console.log( `Server Started at ${ 3001 }` )
} )