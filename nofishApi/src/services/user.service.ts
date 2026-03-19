import mongoose from "mongoose";
import User from "../models/user.model";
import { IUser } from "../models/user.model";

class UserService {
  // Get potential matches (Discovery)
  async getDiscovery(userId: string): Promise<IUser[]> {
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      throw new Error("User not found");
    }

    const excludeIds = [
      new mongoose.Types.ObjectId(userId),
      ...currentUser.likes,
      ...currentUser.dislikes,
    ];

    // Simple discovery: Find users not swiped on yet
    return await User.find({
      _id: { $nin: excludeIds },
    }).limit(20);
  }

  // Handle Swipe Logic
  async processSwipe(
    userId: string,
    targetId: string,
    direction: "left" | "right"
  ): Promise<{ match: boolean }> {
    if (direction === "left") {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { dislikes: targetId },
      });

      return { match: false };
    }

    // If Right Swipe (Like)
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likes: targetId },
    });

    // Check for a Match
    const targetUser = await User.findById(targetId);

    if (!targetUser) {
      throw new Error("Target user not found");
    }

    if (targetUser.likes.includes(new mongoose.Types.ObjectId(userId))) {
      // Create a match for both
      await User.findByIdAndUpdate(userId, {
        $addToSet: { matches: targetId },
      });

      await User.findByIdAndUpdate(targetId, {
        $addToSet: { matches: userId },
      });

      return { match: true };
    }

    return { match: false };
  }
}

export default new UserService();
