"use server";

import { getToken } from "./getToken";

export const myFetch = async (
  url,
  { method = "GET", body, tags, token, headers = {}, cache, revalidate } = {}
) => {
  const accessToken = await getToken();

  const isFormData = body instanceof FormData;
  const hasBody = body !== undefined && method !== "GET";

  const reqHeaders = {
    Accept: "application/json",
    ...headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(token ? { Authorization: `${token}` } : {}),
  };

  const nextOptions = {};
  if (tags) nextOptions.tags = tags;
  if (typeof revalidate === "number") nextOptions.revalidate = revalidate;

  const fetchOptions = {
    method,
    headers: reqHeaders,
    ...(hasBody && { body: isFormData ? body : JSON.stringify(body) }),
    ...(Object.keys(nextOptions).length > 0 && { next: nextOptions }),
  };

  if (cache) {
    fetchOptions.cache = cache;
  } else if (revalidate === undefined && method === "GET") {
    fetchOptions.cache = "no-store";
  } else if (method !== "GET") {
    fetchOptions.cache = "no-store";
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}${url}`, fetchOptions);

    const data = await response.json();

    if (response.ok) {
      return {
        success: data?.success ?? true,
        message: data?.message,
        data: data?.data,
        pagination: data?.pagination,
        error: null,
      };
    }

    return {
      success: false,
      message: data?.message,
      data: null,
      error: data?.errorMessages || "Request failed",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Network error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
