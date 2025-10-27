import { Link } from "@govtechmy/myds-react/link";
import { Button } from "@govtechmy/myds-react/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@govtechmy/myds-react/icon";
import { useEffect, useState, useCallback } from "react";

type SiaranMYDSData = {
    id: number;
    category: string;
    title: string;
    date: string;
    image: string;
    url: string;
    information: string;
}

interface SiaranMYDSProps {
  dataItemSiaran: SiaranMYDSData[];
  jsonData?: string;
}

export default function SiaranMYDS({
  dataItemSiaran,
  jsonData,
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
        console.error('Invalid JSON data provided:', error);
        setData([]);
      }
    } else {
      setData([]);
    }
  }, [dataItemSiaran, jsonData]);

  const goToSlide = useCallback((index: number) => {
    if (index === current || isTransitioning || !data.length) return;
    
    setIsTransitioning(true);
    setCurrent(index);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [current, isTransitioning, data.length]);

  const goToPrevious = useCallback(() => {
    const newIndex = current === 0 ? data.length - 1 : current - 1;
    goToSlide(newIndex);
  }, [current, data.length, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = current === data.length - 1 ? 0 : current + 1;
    goToSlide(newIndex);
  }, [current, data.length, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  const currentItem = data[current];

  return (
    <div className="w-full py-12 lg:py-16">
      <div className="space-y-6">
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-12">
          <div className="flex flex-col justify-between lg:w-1/3">
            <div className="space-y-3 sm:space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                {currentItem.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentItem.information}
              </p>
            </div> 
            <Link href={currentItem.url} target="_blank" rel="noopener noreferrer" className="pt-10">
              Ketahui lebih lanjut
            </Link>
          </div>

          <div className="lg:w-2/3 relative">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {data.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
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
            <div className="flex gap-3">
              <Button
                variant="primary-outline"
                size="medium"
                className="h-10 w-10 rounded-full border-2 border-gray-300 hover:bg-gray-100"
                onClick={goToPrevious}
                disabled={isTransitioning}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="primary-outline"
                size="medium"
                className="h-10 w-10 rounded-full border-2 border-gray-300 hover:bg-gray-100"
                onClick={goToNext}
                disabled={isTransitioning}
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-4 h-4" />
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
