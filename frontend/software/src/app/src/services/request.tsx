const GetRequest = async (path: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

const PostRequest = async <T extends Record<string, unknown>>(
  path: string,
  body: T
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
};

export { GetRequest, PostRequest };
