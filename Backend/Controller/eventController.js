const eventModel = require("../Model/eventModel");

// event creation
const createEvent = async (req, res) => {
  const { eventName, date, venue, isOnline, banner, description } = req.body;

  try {
    const event = await eventModel({
      eventName,
      date,
      venue,
      isOnline: isOnline || false,
      banner: banner || "",
      owner: req.user.id,
      description: description,
    });
    await event.save();
    if (!event)
      return res.status(400).json({ message: "Event couldn't created" });
    return res
      .status(201)
      .json({ event: event, message: "event scheduled successfully" });
  } catch (err) {
    console.log("event creation", err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// event updation
const updateEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await eventModel.find({ eventId });

    if (!event)
      res.status(404).json({ message: `Event with ID ${eventId} not found` });
    const updatedEvent = await eventModel.findByIdAndUpdate(eventId, req.body);
    console.log(updatedEvent, "updated");

    return res.status(200).json({
      updateEvent: updatedEvent,
      message: "Event updated successfully",
    });
  } catch (err) {
    console.log("event update", err);

    res.status(500).json({ message: "Internal server Error" });
  }
};

// delete event

const removeEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await eventModel.findByIdAndDelete(eventId);

    if (!event) return res.status(404).json({ message: "Event not Found" });
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.log("event deletion", err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// fetch all events created by logged in user/organiser
const fetchEvents = async (req, res) => {
  const { user } = req;

  try {
    const eventByUser = await eventModel.find({ owner: { $eq: user.id } });

    //   return if no event created by user
    if (!eventByUser.length)
      return res.status(404).json({ message: "No events by User" });
    return res.status(200).json({ events: eventByUser });
  } catch (err) {
    console.log("event fetching", err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// fetch event by Id
const fetchEventById = async (req, res) => {
  const { eventId } = req.params;
  console.log("req", eventId);

  try {
    const event = await eventModel
      .find({ _id: eventId })
      .populate("owner", "name")
      .populate("participants", "name");
    //   return if no event created by user
    if (!event)
      return res.status(404).json({ message: `No event for ${eventId}` });
    return res.status(200).json({ events: event });
  } catch (err) {
    console.log("event fetching", err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// attendee event controller

const registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  const { user } = req;

  try {
    const register = await eventModel.updateOne(
      { _id: eventId },
      { $push: { participants: user._id } }
    );
    if (!register)
      return res.status(300).json({ message: "Couldn't register for event" });
    return res.status(200).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log("register event", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchEventsAll = async (req, res) => {
  try {
    const events = await eventModel
      .find({})
      .limit(20)
      .populate("owner", "name");

    if (!events) return res.status(404).json({ message: "No events found" });
    return res.status(200).json(events);
  } catch (err) {
    console.log("fetch events for attendee", err);
    res.status(500).json({ message: " server Error" });
  }
};

// add a like

const updateEventLike = async (req, res) => {
  const { eventId } = req.body;
  const { user } = req;
  console.log("req", user);

  try {
    let isLiked;
    // check if already liked
    const event = await eventModel.findOne({
      _id: eventId,
      likes: user._id,
    });
    if (event) isLiked = true;

    //update the like
    if (!isLiked) {
      //if not liked push
      const event = await eventModel.findByIdAndUpdate(eventId, {
        $push: { likes: user._id },
      });
      res.status(200).json({ message: "liked", isLiked: isLiked });
    } else {
      await eventModel.findByIdAndUpdate(eventId, {
        $pull: { likes: user._id },
      });
      res.status(200).json({ message: "unLiked", isLiked: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const eventSearch = async (req, res) => {
  const { q } = req.query;

  try {
    if (!q || !q.length) return;
    const events = await eventModel
      .find({
        $or: [
          { eventName: { $regex: q, $options: "i" } },
          { venue: { $regex: q, $options: "i" } },
        ],
      })
      .select("eventName");
    if (!events) res.status(404).json({ message: "No Event found" });
    res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong");
  }
};
module.exports = {
  createEvent,
  updateEvent,
  removeEvent,
  fetchEvents,
  registerForEvent,
  fetchEventsAll,
  fetchEventById,
  updateEventLike,
  eventSearch,
};
