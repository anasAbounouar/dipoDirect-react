import { useState, useEffect, useReducer } from 'react';

import { useMediaQuery } from 'react-responsive';

function SideFilter({
  babyLevels,
  primaryLevels,
  middleSchoolLevels,
  highSchoolLevels,
  selectedLanguage,
  selectedBabyLevel,
  selectedPrimaryLevel,
  selectedMiddleSchoolLevel,
  selectedHighSchoolLevel,
  isSideBarActive,
  toggleSidebar,
  dispatch,
}) {
  // Use media query hook
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    const handleResize = () => {
      console.log('handling resize ');
      const screenWidth = window.innerWidth;
      const sideFilter = document.getElementById('sideFilter');
      const language = document.getElementById('language');
      const level = document.getElementById('level');

      if (!sideFilter || !language || !level)
        console.log('sidefilter/language/level is not found as id  ');
      else {
        if (!isSideBarActive) {
          if (isMobile) {
            sideFilter.style.display = 'none';
          }

          language.style.display = 'none';
          level.style.display = 'none';
        } else if (isSideBarActive) {
          language.style.display = 'block';
          level.style.display = 'block';
        }
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial call to handleResize to set styles when the component mounts
    handleResize();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSideBarActive, isMobile]);
  // A helper function to create a radio button
  const renderRadioButton = (id, value, checked, label) => (
    <>
      <input
        type="radio"
        id={id}
        name="language"
        value={value}
        checked={checked === value}
        onChange={() => dispatch({ type: 'SELECT_LANGUAGE', payload: value })}
        className="radio-button"
      />
      <label htmlFor={id}>{label}</label>
    </>
  );

  return (
    <aside
      id="sideFilter"
      className={`relative ${
        isSideBarActive
          ? 'z-100 w-full block lg:w-sidebar-expanded'
          : 'z--1 w-0 lg:w-sidebar-collapsed'
      }`}
      onMouseEnter={() => dispatch({ type: 'TOGGLE_SIDEBAR', payload: true })}
      onMouseLeave={() => dispatch({ type: 'TOGGLE_SIDEBAR', payload: false })}
    >
      <div className="sidebarArrow" aria-hidden="true">
        <i
          className={`fa-solid fa-angles-right  ${
            !isSideBarActive ? '' : 'transform rotate-180'
          }`}
        ></i>
      </div>
      <div id="language" className={` c-black text-[32px] font-[500]`}>
        <h4>Language</h4>
        <form
          className="flex flex-col language  mt-3 ml-2 items-start relative"
          name="filters"
        >
          <div>{renderRadioButton('tout', '0', selectedLanguage, 'Tout')}</div>
          <div>
            {renderRadioButton('fr', 'fr', selectedLanguage, 'Francais')}
          </div>
          <div>
            {renderRadioButton('en', 'en', selectedLanguage, 'Englais')}
          </div>
          <div>{renderRadioButton('ar', 'ar', selectedLanguage, 'Arabe')}</div>
        </form>
      </div>

      <div id="level">
        <h4 className="text-lg font-medium mb-3">Niveau</h4>
        <select
          id="bebe"
          value={selectedBabyLevel}
          onChange={e =>
            dispatch({ type: 'SELECT_BABY_LEVEL', payload: e.target.value })
          }
          className="w-full py-2 px-3 mb-3 border rounded-md"
        >
          <option value="" disabled hidden>
            __ P/M/G Section
          </option>
          {babyLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select
          id="primaire"
          value={selectedPrimaryLevel}
          onChange={e =>
            dispatch({ type: 'SELECT_PRIMARY_LEVEL', payload: e.target.value })
          }
          className="w-full py-2 px-3 mb-3 border rounded-md"
        >
          <option value="" disabled hidden>
            __Primaire
          </option>
          {primaryLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select
          id="college"
          value={selectedMiddleSchoolLevel}
          onChange={e =>
            dispatch({
              type: 'SELECT_MIDDLE_SCHOOL_LEVEL',
              payload: e.target.value,
            })
          }
          className="w-full py-2 px-3 mb-3 border rounded-md"
        >
          <option value="" disabled hidden>
            __College
          </option>
          {middleSchoolLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select
          id="lycee"
          value={selectedHighSchoolLevel}
          onChange={e =>
            dispatch({
              type: 'SELECT_HIGH_SCHOOL_LEVEL',
              payload: e.target.value,
            })
          }
          className="w-full py-2 px-3 mb-3 border rounded-md"
        >
          <option value="" disabled hidden>
            __Lycee
          </option>
          {highSchoolLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}

export default SideFilter;
