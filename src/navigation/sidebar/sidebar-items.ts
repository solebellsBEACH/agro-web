import { AppWindow, ChartPie, Fingerprint, HomeIcon, type LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Dashboards",
        url: "/dashboard",
        icon: AppWindow,
        subItems: [
          { title: "Default", url: "/dashboard/default", icon: ChartPie },
          {
            title: "Propriedades",
            url: "/dashboard/property",
            icon: HomeIcon,
          },
        ],
      },
    ],
  },
  // {
  //   id: 2,
  //   label: "Propriedades",
  //   items: [
  //     {
  //       title: "Propriedades",
  //       url: "/property",
  //       icon: HomeIcon,
  //     },
  //   ],
  // },
  //  {
  //   id: 3,
  //   label: "Pages",
  //   items: [
  //     {
  //       title: "Authentication",
  //       url: "/auth",
  //       icon: Fingerprint,
  //       subItems: [
  //         { title: "Login v1", url: "/auth/v1/login", newTab: true },
  //         { title: "Register v1", url: "/auth/v1/register", newTab: true },
  //       ],
  //     },
  //   ],
  // },
];
