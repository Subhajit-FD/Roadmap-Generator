import api from "./axios.config";

export const generateReport = async (formData: FormData) => {
  try {
    const response = await api.post("/interview/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Generate report error:", error);
    throw error;
  }
};

export const getReportById = async (id: string) => {
  try {
    const response = await api.get(`/interview/report/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get report error:", error);
    throw error;
  }
};

export const getAllReports = async () => {
  try {
    const response = await api.get("/interview/");
    return response.data;
  } catch (error) {
    console.error("Get all reports error:", error);
    throw error;
  }
};
