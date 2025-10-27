import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Link } from "@govtechmy/myds-react/link";
import { useEffect, useState } from "react";

type SiaranMYDSData = {
    id: number;
    category: string;
    title: string;
    date: string;
    image: string;
    url: string;
    information: string;
}

export default function SiaranMYDS({
  dataItemSiaran
}: {
  dataItemSiaran: SiaranMYDSData[];
}) {
  const [carouselState, setCarouselState] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselState) return;

    setCurrent(carouselState.selectedScrollSnap());
    carouselState.on("select", () => {
      setCurrent(carouselState.selectedScrollSnap());
    });
  }, [carouselState]);

  const currentItem = dataItemSiaran[current];

  return (
    <div className="w-full py-12 lg:py-16">
      <Carousel
        setApi={setCarouselState}
        className="space-y-6"
      >
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-12">
            <div className=" flex flex-col justify-between lg:w-1/3">
            <div className="space-y-3 sm:space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
              {currentItem.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {currentItem.information}
            </p>
          </div> 
          <Link href={currentItem.url} target="_blank" rel="noopener noreferrer" className="pt-10">Ketahui lebih lanjut </Link>
          </div>
          

          {/* Carousel Images Section */}
          <div className="lg:w-2/3">
            <CarouselContent className="rounded-2xl overflow-hidden shadow-lg">
              {dataItemSiaran.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover sm:h-[450px]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:justify-between px-4">
          <div className="flex gap-3">
            <CarouselPrevious className="static h-10 w-10 rounded-full border-2 border-gray-300 hover:bg-gray-100" />
            <CarouselNext className="static h-10 w-10 rounded-full border-2 border-gray-300 hover:bg-gray-100" />
          </div>

          <div className="flex items-center gap-2">
            {dataItemSiaran.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-4 h-2 bg-primary-600"
                    : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}
