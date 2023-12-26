export default function Footer() {
  return (
    <footer className="bg-myDarkColor text-white p-5 md:p-10">
      <div className="mx-auto flex flex-col sm:flex-row justify-between items-center flex-wrap">
        {/* Payment methods */}
        <div className="w-full mb-6 flex flex-col items-center sm:w-1/2 lg:w-1/3">
          <h6 className="text-2xl">Cartes acceptées</h6>
          <img
            className="mt-3"
            src="/assets/footer/footer_cc.png"
            alt="Accepted credit cards"
          />
        </div>

        {/* App download links */}
        <div className="w-full mb-6 flex flex-col items-center sm:w-1/2 lg:w-1/3">
          <h5 className="text-xl">Télécharger l'application</h5>
          <div className="flex mt-3 flex-row">
            <a href="/path-to-appstore" aria-label="Download on the App Store">
              <img
                src={'/assets/footer/appstore-en.png'}
                alt="App Store"
                className="p-1 m-1 max-w-[150px]"
              />
            </a>
            <a href="/path-to-playstore" aria-label="Get it on Google Play">
              <img
                src={'/assets/footer/playstore-en.png'}
                alt="Play Store"
                className="p-1 m-1 max-w-[150px]"
              />
            </a>
          </div>
        </div>

        {/* Social media links */}
        <div className="w-full mb-6 flex flex-col items-center sm:w-full lg:w-1/3">
          <h2 className="text-2xl mb-3">Réseaux Sociaux</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href="https://www.facebook.com/anas.abounouar.5/"
              className="text-blue-600 hover:text-blue-800 flex-1 p-3 text-[35px] hover:-translate-y-[6px] transition-all delay-100 ease-linear"
              aria-label="Follow us on Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/anasabounouar/"
              className="text-pink-600 hover:text-pink-800 p-3 flex-1 text-[35px] hover:-translate-y-[6px] transition-all delay-100 ease-linear"
              aria-label="Follow us on Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com/channel/UCMGKL5rgDxS5EQKM4xYnwBA"
              className="text-red-600 hover:text-red-800 p-3 flex-1 text-[35px] hover:-translate-y-[6px] transition-all delay-100 ease-linear"
              aria-label="Subscribe to our YouTube channel"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <nav className="sm:px-[100px] flex flex-col md:flex-row justify-between items-center w-full mt-6 sm:mt-0">
        {/* Logo */}
        <div className="w-full md:w-1/3 flex sm:justify-center justify-start mb-6 sm:mb-0">
          <a href="/" className="w-auto sm:w-full text-center md:text-left">
            <img
              src={'/assets/logo.png'}
              alt="DipoDirect logo"
              className="img-fluid w-32 mx-auto rounded-xl"
            />
          </a>
        </div>

        {/* Legal links */}
        <div className="flex md:w-2/3 flex-col md:flex-row items-center md:justify-end w-full text-xs md:text-sm">
          <a
            href="/privacy-policy"
            className="w-full flex px-1 py-3 sm:justify-center hover:underline p-2 text-myNonImportantText"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-conditions"
            className="w-full flex px-1 py-3 sm:justify-center hover:underline p-2 text-myNonImportantText"
          >
            Terms & Conditions
          </a>
          <a
            href="/cookie-policy"
            className="w-full flex px-1 py-3 sm:justify-center hover:underline p-2 text-myNonImportantText"
          >
            Cookie Policy
          </a>
          <a
            href="/contact"
            className="w-full flex px-1 py-3 sm:justify-center hover:underline p-2 text-myNonImportantText"
          >
            Contact
          </a>
        </div>
      </nav>
    </footer>
  );
}
