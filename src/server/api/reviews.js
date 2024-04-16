const express = require("express");
const router = express.Router();
const prisma = require("../client");
const { verify } = require("../util");

// Create a new review for a car
router.post("/car/:id", verify, async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ error: "Rating must be an integer between 1 and 5" });
  }

  try {
    const review = await prisma.review.create({
      data: {
        comment,
        rating,
        userId: req.user.id,
        carId: +id,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a review
router.put("/review/:id", verify, async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ error: "Rating must be an integer between 1 and 5" });
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
    if (!review || review.userId !== req.user.id) {
      return res
        .status(404)
        .json({ error: "Review not found or unauthorized" });
    }
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { comment, rating },
    });
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a review
router.delete("/review/:id", verify, async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
    if (!review || review.userId !== req.user.id) {
      return res
        .status(404)
        .json({ error: "Review not found or unauthorized" });
    }
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Write a comment on a review
router.post("/reviews/:reviewId/comments", verify, async (req, res) => {
  const { reviewId } = req.params;
  const { text } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        reviewId: parseInt(reviewId),
        userId: req.user.id,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error writing comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// View all comments written by the authenticated user
router.get("/comments", verify, async (req, res) => {
  try {
    const userId = req.user.id;
    const userComments = await prisma.comment.findMany({
      where: { userId },
    });
    res.json(userComments);
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Edit a comment by its ID
router.put("/comments/:commentId", verify, async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await prisma.comment.update({
      where: { id: parseInt(commentId) },
      data: { text },
    });
    res.json(comment);
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a comment by its ID
router.delete("/comments/:commentId", verify, async (req, res) => {
  const { commentId } = req.params;

  try {
    await prisma.comment.delete({
      where: { id: parseInt(commentId) },
    });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
