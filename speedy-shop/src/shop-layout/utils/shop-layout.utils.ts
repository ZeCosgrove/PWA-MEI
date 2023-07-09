import axios from 'axios';

const key = 'pk.2704dfd688ab4558f83b8e9a01b06a35';

const getCityByCoordinates = async (lat, long) => {
  const res = await axios.get(
    `https://eu1.locationiq.com/v1/reverse?key=${key}&lat=${lat}&lon=${long}&format=json`,
  );
  return `${res.data.address.city}, ${res.data.address.state}`;
};

export { getCityByCoordinates };
