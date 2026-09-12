export type profileType = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
  avatar: string;
};

async function Profiledata() {
  const API = "http://localhost:8000/profile";
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const prof: profileType = await res.json();
  const detail = {
    id: prof.id,
    name: prof.name,
    role: prof.role,
    email: prof.email,
    phone: prof.phone,
    location: prof.location,
    joined: prof.joined,
    avatar: prof.avatar,
  };
  return detail;
}

export default Profiledata;
