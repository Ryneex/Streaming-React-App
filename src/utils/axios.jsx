import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzZkZGYxMjkwOTExOTRiNzY4MzMyNzI3Mjc4NWM2YiIsIm5iZiI6MTcyNzY5MjE2Ny41Mjg4Mywic3ViIjoiNjZmYTdjNmUxYzVkZjI1ZjEwZDAwMzBkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.JYglHDmDqOq2xyA-RURShAqsx6taqFCEca2MSFxA2_0",
  },
});

export default instance