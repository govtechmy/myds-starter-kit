import {
  Footer,
  SiteInfo,
  FooterSection,
  SiteLinkGroup,
  SiteLink,
  FooterLogo,
} from "@govtechmy/myds-react/footer";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterXIcon,
  YoutubeIcon,
} from "@govtechmy/myds-react/icon";
import { Link } from "@govtechmy/myds-react/link";

export default function MyFooter() {
  return (
    <Footer className="lg:!pt-12">
      <FooterSection>
        <SiteInfo>
          <div className="text-txt-black-900 flex items-center gap-x-2.5">
            <FooterLogo
              logoTitle={
                <p className="font-poppins text-body-md whitespace-nowrap font-semibold">
                  PortalMY
                </p>
              }
              logo={
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Coat_of_arms_of_Malaysia.svg/500px-Coat_of_arms_of_Malaysia.svg.png"
                  width={36}
                  alt="Malaysia Coat of Arms"
                  className="select-none"
                />
              }
            />
          </div>
          <p className="text-txt-black-700 text-body-sm not-prose">
            Aras 13, 14 & 15, Blok Menara, Menara Usahawan, No. 18, Persiaran
            Perdana, Presint 2, Pusat Pentadbiran Kerajaan Persekutuan, 62000
            Putrajaya, Malaysia
          </p>
          <p className="text-txt-black-900 text-body-sm font-semibold not-prose">
            Ikuti Kami
          </p>
          <div className="flex gap-3">
            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook link"
              underline="none"
              className="hover:text-txt-black-900"
            >
              <FacebookIcon className="text-txt-black-700" />
            </Link>
            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter link"
              underline="none"
              className="hover:text-txt-black-900"
            >
              <TwitterXIcon className="text-txt-black-700" />
            </Link>
            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram link"
              underline="none"
              className="hover:text-txt-black-900"
            >
              <InstagramIcon className="text-txt-black-700" />
            </Link>
            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube link"
              underline="none"
              className="hover:text-txt-black-900"
            >
              <YoutubeIcon className="text-txt-black-700" />
            </Link>
          </div>
        </SiteInfo>
        <SiteLinkGroup groupTitle="" className="w-[400px]">
          <SiteLink href="#"></SiteLink>
        </SiteLinkGroup>
        <div className="w-[200px]"></div>
        <SiteLinkGroup groupTitle="Tentang Kami" className="">
          <SiteLink href="#">Info Korporat</SiteLink>
          <SiteLink href="#">Siaran</SiteLink>
          <SiteLink href="#">Pencapaian</SiteLink>
          <SiteLink href="#">Dokuman Dasar</SiteLink>
          <SiteLink href="#">Direktori</SiteLink>
          <SiteLink href="#">Hubungi Kami</SiteLink>
        </SiteLinkGroup>
        <SiteLinkGroup groupTitle="Capaian Pantas">
          <SiteLink href="#">SpotMe</SiteLink>
          <SiteLink href="#">MyGovUC</SiteLink>
          <SiteLink href="#">DDMS</SiteLink>
          <SiteLink href="#">MyMesyuarat</SiteLink>
          <SiteLink href="#">ePenyata Gaji</SiteLink>
          <SiteLink href="#">HRMIS</SiteLink>
          <SiteLink href="#">ePerolehan</SiteLink>
        </SiteLinkGroup>
        <SiteLinkGroup groupTitle="Sumber Terbuka">
          <SiteLink href="#">Frontend: NextJS</SiteLink>
          <SiteLink href="#">Backend: NodeJS</SiteLink>
        </SiteLinkGroup>
      </FooterSection>
      <FooterSection className="text-txt-black-500 md:max-lg:gap-4.5 mx-auto flex w-full max-w-[1280px] flex-col justify-between border-none text-sm max-md:gap-4 lg:flex-row lg:gap-6">
        <div className="flex flex-col gap-3 lg:flex-row">
          <p>Hak Cipta Pelihara © 2024</p>
          <p className="hidden lg:inline">|</p>
          <div className="text-txt-black-700 flex flex-grow flex-row gap-3">
            <a href="#">Dasar Privasi</a>
            <a href="#">Terma Penggunaan</a>
          </div>
        </div>
        <p>Kemaskini Terakhir: 12 Jun 2024</p>
      </FooterSection>
    </Footer>
  );
}
