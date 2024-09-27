import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmFmYWI5ZjYyNzlkZjBhODVhNGU4MzY3NWM1ZjYwMSIsIm5iZiI6MTcyNzE4NTYyMS4zNjExNCwic3ViIjoiNjZmMmJmNmY3MzAwYTViYTIxM2JmN2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.NctBLX_N_1Iz2fHzescZZpIHZQt1aSavLMjpfBFww9E",
  },
});

export default instance