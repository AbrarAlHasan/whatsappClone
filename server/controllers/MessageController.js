import getPrismaInstance from "../utils/PrismaClient.js";
import { renameSync } from "fs";

export const addMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { message, from, to } = req.body;
    const getUser = onlineUsers.get(to);

    if (message && from && to) {
      const newMessage = await prisma.messages.create({
        data: {
          message,
          sender: { connect: { id: parseInt(from) } },
          receiver: { connect: { id: parseInt(to) } },
          messageStatus: getUser ? "delivered" : "sent",
        },
        include: { sender: true, receiver: true },
      });
      return res.status(201).send({ message: newMessage });
    }
    return res.status(400).send("From, To and Message is required");
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();

    const { from, to } = req.params;

    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { senderId: parseInt(from), receiverId: parseInt(to) },
          { senderId: parseInt(to), receiverId: parseInt(from) },
        ],
      },
      orderBy: {
        id: "asc",
      },
    });
    const unreadMessages = [];
    messages.forEach((message, index) => {
      if (
        message.messageStatus !== "read" &&
        message.senderId === parseInt(to)
      ) {
        messages[index].messageStatus = "read";
        unreadMessages.push(message.id);
      }
    });
    await prisma.messages.updateMany({
      where: {
        id: { in: unreadMessages },
      },
      data: { messageStatus: "read" },
    });
    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
};

export const addImageMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      
      const prisma = getPrismaInstance();
      const { from, to } = req.query;
      const getUser = onlineUsers.get(to);
      if (from && to) {
        const message = await prisma.messages.create({
          data: {
            message: fileName,
            type: "image",
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
            messageStatus: getUser ? "delivered" : "sent",
          },
        });
        return res.status(201).json({ message });
      }
      return res.status(400).send("From & to is required");
    }
    return res.status(400).send("Image is Required");
  } catch (err) {
    next(err);
  }
};


export const addAudioMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = "uploads/recordings/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      
      const prisma = getPrismaInstance();
      const { from, to } = req.query;
      const getUser = onlineUsers.get(to);

      if (from && to) {
        const message = await prisma.messages.create({
          data: {
            message: fileName,
            type: "audio",
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
            messageStatus: getUser ? "delivered" : "sent",
          },
        });
        return res.status(201).json({ message });
      }
      return res.status(400).send("From & to is required");
    }
    return res.status(400).send("Audio is Required");
  } catch (err) {
    next(err);
  }
};
