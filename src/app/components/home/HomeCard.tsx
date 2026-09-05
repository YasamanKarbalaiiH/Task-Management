import Ongoing from "../../img/icons8-in-progress-50.png";
import Process from "../../img/icons8-process-50.png";
import Complete from "../../img/icons8-complete-50.png";
import Cancel from "../../img/icons8-cancel-48.png";
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
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-purple">{item.title}</p>

              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-800">
                  {item.value}
                </span>

                <span className="mb-1 text-xs text-text-secondary">Tasks</span>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
              <Image width={24} height={24} src={item.icon} alt={item.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeCard;
