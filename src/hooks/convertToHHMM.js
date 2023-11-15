// Convert minutes to HH:MM

const convertToHHMM = (totalMinutes, size = null) => {
  if (typeof totalMinutes !== "number" || totalMinutes < 0) {
    return null;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (size === "compact") {
    const formattedTime = `${hours}h ${minutes}m`;
    return formattedTime;
  } else {
    const formattedTime = `${hours} hrs ${minutes} mins`;
    return formattedTime;
  }
};

export default convertToHHMM;
