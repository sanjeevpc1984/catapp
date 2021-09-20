import axios from "axios";
import { CAT_API_URL } from "../utils/constant";

export default axios.create({
  baseURL: CAT_API_URL,
});