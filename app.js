const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Shoppinglist';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

/*
    insertItem(db, function() {
        client.close();
    });

    updateItem(db, function()  {
        client.close();
    });
*/

    /*
    showAllProducts(db, function() {
        client.close();
    });

    makeFavorite(db, function() {
        client.close();
    });
    */
/*
    updateDocument(db, function()  {
        client.close();
    });*/

    /*
        showFavorite(db, function() {
            client.close();
        });

    removeItem(db, function() {
        client.close();
    });
    */
     showAllProducts(db, function() {
        client.close();
    });


});

//Function's
const insertItem = function(db, callback) {
    const collection = db.collection('Shoppinglist');
    collection.insertMany([{Product : 'Gurka', St : 2}, {Product : 'Chips', St : 4}, {Product : 'Tomat', St : 1}]
    , function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 items into the Shopping List");
        callback(result);
    });
};

const showAllProducts = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('Shoppinglist');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
};


const showSpecific = function(db, callback) {
    const collection = db.collection('Shoppinglist');
    collection.find({Product: 'Gurka'}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
};


const updateItem = function(db, callback) {
    const collection = db.collection('Shoppinglist');
    // Update the nr of Gurka
    collection.updateOne({ Product : 'Gurka' }
        , { $set: { St : 3 } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the Item");
            callback(result);
        });
};

const makeFavorite = function(db, callback) {
    const collection = db.collection('Shoppinglist');
    collection.updateOne({ Product: 'Chips' }
        , { $set: { Status : 'Favorite' } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Makes the item a favorite");
            callback(result);
        });
};


const showFavorite = function(db, callback) {
    const collection = db.collection('Shoppinglist');
    collection.find({Status: 'Favorite'}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("This is the Items that are favorite");
        console.log(docs)
        callback(docs);
    });
};

const removeItem = function(db, callback) {
    const collection = db.collection('Shoppinglist');
    collection.deleteOne({ Product:'Gurka' }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the Item");
        callback(result);
    });
};

