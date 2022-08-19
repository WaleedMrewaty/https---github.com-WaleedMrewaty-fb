import axios from "axios";

const FbApiInstance = axios.create({
  baseURL: "https://graph.facebook.com/v14.0",
});

export default FbApiInstance;
