type profile = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
};

async function Profile() {
  const API = "http://localhost:8000/profile";
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const prof: profile = await res.json();
  const detail = {
    name: prof.name,
    role: prof.role,
    email: prof.email,
    phone: prof.phone,
    location: prof.location,
    joinedDate: prof.joined,
  };
  return detail;
}

export default Profile;
