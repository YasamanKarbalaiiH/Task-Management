interface alart {
  title: string;
  time: string;
  type: string;
}

async function Alart() {
  const res = await fetch("http://localhost:8000/notifications");
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data: alart[] = await res.json();
  const alarts = data.map((item) => ({
    title: item.title,
    time: item.time,
    type: item.type,
  }));
  return alarts;
}

export default Alart;
