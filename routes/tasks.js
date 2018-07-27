var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://user:mastero32@ds235461.mlab.com:35461/tasks', [
  'TASKS'
]);

//get All tasks
router.get('/tasks', function(req, res, next) {
  //res.render('task.html');
  //TASK en maj parceque j'cree la collection avec un nom majuscule.
  db.TASKS.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

//get one TAsk
router.get('/tasks/:id', function(req, res, next) {
  db.TASKS.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//save task
router.post('/task', function(req, res, next) {
  var task = req.body;

  if (!task.title || task.isDone + '') {
    res.status(400);
    res.json({
      error: 'Bad data'
    });
  } else {
    db.TASKS.save(task, function(err, task) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

//delete
router.delete('/tasks/:id', function(req, res, next) {
  db.TASKS.remove({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    task
  ) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//update
router.put('/tasks/:id', function(req, res, next) {
  //prendre la valeur dans le formulaire soumis par url
  var task = req.body;
  //var a updater
  var updTask = {};

  if (task.isDone) {
    updTask.isDone = task.isDone;
  }
  if (task.title) {
    updTask.title = task.title;
  }

  if (!updTask) {
    res.status(400);
    res.json({
      error: 'bad data'
    });
  } else {
    db.TASKS.update(
      { _id: mongojs.ObjectId(req.params.id) },
      updTask,
      {},
      function(err, task) {
        if (err) {
          res.send(err);
        }
        res.json(task);
      }
    );
  }
});
module.exports = router;
