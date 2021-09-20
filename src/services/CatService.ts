import axiosService from "./axiosService";
import ICatData from "../types/Cat";

const getAll = () => {
  return axiosService.get("/cats");
};

const get = (id: any) => {
  return axiosService.get(`/cats/${id}`);
};

const create = (data: ICatData) => {
  return axiosService.post("/cats", data);
};

const remove = (id: any) => {
  return axiosService.delete(`/cats/${id}`);
};

const CatService = {
  getAll,
  get,
  create,
  remove
};

export default CatService;