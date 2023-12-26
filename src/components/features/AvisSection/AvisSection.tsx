import { useEffect, useState } from 'react';
import styles from './AvisSection.module.scss';

interface Avi {
  id: number;
  name: string;
  date: string;
  text: string;
}
export default function AvisSection() {
  const Avis = [
    {
      id: 1,
      name: 'John Doe',
      date: '2023-12-23',
      text: 'This is a sample review text.',
    },
    {
      id: 2,
      name: 'anas Doe',
      date: '2023-12-23',
      text: 'Thiss is another text .',
    },
    {
      id: 3,
      name: 'adnane Bae',
      date: '2023-12-23',
      text: 'that was a test .',
    },
    // Add more reviews as needed
  ];
  const [slidesPerView, setSlidesPerView] = useState(1);
  useEffect(function () {
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 768 && screenWidth < 991) {
        setSlidesPerView(2);
      } else if (screenWidth <= 768) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(3);
      }
    };

    // Initial update
    updateSlidesPerView();

    // Add event listener for window resize
    window.addEventListener('resize', updateSlidesPerView);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  return (
    <section id="avis" className={styles.avis}>
      <div
        className={` flex align-center justify-center mb-5 text-[30px] ] text-myBrand relative`}
      >
        <h2 className="underline py-2 flex ">Avis</h2>
      </div>
      {/*  @ts-expect-error because there is issue */}
      <swiper-container
        slides-per-view={slidesPerView}
        space-between={50}
        navigation
        pagination={{ clickable: true }}
        cssMode
      >
        {Avis.map(Avi => (
          /*  @ts-expect-error because there is issue */
          <swiper-slide
            key={Avi.id}
            class={`swiper-slide p-10 col-10 text-center  bg-mySoftBrand  ${styles.box}`}
          >
            <span>
              <h5 className="text-myBrand font-bold text-lg">{Avi.name}</h5>
              <small>
                {Avi.date}
                <span
                  aria-label="Rating: 5 out of 5 "
                  className="flex items-center justify-center py-3"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M6.11536 10.6327L9.03973 12.5523C9.57527 12.9041 10.2306 12.384 10.0897 11.7263L9.31455 8.11651L11.9007 5.6845C12.3728 5.24092 12.1191 4.39966 11.499 4.34612L8.09548 4.03256L6.76366 0.62162C6.52407 0.00214398 5.70666 0.00214398 5.46707 0.62162L4.13525 4.02491L0.73172 4.33848C0.111614 4.39201 -0.142066 5.23327 0.33006 5.67685L2.91618 8.10887L2.14105 11.7187C2.00012 12.3764 2.65546 12.8964 3.191 12.5446L6.11536 10.6327Z"
                        fill="#009688"
                      />
                    </svg>
                  ))}
                </span>
              </small>
            </span>

            <div className={` bg-mySoftGreen custom-shadow ${styles.comment}`}>
              <div className={`${styles.quoteLeft}`}>
                <i
                  className="fa fa-quote-left text-myBrand"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="text p-3">{Avi.text}</div>
              <div className={`${styles.quoteRight}`}>
                <i
                  className="fa fa-quote-right  text-myBrand"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </section>
  );
}
