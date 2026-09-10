import type { CreateApplicationRequest } from "../../interface/request";
import { axiosClient } from "./api";

export const submitApplication = async (data: CreateApplicationRequest) => {
    const response = await axiosClient.post('/appliedJob', data);
    return response.data;
};