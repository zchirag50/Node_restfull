var bookController = function(Book){
     var post = function(req,res){
        var book= new Book(req.body);
        if(!req.body.title)
        {
            res.status(400);
            res.send('Title is required');
        }
        else{
            book.save();
            res.status(201);
            res.send(book);
         }
     }
     var get = function(req,res){
        var query= req.query;
        Book.find(query,function(err,book){
           if(err)
               res.status(500).send(err);
           else{
               var returnBooks= [];
               book.forEach(function(element,index,array){
                    var newbook=element.toJSON();
                    newbook.links={};
                    newbook.links.self = 'http://' + req.headers.host + '/api/book/' + newbook._id
                    returnBooks.push(newbook);
               });
               res.json(returnBooks);
               }
      })
     }
    return{
        post:post,
        get:get
    }
}

module.exports= bookController;