import { Button } from "@govtechmy/myds-react/button";
import HorizontalCard from "./HorizontalCard";
import { ArrowForwardIcon } from "@govtechmy/myds-react/icon";

interface KalendarItem {
  id: number;
  day: string;
  date: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

interface KalendarProps {
  kalendar: KalendarItem[];
  header?: string;
  title?: string;
}

export default function KalendarMyds({
  kalendar,
  header,
  title,
}: KalendarProps) {
  return (
    <div className="w-full flex flex-col py-16">
      <div className="flex flex-col gap-4">
        <div className="text-txt-primary font-body font-semibold text-sm tracking-[2.8px]">
          {header}
        </div>
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2">
          <div className="text-txt-black-900 font-heading font-semibold text-heading-sm">
            {title}
          </div>
          <Button variant="default-outline">
            Semua Acara <ArrowForwardIcon />
          </Button>
        </div>
      </div>
      <HorizontalCard totalPages={kalendar.length}>
        {kalendar.map((item) => (
          <div
            key={item.id}
            className="relative border border-otl-gray-200 rounded-lg p-3 h-[350px] !w-[248px] flex flex-shrink-0 flex-col gap-4.5 overflow-hidden"
          >
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className="absolute inset-0 w-full h-full object-cover rounded-[6px] z-0 "
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0)_100%)]"></div>
          </div>
        ))}
      </HorizontalCard>
    </div>
  );
}
