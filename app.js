if (process.env.NODE_ENV != "production"){
    require("dotenv").config();   
}

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const NotesUser = require("./models/user.js");

const notesLinkRouter = require("./routes/notesLink.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// const MONGO_URL = "mongodb://127.0.0.1:27017/notes_manager";
const dbUrl = process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("Connected to DB.");
})
.catch((err) => {
    console.log(err)
});

async function main() {          
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));    
app.use(flash());

app.use(passport.initialize()); 
app.use(passport.session());            
passport.use(new LocalStrategy(NotesUser.authenticate()));
passport.serializeUser(NotesUser.serializeUser());     
passport.deserializeUser(NotesUser.deserializeUser()); 

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new NotesUser({
//         branch: "Computer",
//         year: "1",
//         email: "student@gmail.com",
//         username: "delta-student",
//     })
//     let registeredUser = await NotesUser.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// })

// app.get("/testSuggestion", async (req, res) => {
//     let sampleSuggestion = new Suggestion({
//         name: "Austin Varshney",
//         faculty_Number: "23COBEA274",
//         branch: "Computer Science",
//         year: "First Year",
//         suggestions: "You need to compact it as much as possible"
//     })
//     await sampleSuggestion.save();
//     console.log("Sample was saved.");
//     res.send("Successful Testing");
// })


app.use("/note", notesLinkRouter);
app.use("/", userRouter);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs",{err});
})

app.listen(8080, () => {
    console.log("App is listening on port 8080.");
})