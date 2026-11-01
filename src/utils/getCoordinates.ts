function getCoordinates() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.longitude, position.coords.latitude]);
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

export default getCoordinates;