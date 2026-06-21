import api from "./api";

export const getDashboardSummary = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/dashboard/summary",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getRecentTransactions = async () => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    "/dashboard/recent",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getCategorySummary = async () => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    "/dashboard/categories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMonthlyAnalytics = async () => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    "/dashboard/monthly",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const addTransaction = async (data) => {

  const token = localStorage.getItem("token");

  const response = await api.post(
    "/transactions",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteTransaction = async (id) => {

  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/transactions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateTransaction = async (id, data) => {

  const token = localStorage.getItem("token");

  const response = await api.put(
    `/transactions/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};