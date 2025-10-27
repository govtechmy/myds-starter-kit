import { Button } from "@govtechmy/myds-react/button";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowOutgoingIcon,
} from "@govtechmy/myds-react/icon";
import { useEffect, useState, useCallback } from "react";

type SiaranMYDSData = {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  url: string;
  information: string;
};

interface SiaranMYDSProps {
  dataItemSiaran: SiaranMYDSData[];
  jsonData?: string;
  header?: string;
}

export default function SiaranMYDS({
  dataItemSiaran,
  jsonData,
  header,
}: SiaranMYDSProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [data, setData] = useState<SiaranMYDSData[]>([]);

  useEffect(() => {
    if (dataItemSiaran && dataItemSiaran.length > 0) {
      setData(dataItemSiaran);
    } else if (jsonData) {
      try {
        const parsedData = JSON.parse(jsonData);
        setData(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch (error) {
        console.error("Invalid JSON data provided:", error);
        setData([]);
      }
    } else {
      setData([]);
    }
  }, [dataItemSiaran, jsonData]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current || isTransitioning || !data.length) return;

      setIsTransitioning(true);
      setCurrent(index);

      setTimeout(() => setIsTransitioning(false), 100);
    },
    [current, isTransitioning, data.length]
  );

  const goToPrevious = useCallback(() => {
    if (current > 0) {
      const newIndex = current - 1;
      goToSlide(newIndex);
    }
  }, [current, goToSlide]);

  const goToNext = useCallback(() => {
    if (current < data.length - 1) {
      const newIndex = current + 1;
      goToSlide(newIndex);
    }
  }, [current, data.length, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && current > 0) {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight" && current < data.length - 1) {
        event.preventDefault();
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [current, data.length, goToPrevious, goToNext]);

  const currentItem = data[current];

  if (!data || data.length === 0) {
    return <div className="w-full py-12 lg:py-16">No data available</div>;
  }

  return (
    <div className="w-full py-12 lg:py-16">
      <div className="space-y-6">
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-12">
          <div className="flex flex-col justify-between lg:w-1/3 lg:py-[56px]">
            <div className="gap-[18px] flex flex-col">
              <div className="text-txt-primary font-body font-semibold text-sm tracking-[2.8px]">
                {header}
              </div>
              <h2 className="text-heading-sm font-bold font-heading text-txt-black-900 lg:text-3xl !mt-[0px]">
                {currentItem?.title}
              </h2>
              <p className="text-body-md font-normal text-txt-black-700 leading-relaxed">
                {currentItem?.information}
              </p>
            </div>
            <div className="mt-3">
              <Button
                variant="primary-fill"
                size="medium"
                className="rounded-full"
                onClick={() => window.open("https://www.google.com", "_blank")}
              >
                Ketahui lebih lanjut <ArrowOutgoingIcon />
              </Button>
            </div>
          </div>

          <div className="lg:w-2/3 relative">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="w-full flex-shrink-0 border border-otl-gray-200 overflow-hidden rounded-2xl"
                  >
                    <div className="relative">
                      <img
                        src={item?.image}
                        alt={item?.title || "Image"}
                        className="w-full object-cover sm:h-[450px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {data.length > 1 && (
          <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:justify-between px-4">
            <div className="flex gap-2">
              <Button
                variant="default-outline"
                size="medium"
                className="h-10 w-10 rounded-full"
                onClick={goToPrevious}
                disabled={current === 0}
                aria-label="Previous slide"
              >
                <ArrowBackIcon className="w-4 h-4 text-txt-black-700" />
              </Button>
              <Button
                variant="default-outline"
                size="medium"
                className="h-10 w-10 rounded-full"
                onClick={goToNext}
                disabled={current === data.length - 1}
                aria-label="Next slide"
              >
                <ArrowForwardIcon className="w-4 h-4 text-txt-black-700" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-4 h-2 bg-primary-600"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => goToSlide(i)}
                  disabled={isTransitioning}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
