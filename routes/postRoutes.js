const express = require('express');
const postController = require('../controllers/postController');

const multer = require('multer');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

const upload = multer({ storage: storage }).array('image', 1);

const router = express.Router();

// Route for getting all posts
router.get('/', postController.getPosts);

router.get('/title/desc',postController.getTitlesAndDescriptions);

// Route for creating a new post
router.post('/', upload, postController.createPost);

// Route for getting a specific post by ID
router.get('/:id', postController.getPostById);

// Route for updating a specific post by ID
router.put('/:id', postController.updatePostById);

// Route for deleting a specific post by ID
router.delete('/:id', postController.deletePostById);

router.get('/search/date', postController.searchPostsByDate);
router.get('/search/name', postController.searchPostsByName);
router.get('/search/title', postController.searchPostsByTitle);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 6c4686c99f7aaf71b75f7e7a56e1708fe8daa4d4
