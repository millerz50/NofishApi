import { Request, Response } from "express"; // use NextApiRequest/NextApiResponse if on Next.js
import UserService from "../services/user/user.service";
import { sendResponse } from "../utils/sendResponse";

// Define request body types
interface DiscoveryRequestBody {
  userId: string;
}

interface SwipeRequestBody {
  userId: string;
  targetId: string;
  direction: "left" | "right";
}

// Get Discovery Profiles
export const getDiscovery = async (
  req: Request<{}, {}, DiscoveryRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body;

    const profiles = await UserService.getDiscovery(userId);

    sendResponse(res, 200, "Discovery profiles fetched", profiles);
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
};

// Handle Swipe
export const swipe = async (
  req: Request<{}, {}, SwipeRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { userId, targetId, direction } = req.body;

    const result = await UserService.processSwipe(
      userId,
      targetId,
      direction
    );

    const message = result.match ? "It's a Match!" : "Swipe recorded";

    sendResponse(res, 200, message, result);
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
};