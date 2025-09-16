export const checkParticipation = (event, user) => {
  console.log(event, user);

  if (!Array.isArray(event.participants) || !user || !event.participants.length)
    return false;
  if (event?.participants.includes(user._id)) {
    console.log("found");
  }
};
