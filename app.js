const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });
const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to ur todo list"
});
const item2 = new Item({
    name: "Hit the + button to add a new item"
});
const item3 = new Item({
    name: "Hit the - button to delete an item"
});

const defaultItems = [item1, item2, item3];



app.get("/", (req, res) => {
    Item.find((err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            if (items.length === 0) {
                Item.insertMany(defaultItems, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Successfully added many items");
                    }
                });
                res.redirect("/");
            }
            res.render("list", { kindOfDay: "Today", newListItems: items })
        }
    })
    // res.render("list", { kindOfDay: "Today", newListItems: items })
});
app.get("/work", (req, res) => {
    var title = "Today's work"
    res.render("list", { kindOfDay: title, newListItems: workItems })
})
app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const nitem = new Item({
        name:itemName
    });
    nitem.save();
    res.redirect("/");
})
app.post("/delete", (req,res)=>{
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("successfully deleted");
        }
    });
    res.redirect("/");
})
app.post("/work", (req, res) => {
    var wItem = req.body.newItem;
    workItems.push(wItem);
    res.redirect("/work");
})

app.listen(3000, () => {
    console.log("server is up and running")
});









// const express=require("express");
// const app=express();
// const bodyParser=require("body-parser");

// app.set("view engine","ejs")

// app.get("/",(req,res)=>{
//     var currD = new Date().getDay();
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     var day = days[currD];
//     // if(currD===6||currD===0){
//     //     day = "Weekend";
//     // }
//     // else{
//     //     day = "Weekday";
//     // }
//     res.render("list",{kindOfDay: day})
// });

// app.listen(3000,()=>{
//     console.log("server is up and running")
// });