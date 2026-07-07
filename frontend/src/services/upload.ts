import api from "./api";

export const uploadPDF = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getFiles = async () => {
  const response = await api.get("/upload/files");
  return response.data;
};

export const deleteFile = async (filename: string) => {
  const response = await api.delete(`/upload/${encodeURIComponent(filename)}`);
  return response.data;
};