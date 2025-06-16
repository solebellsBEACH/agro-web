import { LeafIcon ,AppWindow, ChartPie, HomeIcon, type LucideIcon } from "lucide-react";

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
          {
            title: "Plantações",
            url: "/dashboard/crops",
            icon: LeafIcon,
          },
        ],
      },
    ],
  },
];
