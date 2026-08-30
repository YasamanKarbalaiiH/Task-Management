import Ongoing from "../img/icons8-in-progress-50.png";
import Process from "../img/icons8-process-50.png";
import Complete from "../img/icons8-complete-50.png";
import Cancel from "../img/icons8-cancel-48.png";
import Image from "next/image";
interface statsType {
  cancel: number;
  complete: number;
  ongoing: number;
  process: number;
}
interface HomeCardProps {
  stats: statsType;
}
function HomeCard({ stats }: HomeCardProps) {
  const cards = [
    {
      title: "Ongoing",
      value: stats.ongoing,
      icon: Ongoing,
    },
    {
      title: "Process",
      value: stats.process,
      icon: Process,
    },
    {
      title: "Complete",
      value: stats.complete,
      icon: Complete,
    },
    {
      title: "Cancel",
      value: stats.cancel,
      icon: Cancel,
    },
  ];
  return (
    <div className="mt-2 flex items-center flex-wrap">
      {cards.map((item) => (
        <div key={item.title} className="p-4 md:w-40">
          <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
            <Image width={20} height={20} src={item.icon} alt={item.title} />

            <p className="font-bold text-purple">{item.title}</p>

            <span className="text-xs text-text-secondary">
              {item.value} Tasks
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeCard;
