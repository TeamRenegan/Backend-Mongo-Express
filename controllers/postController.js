const Post = require('../models/Post');
const {addImage} = require('../utils/awsS3upload');


// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    console.log(req.body);
    console.log(req.files);
        console.log(req.files);
    const image = req.files[0];
    console.log('printing req files',req.files[0]);
    let imglink  = null;

    if(image){
        console.log("Img exists");
        if (image.size > 5 * 1024 * 1024) {
            return res
              .status(400)
              .send({ message: "File size too large, max 5MB allowed" });
          }
          imglink = await addImage(image);
          console.log("camlink returned ",imglink);
    }

    let imgupld = imglink;

    const newPost = new Post({ name, title, description, imgupld });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post by ID
exports.updatePostById = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a post by ID
exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for posts by date
exports.searchPostsByDate = async (req, res) => {
    try {
      const { date } = req.query;
      const posts = await Post.find({ date: { $regex: date, $options: 'i' } });
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for the specified date' });
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Search for posts by name
  exports.searchPostsByName = async (req, res) => {
    try {
      const { name } = req.query;
      const posts = await Post.find({ name: { $regex: name, $options: 'i' } });
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found with the specified name' });
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Search for posts by title
  exports.searchPostsByTitle = async (req, res) => {
    try {
      const { title } = req.query;
      const posts = await Post.find({ title: { $regex: title, $options: 'i' } });
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found with the specified title' });
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
