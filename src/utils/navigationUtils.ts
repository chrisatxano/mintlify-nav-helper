import { NavigationConfig, NavigationItem, NavigationGroup, NavigationTab, NavigationAnchor, NavigationDropdown, NavigationVersion, NavigationLanguage } from '../types/navigation';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const convertToNavigationItems = (config: NavigationConfig): NavigationItem[] => {
  const items: NavigationItem[] = [];

  // Convert pages
  if (config.pages) {
    config.pages.forEach((page, index) => {
      items.push({
        id: generateId(),
        type: 'page',
        data: { path: page },
        parentId: undefined
      });
    });
  }

  // Convert groups
  if (config.groups) {
    config.groups.forEach((group) => {
      const groupItem = convertGroupToItem(group);
      items.push(groupItem);
    });
  }

  // Convert tabs
  if (config.tabs) {
    config.tabs.forEach((tab) => {
      const tabItem = convertTabToItem(tab);
      items.push(tabItem);
    });
  }

  // Convert anchors
  if (config.anchors) {
    config.anchors.forEach((anchor) => {
      const anchorItem = convertAnchorToItem(anchor);
      items.push(anchorItem);
    });
  }

  // Convert dropdowns
  if (config.dropdowns) {
    config.dropdowns.forEach((dropdown) => {
      const dropdownItem = convertDropdownToItem(dropdown);
      items.push(dropdownItem);
    });
  }

  // Convert versions
  if (config.versions) {
    config.versions.forEach((version) => {
      const versionItem = convertVersionToItem(version);
      items.push(versionItem);
    });
  }

  // Convert languages
  if (config.languages) {
    config.languages.forEach((language) => {
      const languageItem = convertLanguageToItem(language);
      items.push(languageItem);
    });
  }

  return items;
};

const convertGroupToItem = (group: NavigationGroup, parentId?: string): NavigationItem => {
  const groupItem: NavigationItem = {
    id: generateId(),
    type: 'group',
    data: group,
    parentId,
    children: []
  };

  group.pages.forEach((page) => {
    if (typeof page === 'string') {
      groupItem.children!.push({
        id: generateId(),
        type: 'page',
        data: { path: page },
        parentId: groupItem.id
      });
    } else {
      const nestedGroup = convertGroupToItem(page, groupItem.id);
      groupItem.children!.push(nestedGroup);
    }
  });

  return groupItem;
};

const convertTabToItem = (tab: NavigationTab, parentId?: string): NavigationItem => {
  const tabItem: NavigationItem = {
    id: generateId(),
    type: 'tab',
    data: tab,
    parentId,
    children: []
  };

  if (tab.pages) {
    tab.pages.forEach((page) => {
      if (typeof page === 'string') {
        tabItem.children!.push({
          id: generateId(),
          type: 'page',
          data: { path: page },
          parentId: tabItem.id
        });
      } else {
        const nestedGroup = convertGroupToItem(page, tabItem.id);
        tabItem.children!.push(nestedGroup);
      }
    });
  }

  return tabItem;
};

const convertAnchorToItem = (anchor: NavigationAnchor, parentId?: string): NavigationItem => {
  const anchorItem: NavigationItem = {
    id: generateId(),
    type: 'anchor',
    data: anchor,
    parentId,
    children: []
  };

  if (anchor.pages) {
    anchor.pages.forEach((page) => {
      if (typeof page === 'string') {
        anchorItem.children!.push({
          id: generateId(),
          type: 'page',
          data: { path: page },
          parentId: anchorItem.id
        });
      } else {
        const nestedGroup = convertGroupToItem(page, anchorItem.id);
        anchorItem.children!.push(nestedGroup);
      }
    });
  }

  return anchorItem;
};

const convertDropdownToItem = (dropdown: NavigationDropdown, parentId?: string): NavigationItem => {
  const dropdownItem: NavigationItem = {
    id: generateId(),
    type: 'dropdown',
    data: dropdown,
    parentId,
    children: []
  };

  if (dropdown.pages) {
    dropdown.pages.forEach((page) => {
      if (typeof page === 'string') {
        dropdownItem.children!.push({
          id: generateId(),
          type: 'page',
          data: { path: page },
          parentId: dropdownItem.id
        });
      } else {
        const nestedGroup = convertGroupToItem(page, dropdownItem.id);
        dropdownItem.children!.push(nestedGroup);
      }
    });
  }

  return dropdownItem;
};

const convertVersionToItem = (version: NavigationVersion, parentId?: string): NavigationItem => {
  const versionItem: NavigationItem = {
    id: generateId(),
    type: 'version',
    data: version,
    parentId,
    children: []
  };

  version.groups.forEach((group) => {
    const groupItem = convertGroupToItem(group, versionItem.id);
    versionItem.children!.push(groupItem);
  });

  return versionItem;
};

const convertLanguageToItem = (language: NavigationLanguage, parentId?: string): NavigationItem => {
  const languageItem: NavigationItem = {
    id: generateId(),
    type: 'language',
    data: language,
    parentId,
    children: []
  };

  language.groups.forEach((group) => {
    const groupItem = convertGroupToItem(group, languageItem.id);
    languageItem.children!.push(groupItem);
  });

  return languageItem;
};

export const convertToNavigationConfig = (items: NavigationItem[]): NavigationConfig => {
  const config: NavigationConfig = {};

  const pages: string[] = [];
  const groups: NavigationGroup[] = [];
  const tabs: NavigationTab[] = [];
  const anchors: NavigationAnchor[] = [];
  const dropdowns: NavigationDropdown[] = [];
  const versions: NavigationVersion[] = [];
  const languages: NavigationLanguage[] = [];

  items.forEach((item) => {
    if (item.parentId) return; // Skip nested items, they'll be handled by their parents

    switch (item.type) {
      case 'page':
        pages.push((item.data as any).path);
        break;
      case 'group':
        groups.push(convertItemToGroup(item));
        break;
      case 'tab':
        tabs.push(convertItemToTab(item));
        break;
      case 'anchor':
        anchors.push(convertItemToAnchor(item));
        break;
      case 'dropdown':
        dropdowns.push(convertItemToDropdown(item));
        break;
      case 'version':
        versions.push(convertItemToVersion(item));
        break;
      case 'language':
        languages.push(convertItemToLanguage(item));
        break;
    }
  });

  if (pages.length > 0) config.pages = pages;
  if (groups.length > 0) config.groups = groups;
  if (tabs.length > 0) config.tabs = tabs;
  if (anchors.length > 0) config.anchors = anchors;
  if (dropdowns.length > 0) config.dropdowns = dropdowns;
  if (versions.length > 0) config.versions = versions;
  if (languages.length > 0) config.languages = languages;

  return config;
};

const convertItemToGroup = (item: NavigationItem): NavigationGroup => {
  const group = item.data as NavigationGroup;
  const pages: (string | NavigationGroup)[] = [];

  item.children?.forEach((child) => {
    if (child.type === 'page') {
      pages.push((child.data as any).path);
    } else if (child.type === 'group') {
      pages.push(convertItemToGroup(child));
    }
  });

  return {
    ...group,
    pages
  };
};

const convertItemToTab = (item: NavigationItem): NavigationTab => {
  const tab = item.data as NavigationTab;
  const pages: (string | NavigationGroup)[] = [];

  item.children?.forEach((child) => {
    if (child.type === 'page') {
      pages.push((child.data as any).path);
    } else if (child.type === 'group') {
      pages.push(convertItemToGroup(child));
    }
  });

  return {
    ...tab,
    pages
  };
};

const convertItemToAnchor = (item: NavigationItem): NavigationAnchor => {
  const anchor = item.data as NavigationAnchor;
  const pages: (string | NavigationGroup)[] = [];

  item.children?.forEach((child) => {
    if (child.type === 'page') {
      pages.push((child.data as any).path);
    } else if (child.type === 'group') {
      pages.push(convertItemToGroup(child));
    }
  });

  return {
    ...anchor,
    pages
  };
};

const convertItemToDropdown = (item: NavigationItem): NavigationDropdown => {
  const dropdown = item.data as NavigationDropdown;
  const pages: (string | NavigationGroup)[] = [];

  item.children?.forEach((child) => {
    if (child.type === 'page') {
      pages.push((child.data as any).path);
    } else if (child.type === 'group') {
      pages.push(convertItemToGroup(child));
    }
  });

  return {
    ...dropdown,
    pages
  };
};

const convertItemToVersion = (item: NavigationItem): NavigationVersion => {
  const version = item.data as NavigationVersion;
  const groups: NavigationGroup[] = [];

  item.children?.forEach((child) => {
    if (child.type === 'group') {
      groups.push(convertItemToGroup(child));
    }
  });

  return {
    ...version,
    groups
  };
};

const convertItemToLanguage = (item: NavigationItem): NavigationLanguage => {
  const language = item.data as NavigationLanguage;
  const groups: NavigationGroup[] = [];

  item.children?.forEach((child) => {
    if (child.type === 'group') {
      groups.push(convertItemToGroup(child));
    }
  });

  return {
    ...language,
    groups
  };
};

export const validateNavigationConfig = (config: NavigationConfig): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check for reserved paths
  const checkReservedPaths = (pages: string[], context: string) => {
    pages.forEach(page => {
      if (page.includes('/api') || page.includes('/mcp')) {
        errors.push(`${context}: Path "${page}" contains reserved path "/api" or "/mcp"`);
      }
    });
  };

  if (config.pages) {
    checkReservedPaths(config.pages, 'Pages');
  }

  if (config.groups) {
    config.groups.forEach(group => {
      if (group.pages) {
        const pagePaths = group.pages.filter(p => typeof p === 'string') as string[];
        checkReservedPaths(pagePaths, `Group "${group.group}"`);
      }
    });
  }

  if (config.tabs) {
    config.tabs.forEach(tab => {
      if (tab.pages) {
        const pagePaths = tab.pages.filter(p => typeof p === 'string') as string[];
        checkReservedPaths(pagePaths, `Tab "${tab.tab}"`);
      }
    });
  }

  if (config.anchors) {
    config.anchors.forEach(anchor => {
      if (anchor.pages) {
        const pagePaths = anchor.pages.filter(p => typeof p === 'string') as string[];
        checkReservedPaths(pagePaths, `Anchor "${anchor.anchor}"`);
      }
    });
  }

  if (config.dropdowns) {
    config.dropdowns.forEach(dropdown => {
      if (dropdown.pages) {
        const pagePaths = dropdown.pages.filter(p => typeof p === 'string') as string[];
        checkReservedPaths(pagePaths, `Dropdown "${dropdown.dropdown}"`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
