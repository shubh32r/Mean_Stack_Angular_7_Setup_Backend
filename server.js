require ('./connection.js');
const books = require('./books.model.js');
const express = require('express')
const bodyParser = require('body-parser');
const router = express.Router();
const app = express()
const port = 3000
app.use(bodyParser.json());
app.use('/',router);
/*app.get('/', (req, res) => res.send('Hello World!'))*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/*get all the books details*/
router.route('/books').get((req, res) => {
    books.find((err, books) => {
        if (err)
            console.log(err);
        else
            res.json(books);
    });
});

/*delete book by id*/
router.route('/books/delete/:id').get((req, res) => {
	var id = req.params.id;
	books.findOne({ID:id}, (err, books) => {
        if (err){
            res.json(err);
        }
        else
        	books.remove(function(err){
        		res.json('Removed successfully');
        	});
            
    });
});

/* Update book by ID*/

router.route('/books/update/:id').post((req, res) => {
    var id = req.params.id;
	books.findOne({ID:id}, (err, books) => {
        if (err){
            res.json(err);
        }
        else {
        	console.log(books.ID,'hi',req.body.BookName);
            books.ID = req.body.ID;
            books.BookName = req.body.BookName;
            books.AuthorName = req.body.AuthorName;
            books.Catagory = req.body.Catagory;
            books.Price = req.body.Price;
            books.save().then(books => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});


/*View book by id*/
router.route('/books/view/:id').get((req, res) => {
	var id = req.params.id;
	books.findOne({ID:id}, (err, books) => {
        if (err){
            res.json(err);
        }
        else
        	console.log(id);
        	res.json(books);
            
    });
});

/* add books*/
router.route('/books/add').post((req, res) => {
    console.log(11, req.body);
    var book = new books(req.body);
    console.log(req.body.ID);
    book.save()
        .then(book => {
            res.status(200).json({'book': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});
