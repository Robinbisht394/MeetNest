const eventModel = require("../Model/eventModel");
const userModel = require("../Model/userModel");
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
  const { user } = req;

  try {
    const eventData = await eventModel
      .find({ _id: eventId })
      .populate("owner", "name")
      .populate("participants", "name")
      .lean();
    //   return if no event created by user
    if (!eventData) {
      return res.status(404).json({ message: `No event for ${eventId}` });
    }

    const userData = await userModel.findById(user._id).select("saved");
    const savedEvents = userData?.saved || [];
    const userId = user._id.toString();

    const updatedEvent = eventData.map((event) => ({
      ...event,
      isLiked: event.likes.some((like) => like.toString() === userId),
      isSaved: savedEvents.some(
        (savedId) => savedId.toString() === event._id.toString()
      ),
    }));

    return res.status(200).json({ events: updatedEvent });
  } catch (err) {
    console.log("event fetching", err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// attendee event controller

const registerForEvent = async (req, res) => {
  // attendee registers for event/meetups
  const { eventId } = req.body;
  const { user } = req;

  try {
    const participantsData = await eventModel
      .findById(eventId)
      .select("participants");
    // if user already participated
    if (participantsData.participants.includes(user._id)) {
      return res.status(400).json({ message: "Already Partcipated" });
    }

    // add a user to partcipants list
    const register = await eventModel.updateOne(
      { _id: eventId },
      { $push: { participants: user._id } }
    );
    // if register fails
    if (!register)
      return res.status(300).json({ message: "Couldn't register for event" });
    // if registers successfull
    return res.status(200).json({ message: "Registered Successfully" });
  } catch (err) {
    console.error("register event", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEvents = async (req, res) => {
  const { user } = req;

  try {
    // fetch saved events for user
    const userData = await userModel.findById(user._id).select("saved");
    const savedEvents = userData?.saved || [];

    // fetch all events
    const events = await eventModel.find().lean();
    const userId = user._id.toString();

    //  enrich with isLiked & isSaved
    const enrichedEvents = events.map((event) => ({
      ...event,
      isLiked: event.likes.some((like) => like.toString() === userId),
      isSaved: savedEvents.some(
        (savedId) => savedId.toString() === event._id.toString()
      ),
    }));

    res.status(200).json(enrichedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// add a like

const updateEventLike = async (req, res) => {
  const { eventId } = req.body;
  const { user } = req;

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
      res.status(200).json({ message: "liked", isLiked: true });
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

// get all the likes for an event
const getEventLikes = async (req, res) => {
  const { eventId } = req.params;
  try {
    if (!eventId)
      return res.status(404).json({ message: "event ID not found" });
    const eventLikes = await eventModel
      .findById(eventId)
      .select("likes")
      .populate({ path: "likes", select: "name" });

    res.status(200).json(eventLikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// get all particpants list for event
const getEventPartcipants = async (req, res) => {
  const { eventId } = req.params;
  try {
    if (!eventId)
      return res.status(404).json({ message: "event ID not found" });
    const eventPartcipants = await eventModel
      .findById(eventId)
      .select("partcipants")
      .populate({ path: "participants", select: "name email" });

    res.status(200).json({ status: "success", eventPartcipants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOragnizerEventById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const event = await eventModel
      .findById(id)
      .select("eventName description date venue");

    res.status(200).json(event);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  removeEvent,
  fetchEvents,
  registerForEvent,
  getEvents,
  fetchEventById,
  updateEventLike,
  eventSearch,
  getEventLikes,
  getEventPartcipants,
  getOragnizerEventById,
};
