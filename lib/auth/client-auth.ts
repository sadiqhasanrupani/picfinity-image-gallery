export const getAccessToken = () => {
  const jwtToken =
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

  return jwtToken;
};

export const removeToken = () => {
  const removeToken =
    typeof window !== "undefined" ? localStorage.removeItem("jwtToken") : null;

  return removeToken;
};
