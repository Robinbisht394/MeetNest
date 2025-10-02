const eventModel = require("../Model/eventModel");
const userModel = require("../Model/userModel");

// event creation
const createEvent = async (req, res) => {
  const { eventName, date, venue, isOnline, banner, description } = req.body;
  const { user } = req;
  try {
    // if user not provided
    if (!user)
      return res.status(401).json({
        success: "false",
        error: { code: "Unauthorized", message: "Authentication required" },
      });

    const event = await eventModel({
      eventName,
      date,
      venue,
      isOnline: isOnline || false,
      banner: banner || "",
      owner: user._id,
      description: description,
    });
    await event.save();

    //  if event not created
    if (!event)
      return res
        .status(400)
        .json({ sucess: false, message: "Event couldn't created" });

    //successful event creation
    return res.status(201).json({
      success: true,
      event: event,
      message: "Event scheduled successfully",
    });
  } catch (err) {
    console.log({ Api: "event creation", error: err.message });
    // Error response
    res.status(500).json({
      success: false,
      error: {
        message: "Something went wrong try again !",
        code: "Internal server Error",
      },
    });
  }
};

// event updation
const updateEvent = async (req, res) => {
  const { eventId } = req.params;

  const { eventName, date, description, company, venue, isOnline } = req.body;

  try {
    //  if event params not present
    if (!eventId)
      return res.status(400).json({
        success: false,
        error: {
          code: "REQUEST_PARAMS_NOT_PRESENT",
          message: "Provide the request params",
        },
      });

    const event = await eventModel.find({ eventId });
    // if event not found
    if (!event)
      res.status(404).json({
        sucess: false,
        error: {
          code: "NOT_FOUND",
          message: `Event with ID ${eventId} not found`,
        },
      });
    // if sucessfull updation
    const updatedEvent = await eventModel.findByIdAndUpdate(eventId, {
      eventName: eventName,
      date: date,
      description: description,
      venue: venue,
      company: company,
      isOnline: isOnline,
    });

    return res.status(200).json({
      success: true,
      updateEvent: updatedEvent,
      message: "Event updated successfully",
    });
  } catch (err) {
    console.log({ Api: "event update", error: err.message });

    res.status(500).json({
      sucess: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went Wrong trey again !",
      },
    });
  }
};

// delete event
const removeEvent = async (req, res) => {
  const { eventId } = req.params;
  console.log(eventId);

  try {
    //  if event params not present
    if (!eventId)
      return res.status(400).json({
        success: false,
        error: {
          code: "REQUEST_PARAMS_NOT_PRESENT",
          message: "Provide the request params",
        },
      });

    const event = await eventModel.findByIdAndDelete(eventId);
    console.log(event);

    if (!event)
      // if event not found
      return res.status(404).json({
        sucess: false,
        error: { code: "NOT_FOUND", message: "Event not Found" },
      });
    // succesfull deletion
    return res
      .status(200)
      .json({ sucess: true, event, message: "Event deleted successfully" });
  } catch (err) {
    console.log({ Api: "Event deletion", error: err.message });
    res.status(500).json({
      succes: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong try again !",
    });
  }
};

// fetch all events created by logged in user/organiser
const fetchEvents = async (req, res) => {
  const { user } = req;

  try {
    // if user not authorized
    if (!user)
      return res.status(400).json({
        success: false,
        code: "Unauthorized_user",
        message: "provide user credentials",
      });

    const eventByUser = await eventModel.find({ owner: { $eq: user._id } });

    //   return if no event created by user
    if (!eventByUser.length)
      return res.status(200).json({
        sucess: true,
        code: "NO_Events",
        message: "No events by User",
      });
    // successfull event fetching
    return res.status(200).json({
      sucess: true,
      events: eventByUser,
      message: "Events fetched succesfully",
    });
  } catch (err) {
    console.log({ Api: "event fetch", error: err.message });

    res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong try again !",
    });
  }
};

// fetch event by Id
const fetchEventById = async (req, res) => {
  const { eventId } = req.params;
  const { user } = req;

  try {
    if (!eventId)
      return res.status(403).json({
        sucess: false,
        code: "REQUEST_PARAMS_NOT_PRESENT",
        message: "Provide Request Params",
      });

    // if user not provided
    if (!user)
      return res.status(404).json({
        sucess: false,
        code: "USER_NOT_AUTHORIZED",
        message: "User is Empty",
      });

    const eventData = await eventModel
      .find({ _id: eventId })
      .populate("owner", "name")
      .populate("participants", "name")
      .lean();
    //   return if no event created by user
    if (!eventData) {
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: `No event found for ${eventId}`,
      });
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

    return res.status(200).json({
      success: true,
      events: updatedEvent,
      message: "Event Details fetched successfully",
    });
  } catch (err) {
    console.log({ api: "event fetching", error: err.message });
    res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong try again !",
    });
  }
};

// attendee event controller

const registerForEvent = async (req, res) => {
  // attendee registers for event/meetups
  const { eventId } = req.body;
  const { user } = req;

  try {
    if (!eventId)
      return res.status(403).json({
        sucess: false,
        code: "REQUEST_PARAMS_NOT_PRESENT",
        message: "Provide Request Params",
      });

    // if user not provided
    if (!user)
      return res.status(404).json({
        sucess: false,
        code: "USER_NOT_AUTHORIZED",
        message: "User is Empty",
      });

    const participantsData = await eventModel
      .findById(eventId)
      .select("participants");
    // if user already participated
    if (participantsData.participants.includes(user._id)) {
      return res.status(400).json({
        success: false,
        code: "BAD_REQUEST",
        message: "Registered Already",
      });
    }

    // add a user to partcipants list
    const register = await eventModel.updateOne(
      { _id: eventId },
      { $push: { participants: user._id } }
    );
    // if register fails
    if (!register)
      return res.status(300).json({
        success: false,
        code: "FAILED",
        message: "Failed to Register",
      });
    // if registers successfull
    return res
      .status(200)
      .json({ success: true, message: "Registered Successfully" });
  } catch (err) {
    console.error({ api: "register event", error: err.message });
    return res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal Server Error",
    });
  }
};

const getEvents = async (req, res) => {
  const { user } = req;

  try {
    if (!user)
      return res.status(400).json({
        success: false,
        code: "UNAUTHORIZED_USER",
        message: "User not authorized",
      });
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
    if (!events)
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Events not found",
      });
    res.status(200).json(enrichedEvents);
  } catch (err) {
    console.error({ api: "list events", error: err.message });
    res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch events",
    });
  }
};

// add a like

const updateEventLike = async (req, res) => {
  const { eventId } = req.body;
  const { user } = req;

  try {
    if (!eventId)
      return res.status(403).json({
        sucess: false,
        code: "REQUEST_PARAMS_NOT_PRESENT",
        message: "Provide Request Params",
      });

    // if user not provided
    if (!user)
      return res.status(404).json({
        sucess: false,
        code: "USER_NOT_AUTHORIZED",
        message: "User is Empty",
      });

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
      res.status(200).json({ success: true, message: "liked", isLiked: true });
    } else {
      await eventModel.findByIdAndUpdate(eventId, {
        $pull: { likes: user._id },
      });
      res
        .status(200)
        .json({ success: true, message: "unLiked", isLiked: false });
    }
  } catch (err) {
    console.log({ api: "liked api", error: err.message });
    res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong try again !",
    });
  }
};

const eventSearch = async (req, res) => {
  const { q } = req.query;

  try {
    if (!q || !q.length)
      return res.status(400).json({
        success: false,
        code: "SEARCH_QUERY_NOT_PRESENT",
        message: "Provide the Search query",
      });
    const events = await eventModel
      .find({
        $or: [
          { eventName: { $regex: q, $options: "i" } },
          { venue: { $regex: q, $options: "i" } },
        ],
      })
      .select("eventName");
    if (!events)
      res.status(404).json({
        succes: false,
        code: "NOT_FOUND",
        message: `No results for search ${q}`,
      });
    res.status(200).json({
      success: true,
      events,
      message: `Fetched Search Results for ${q}`,
    });
  } catch (err) {
    console.log({ api: "search api", error: err.message });
    res.status(500).json({
      sucess: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "something went wrong",
    });
  }
};

// get all the likes for an event
const getEventLikes = async (req, res) => {
  const { eventId } = req.params;
  try {
    // if request params not present
    if (eventId)
      return res.status(400).json({
        success: false,
        code: "REQUEST_PARAMS_NOT_PRESENT",
        message: "provide request params",
      });

    const eventLikes = await eventModel
      .findById(eventId)
      .select("likes")
      .populate({ path: "likes", select: "name" });
    //  if event not found
    if (!eventLikes)
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Event not found",
      });
    // successfull
    res
      .status(200)
      .json({ sucess: true, eventLikes, message: "event likes fetched" });
  } catch (err) {
    console.log({ Api: "event likes", error: err.message });
    res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server Error",
    });
  }
};

// get all particpants list for event
const getEventPartcipants = async (req, res) => {
  const { eventId } = req.params;
  try {
    if (!eventId)
      return res.status(404).json({
        success: false,
        code: "REQUEST_PARAMS_NOT_PRESNT",
        message: "Provide request params",
      });

    const eventPartcipants = await eventModel
      .findById(eventId)
      .select("partcipants")
      .populate({ path: "participants", select: "name email" });
    // if no participants/registration
    if (!eventPartcipants)
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "No event participants",
      });

    res.status(200).json({ success: true, eventPartcipants });
  } catch (err) {
    console.log({ Api: "event participants", error: err.message });
    res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong try again !",
    });
  }
};

// get organizer event By Id
const getOragnizerEventById = async (req, res) => {
  const { id } = req.params;

  try {
    // if id params not present
    if (!id)
      return res.status(404).json({
        success: false,
        code: "REQUEST_PARAMS_NOT_PRESENT",
        message: "provide the request params",
      });

    const event = await eventModel
      .findById(id)
      .select("eventName description date venue");

    // if event not found
    if (!event)
      return res
        .status(404)
        .json({ sucess: false, code: "NOT_FOUND", message: "Event Not found" });

    // successful fetch
    res
      .status(200)
      .json({ success: true, event, message: "Event fetched successfully" });
  } catch (err) {
    console.log({ Api: "event details fetched", error: err.message });
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "something went wrong try again !",
      },
    });
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
