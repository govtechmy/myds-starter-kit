import CarouselMYDS from "./component/CarouselMYDS";
import MastHeadMYDS from "./component/MastHeadMYDS";
import NavbarMYDS from "./component/NavbarMYDS";
import FooterMYDS from "./component/FooterMYDS";
import SectionHeader from "./component/SectionHeader";
import { kalendar, pautanPopular, dataItemLinks } from "./contentData";
import SectionItemLinksMYDS from "./component/SectionItemLinksMYDS";

function App() {
  return (
    <div className="">
      <MastHeadMYDS />
      <NavbarMYDS />
      <BodyApp>
        <SectionHeader
          header="Siaran"
          children={
            <CarouselMYDS dataItemCalendar={kalendar} mainTitle={"Majlis yang bakal disambut tahun ini"} />
          }
          ButtonLabel="Semua Acara"
        />
        <SectionHeader
        header="PAUTAN PANTAS"
        title="Pautan Popular bagi Rakyat Awam"
        children={<SectionItemLinksMYDS dataItemLinks={dataItemLinks} />}
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
    <div className="mx-auto flex-1 px-[18px] sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] max-w-[1328px] p-8 flex w-full overflow-visible">
      <div className="w-full overflow-visible">
        {children}
      </div>
    </div>
  );
}
