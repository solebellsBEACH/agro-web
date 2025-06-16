import {
  LeafIcon,
  UserRound,
  ChartPie,
  HomeIcon,
  type LucideIcon,
} from "lucide-react";

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
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
    id: 2,
    items: [
      {
        title: "Default",
        url: "/dashboard/default",
        icon: ChartPie,
      },
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
      {
        title: "Produtores",
        url: "/dashboard/producers",
        icon: UserRound,
      },
    ],
  },
];
