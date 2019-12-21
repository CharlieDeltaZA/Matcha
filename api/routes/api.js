const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/users/:username', (req, res) => {
    //code to query and return json object if username is found.
    let db = new database;
    let user = db.get_user(req.params.username);
    sleep(5000);
    console.log(user);
});

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

module.exports = router;
