import type { LoginPayload, RegisterPayload, User } from "../types/auth";

const BASE_URL = "http://localhost:3001";

const API_URL = `${BASE_URL}/users`;

export async function loginUser(payload: LoginPayload): Promise<User> {
  const query = new URLSearchParams({
    email: payload.email,
    password: payload.password,
  });
  const response = await fetch(`${API_URL}?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Login failed!");
  }
  const users: User[] = await response.json();
  const user = users[0];

  if (!user) {
    throw new Error("Invalid email or password!");
  }
  return user;
}

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const emailCheckResponse = await fetch(
    `${API_URL}?email=${encodeURIComponent(payload.email)}`,
  );
  if (!emailCheckResponse.ok) {
    throw new Error("Email validation failed!");
  }
  const existingUsers: User[] = await emailCheckResponse.json();
  if (existingUsers.length > 0) {
    throw new Error("Email already exists!");
  }
  const newUser: Omit<User, "id"> = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  };
  const createResponse = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!createResponse.ok) {
    throw new Error("Failed to register user!");
  }
  const user: User = await createResponse.json();
  return user;
}
