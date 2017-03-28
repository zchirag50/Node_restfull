var express = require('express');
//var Book= require('./../Model/bookModel');

var routes=function(Book){
    var bookRouter= express.Router();
    var bookController= require('../controllers/bookController')(Book);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

//interceptor
    bookRouter.use('/:bookid',function(req,res,next){
        Book.findById(req.params.bookid,function(err,book){
            if(err)
                res.status(500).send(err);
            else if(book){
               req.book=book;
               next();
            }
            else
                res.status(404).send('no book found');
        });
    })

    bookRouter.route('/:bookid')
        .get(function(req,res){
            var newbook=req.book.toJSON();
            newbook.links={};
            var url= 'http://' + req.headers.host + '/api/book/?genre=' + newbook.genre;
            newbook.links.self = url.replace(' ','%20');
            res.json(newbook);
        })
        .put(function(req, res){
            req.book.title= req.body.title;
            req.book.auther= req.body.auther;
            req.book.genre= req.body.genre;
            req.book.read= req.body.read;
            req.book.save(function(err){
                  if(err)
                      res.status(500).send(err);
                  else
                      res.json(req.book);
             });
            })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;
            for(var p in req.body)
            {
                req.book[p]=req.body[p];
            }
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(req.book);
            });
        })
        .delete(function(req,res){
            req.book.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.status(204).send('Removed');
            });
        })
    return bookRouter;
};
module.exports=routes;