import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
    try {
        const { user_id } = req.params;
        const notifications = await Notification.find({ user_id});
        res.status(200).json(notifications);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to fetch notifications", error: error.message });
    }
}