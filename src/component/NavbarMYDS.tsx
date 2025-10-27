import {
  Navbar,
  NavbarLogo,
  NavbarMenu,
  NavbarMenuItem,
  NavbarAction,
} from "@govtechmy/myds-react/navbar";
import { ThemeSwitch } from "@govtechmy/myds-react/theme-switch";
import { GlobeIcon, JataNegaraIcon } from "@govtechmy/myds-react/icon";
import { NavbarMenuData } from "../contentData";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@govtechmy/myds-react/select";
import { ThemeProvider } from "@govtechmy/myds-react/hooks";

export default function NavbarMyds() {
  return (
    <Navbar>
      <NavbarLogo src={""} alt={""}>
        <JataNegaraIcon />{" "}
        <span className="text-txt-black-900 font-semibold font-heading text-body-lg">PortalMY</span>
      </NavbarLogo>
      <NavbarMenu>
        {NavbarMenuData.map((item) => (
          <NavbarMenuItem key={item.id} href={item.url}>
            {item.title}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarAction>
        {/* Theme Switch */}
        <ThemeProvider>
          <ThemeSwitch as="toggle" />
        </ThemeProvider>
        
        {/* Select Language Toggle  : mobile hide if needed  */}
        <div className="hidden sm:block">
          <Select defaultValue="EN" variant="outline" size="small">
            <SelectTrigger aria-label="language-selection">
              <GlobeIcon className="h-4 w-4"></GlobeIcon>
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end" className="font-body rounded-[4px] py-1">
              <SelectItem value="EN">EN</SelectItem>
              <SelectItem value="BM">BM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </NavbarAction>
    </Navbar>
  );
}
