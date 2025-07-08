import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavItem {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}
