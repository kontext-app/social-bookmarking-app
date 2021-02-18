import React from 'react';

import { useComponentVisible } from '../hooks/useIsComponentVisible';

type SubMenuItem = {
  label: string;
  onClick: () => void;
};

export type MainMenuItem = {
  label: string;
  onClick?: () => void;
  subMenuItems?: SubMenuItem[];
};

type Props = {
  menuItems: MainMenuItem[];
};

export function DotMenu(props: Props): JSX.Element {
  const {
    isComponentVisible,
    ref,
    setIsComponentVisible,
  } = useComponentVisible<HTMLDivElement>(false);
  const [clickedMainMenuIndex, setClickedMainMenuIndex] = React.useState<
    number | null
  >(null);

  const handleMainMenuItemClick = (index: number) => {
    const mainMenuItem = props.menuItems[index];

    if (mainMenuItem.subMenuItems && mainMenuItem.subMenuItems.length > 0) {
      setClickedMainMenuIndex(index);
    } else if (mainMenuItem.onClick) {
      mainMenuItem.onClick();
      setIsComponentVisible(false);
    }
  };

  const handleSubMenuItemClick = (subMenuItemIndex: number) => {
    if (typeof clickedMainMenuIndex === 'number') {
      const mainMenuItem = props.menuItems[clickedMainMenuIndex];
      setIsComponentVisible(false);

      if (Array.isArray(mainMenuItem.subMenuItems)) {
        mainMenuItem.subMenuItems[subMenuItemIndex].onClick();
      }
    }
  };

  return (
    <div ref={ref}>
      <div
        onClick={() => setIsComponentVisible(true)}
        className="flex hover:bg-blue-200 p-1 items-center ml-2 rotate-90 cursor-pointer"
      >
        <svg
          className="w-3 fill-current text-grey"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        </svg>
      </div>
      {isComponentVisible && (
        <>
          <div className="dot-menu-arrow border-solid absolute border-8 h-3 ml-3" />
          <div className="flex flex-col absolute w-40 bg-gray-500 rounded-default mt-3">
            {typeof clickedMainMenuIndex === 'number' ? (
              <>
                <MenuItem
                  label="◀️ Go Back"
                  onClick={() => setClickedMainMenuIndex(null)}
                />
                {props.menuItems[clickedMainMenuIndex].subMenuItems?.map(
                  (subMenuItem, index) => (
                    <MenuItem
                      key={subMenuItem.label}
                      onClick={() => handleSubMenuItemClick(index)}
                      label={subMenuItem.label}
                    />
                  )
                )}
              </>
            ) : (
              props.menuItems.map((menuItem, index) => (
                <MenuItem
                  key={menuItem.label}
                  onClick={() => handleMainMenuItemClick(index)}
                  label={menuItem.label}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

function MenuItem(props: { label: string; onClick: () => any }): JSX.Element {
  return (
    <div
      className="hover:bg-purple-500 cursor-pointer p-2 text-xs"
      onClick={props.onClick}
    >
      {props.label}
    </div>
  );
}
