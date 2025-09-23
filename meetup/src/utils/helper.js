export const checkParticipation = (event, user) => {
  if (!Array.isArray(event.participants) || !user || !event.participants.length)
    return false;
  const res = event.participants.some((part) => {
    if (part._id == user._id) return true;
  });
  return res;
};
