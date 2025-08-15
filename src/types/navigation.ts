export interface NavigationPage {
  path: string;
  title?: string;
}

export interface NavigationGroup {
  group: string;
  icon?: string;
  tag?: string;
  pages: (string | NavigationGroup)[];
}

export interface NavigationTab {
  tab: string;
  icon?: string;
  href?: string;
  pages?: (string | NavigationGroup)[];
  menu?: NavigationMenuItem[];
}

export interface NavigationMenuItem {
  item: string;
  icon?: string;
  description?: string;
  pages?: (string | NavigationGroup)[];
  groups?: NavigationGroup[];
}

export interface NavigationAnchor {
  anchor: string;
  icon?: string;
  href?: string;
  pages?: (string | NavigationGroup)[];
}

export interface NavigationDropdown {
  dropdown: string;
  icon?: string;
  href?: string;
  pages?: (string | NavigationGroup)[];
}

export interface NavigationVersion {
  version: string;
  groups: NavigationGroup[];
}

export interface NavigationLanguage {
  language: string;
  groups: NavigationGroup[];
}

export interface GlobalNavigation {
  anchors?: NavigationAnchor[];
}

export interface NavigationConfig {
  pages?: string[];
  groups?: NavigationGroup[];
  tabs?: NavigationTab[];
  anchors?: NavigationAnchor[];
  dropdowns?: NavigationDropdown[];
  versions?: NavigationVersion[];
  languages?: NavigationLanguage[];
  global?: GlobalNavigation;
}

export interface NavigationItem {
  id: string;
  type: 'page' | 'group' | 'tab' | 'anchor' | 'dropdown' | 'version' | 'language';
  data: NavigationPage | NavigationGroup | NavigationTab | NavigationAnchor | NavigationDropdown | NavigationVersion | NavigationLanguage;
  children?: NavigationItem[];
  parentId?: string;
}

export interface IconOption {
  value: string;
  label: string;
  icon: string;
}
