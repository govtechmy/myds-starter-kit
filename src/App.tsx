import CarouselMYDS from "./component/CarouselMYDS";
import MastHeadMYDS from "./component/MastHeadMYDS";
import NavbarMYDS from "./component/NavbarMYDS";
import FooterMYDS from "./component/FooterMYDS";
import SectionHeader from "./component/SectionHeader";
import { siaran } from "./contentData";

function App() {
  const dataItemCalendar = [
    {
      day: "SABTU",
      date: "15 FEB",
      title: "Hari Kanak-Kanak Sedunia",
      imageSrc: "/utama/calendaritem/1.png",
      imageAlt: "xxx",
    },
    {
      day: "ISNIN",
      date: "11 MAC",
      title: "Hari Sukan Malaysia 2025",
      imageSrc: "/utama/calendaritem/2.jpg",
      imageAlt: "xxx",
    },
    {
      day: "JUMAAT",
      date: "16 MEI",
      title: "Hari Guru Malaysia 2025",
      imageSrc: "/utama/calendaritem/3.jpg",
      imageAlt: "xxx",
    },
    {
      day: "ISNIN",
      date: "11 MAC",
      title: "Hari Bapa Malaysia 2025",
      imageSrc: "/utama/calendaritem/4.jpg",
      imageAlt: "xxx",
    },
    {
      day: "ISNIN",
      date: "11 MAC",
      title: "Hari Sukan Malaysia 2025",
      imageSrc: "/utama/calendaritem/2.jpg",
      imageAlt: "xxx",
    },
    {
      day: "JUMAAT",
      date: "16 MEI",
      title: "Hari Guru Malaysia 2025",
      imageSrc: "/utama/calendaritem/3.jpg",
      imageAlt: "xxx",
    },
    {
      day: "ISNIN",
      date: "11 MAC",
      title: "Hari Bapa Malaysia 2025",
      imageSrc: "/utama/calendaritem/4.jpg",
      imageAlt: "xxx",
    },
  ];

  return (
    <div className="">
      {/* Your app components go here */}
      <MastHeadMYDS />
      <NavbarMYDS />
      <BodyApp>
        <SectionHeader
          header="Siaran"
          children={
            <CarouselMYDS dataItemCalendar={dataItemCalendar} mainTitle={"Majlis yang bakal disambut tahun ini"} />
          }
          ButtonLabel="Semua Acara"
        />
      </BodyApp>
      <FooterMYDS />
    </div>
  );
}

export default App;

// // body design
// // uncomment below to use body design
function BodyApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex-1 px-[18px] sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] max-w-[1328px] p-8 flex w-full">
      {children}
    </div>
  );
}
