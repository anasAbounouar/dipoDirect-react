import { useNavigate, useParams } from 'react-router-dom';
import { libraryDatas } from '../../data/LibraryIntroData';
import { ResourceCollection } from '../../../interfaces/LibraryType';
import styles from './LibraryIntro.module.scss';
import { useEffect, useState } from 'react';
import LibraryClass from '../../components/features/LibraryClass/LibraryClass';

export default function LibraryIntro() {
  const navigate = useNavigate(); // Updated to use useNavigate
  const { chosenLibrary } = useParams();
  const [libraryData, setLibraryData] = useState<
    ResourceCollection | undefined
  >();
  useEffect(() => {
    const libraryData = libraryDatas.find(ele => {
      return ele.libraryName === chosenLibrary; // Assuming `libraryId` is the correct property to match
    });
    if (libraryData) {
      setLibraryData(libraryData);
     
    } else {
      navigate('/not-found');
    }
  }, [chosenLibrary, navigate]);

  const goToPage = (value: string) => {
    navigate(value);
  };
  return (
    <>
      <section
        id="bienvenue"
        className={`${styles.bienvenue} p-4 flex justify-center relative`}
      >
        {/* Overlay */}
        <div className="overlay absolute inset-0 "></div>

        {/* Container */}
        <div className="container h-full flex items-center justify-center">
          {/* Row */}
          <div className="w-full">
            {/* Column */}
            <div className="text-center">
              {/* Title */}
              <h3 className="text-white relative inline-block  font-[500] p-2 text-2xl lg:text-[40px]">
                Bienvenue dans votre librairie
                <br />
                {/* Dynamic library name with custom color */}
                <strong
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.75)' }}
                  className="library-name my-3 underline inline-block text-[var(--arrissala-color)]"
                >
                  {libraryData?.libraryName} !
                </strong>
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section id="classification">
        <h4 className="m-4 py-4 text-xl font-[500]">
          Veuillez choisir une classe de fournitures
        </h4>
        <div className="flex items-center justify-around flex-wrap flex-row my-6">
          {libraryData?.boxes?.map(box => (
            <LibraryClass key={box.name} box={box} goToPage={goToPage} />
          ))}
        </div>
      </section>
    </>
  );
}
