export type User = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

async function Users(): Promise<User[]> {
  const res = await fetch("http://localhost:8000/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: User[] = await res.json();

  return data;
}

export default Users;
