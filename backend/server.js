import data from './data.js';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import Mongo from 'mongodb';
import fileupload from "express-fileupload";
import ObjectId from 'mongodb';

const __dirname = path.resolve();
var MongoClient = Mongo.MongoClient;
//create database
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });
var url = "mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Mongodb database connected");
  dbo = db.db("mydb");
  //create collection
  // dbo.createCollection("products", function (err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   db.close();
  // });

  //insert products
  // var myobj = data.products;
  // dbo.collection("products").insertMany(myobj, function (err, res) {
  //   if (err) throw err;
  //   console.log("Number of documents inserted: " + res.insertedCount);
  //   db.close();
  // });

  //find
  // dbo.collection("products").find({}).toArray(function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();
  // });
});


var app = express();
// console.log(data);
const email = "prana9654736312@gmail.com";
const pass = "nokia206";
app.use(express.static('admin'));
app.use(fileupload(/*{
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: '/tmp/'
}*/));
//app.use(express.static(__dirname + '/public'));
// app.use('/static', express.static(path.join(__dirname, 'admin')))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.get('/api/products', function (req, res) {
  // res.send(data);
  dbo.collection("products").find({}).toArray(function (err, result) {
    if (err) throw err;
    //console.log(result);
    var data = { "products": result };
    res.send(data);
    // db.close();
  });
});
app.get('/api/product/:id', (req, res) => {
  //const product = data.products.find((x, i) => i == req.params.id);
  var query = { _id: ObjectId.ObjectId(req.params.id) };
  dbo.collection("products").find(query).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
    //db.close();
  });



});



app.get('/api/admin', function (req, res) {
  if (req.session.loggedin) {
    res.redirect("/api/adminpanel");
  } else {
    res.sendFile(__dirname + "/admin/login.html");
  }
});

app.get('/api/adminpanel', function (req, res) {
  if (req.session.loggedin) {
    res.sendFile(__dirname + "/admin/admin.html");
  } else {
    res.redirect("/api/admin");
  }

});

app.get('/api/admin/add', function (req, res) {
  if (req.session.loggedin) {
    res.sendFile(__dirname + "/admin/addItem.html");
  } else {
    res.redirect("/api/admin");
  }

});

app.post('/api/upload/item', function (req, res) {

  if (req.session.loggedin) {
    //base directory path
    var base_dir = __dirname.replace("backend", "") + "frontend/public/Images/";
    var res1 = res;
    // update thumbnail name
    var uploadPath = String(new Date().toGMTString()).replace(/\s/g, '').replace(",", "").replace(":", "").replace(":", "") + String(Math.round(Math.random() * 1000)).replace(".", "");
    var img_src = req.files.img_src;
    req.body.img_src = uploadPath + "thumb.jpg";// + img_src.name;
    //update screenshot
    req.body.screenshot = [];
    var screenshots = [];
    req.files.screenshot.forEach(e => {
      var uploadPath = String(new Date().toGMTString()).replace(/\s/g, '').replace(",", "").replace(":", "").replace(":", "") + String(Math.round(Math.random() * 1000)).replace(".", "");
      req.body.screenshot.push(uploadPath + "screenshot.jpg");//+ e.name);
      screenshots.push(e);
    });
    console.log(req.files.screenshot);

    // upload products
    dbo.collection("products").insertOne(req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");

      img_src.mv(base_dir + uploadPath + "thumb.jpg", function (err) {
        if (err)
          return res1.status(500).send(err);

        console.log('File uploaded!');
      });

      req.body.screenshot.forEach((e, i) => {
        screenshots[i].mv(base_dir + e, function (err) {
          if (err)
            return res1.status(500).send(err);

          console.log(i + 'File uploaded!');
        });
      });

      res1.redirect("/api/adminpanel");
      // db.close();
    });

  } else {
    res.redirect("/api/admin");
  }

});


app.post('/api/auth', function (req, res) {
  var remail = req.body.email;
  var rpass = req.body.password;
  if (req.session.loggedin || (remail == email && rpass == pass)) {
    req.session.loggedin = true;
    req.session.email = email;
    res.redirect("/api/adminpanel");
  } else {
    res.redirect("/api/admin");
  }
});
app.get('/api/logout', function (req, res) {
  req.session.loggedin = false;
  req.session.email = "";
  res.redirect("/api/admin");
});


app.post('/api/user_login', function (req, res) {

  var body = (JSON.parse(atob(req.headers.authorization)));
  // var email = "prana9654736312@gmail.com";
  // var pass = "nokia206";
  var remail = body.email;
  var rpass = btoa(btoa(btoa(btoa(body.password))));
  //const product = data.products.find((x, i) => i == req.params.id);
  var query = { email: remail };
  dbo.collection("users").find(query).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      //res.send(result[0]);
      if (req.session.user_log || (remail == result[0].email && rpass == result[0].password)) {
        req.session.user_log = true;
        req.session.user_email = remail;
        req.session.user_name = result[0].username;
        res.send({ "log": true, "email": result[0].email, "username": result[0].username });
      } else {
        var dat = { "log": false }
        if (remail != result[0].email) {
          dat.email = false;
        }
        if (rpass != result[0].password) {
          dat.pass = false;
        }
        res.send(dat);
      }


    } else {
      var dat = { "log": false, email: false }
      res.send(dat);
      //res.status(404).send({ message: 'Product Not Found' });
    }


    //db.close();
  });


});

app.post('/api/user_signin', function (req, res) {

  var body = (JSON.parse(atob(req.headers.authorization)));
  var res1 = res;
  // var email = "prana9654736312@gmail.com";
  // var pass = "nokia206";
  var rname = body.name;
  var remail = body.email;
  var rpass = btoa(btoa(btoa(btoa(body.password))));
  //const product = data.products.find((x, i) => i == req.params.id);
  var query = { email: remail };
  dbo.collection("users").find(query).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      var dat = { "log": false }
      res.send(dat);
      //res.send(result[0]);
    } else {
      var body = {
        username: rname,
        email: remail,
        password: rpass,
        avatar: ""
      }
      dbo.collection("users").insertOne(body, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        var dat = { "log": true }
        res1.send(dat);
        // db.close();
      });

      //res.status(404).send({ message: 'Product Not Found' });
    }


    //db.close();
  });


});

app.post('/api/user_logout', function (req, res) {

  var body = (JSON.parse(atob(req.headers.authorization)));
  var email = "prana9654736312@gmail.com";
  var remail = body.email;

  if (req.session.user_log && remail == email) {
    req.session.user_log = false;
    req.session.user_email = null;
    res.send({ "log": false });
  }
});

app.post('/api/user_logged', function (req, res) {
  if (req.session.user_log) {
    res.send({ "log": true, "email": req.session.user_email, "username": req.session.user_name });
  }
  else {
    res.send({ "log": false });
  }

});

app.post('/api/add_cart', function (req, res) {

  var body = (JSON.parse(atob(req.headers.authorization)));
  // var email = "prana9654736312@gmail.com";
  // var pass = "nokia206";
  var res1 = res;
  var remail = body.email;
  var rproductId = body.productId;
  //const product = data.products.find((x, i) => i == req.params.id);
  var query = { email: remail };
  dbo.collection("cart").find(query).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      //res.send(result[0]);
      var f = false;
      var num = null;
      for (var i = 0; i < result.length; i++) {
        if (result[i].productId == rproductId) {
          //result[i].quantity = result.quantity + 1;
          num = result[i].quantity + 1;
          f = true;
          break;
        }
      }
      if (f) {
        var myQuery = { email: remail };
        var newValues = { $set: { quantity: num } };
        dbo.collection("cart").updateOne(myQuery, newValues, function (err, res) {
          if (err) throw err;
          console.log("1 document updated");
          var dat = { "log": true, "update": true }
          res1.send(dat);
          //db.close();
        });
      } else {
        var data = {
          email: remail,
          productId: rproductId,
          quantity: 1
        }
        dbo.collection("cart").insertOne(data, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          var dat = { "log": true, "update": false }
          res1.send(dat);

          // db.close();
        });
      }



    } else {
      var data = {
        email: remail,
        productId: rproductId,
        quantity: 1
      }
      dbo.collection("cart").insertOne(data, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        var dat = { "log": true }
        res1.send(dat);

        // db.close();
      });
      //var dat = { "log": false, email: false }
      //res.send(dat);
      //res.status(404).send({ message: 'Product Not Found' });
    }


    //db.close();
  });


});
app.post('/api/remove_cart', function (req, res) {

  var body = (JSON.parse(atob(req.headers.authorization)));
  // var email = "prana9654736312@gmail.com";
  // var pass = "nokia206";
  var res1 = res;
  var remail = body.email;
  var rproductId = body.productId;
  //const product = data.products.find((x, i) => i == req.params.id);
  var query = { email: remail, productId: rproductId };
  dbo.collection("cart").deleteOne(query, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.send({ "log": true });
    //db.close();
  });


});

app.get('/api/cart_product', (req, res) => {
  //const product = data.products.find((x, i) => i == req.params.id);
  var query = { email: atob(req.query.id) };
  //console.log(atob(req.query.id));
  dbo.collection("cart").find(query).toArray(function (err, result) {
    if (err) throw err;
    // console.log(result);
    if (result.length > 0) {
      res.send(JSON.stringify(result));
    } else {
      res.send({ message: 'Product Not Found' });
    }
    //db.close();
  });



});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
});
