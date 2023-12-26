import AvisSection from '../AvisSection/AvisSection';

export default function ServiceDescription() {
  return (
    <>
      <div className="flex flex-row px-5 mt-5 text-left items-center justify-start">
        <div className="hidden lg:flex lg:w-1/2  flex-row">
          <div className="w-1/2 p-3">
            <img src="/assets/architecture.svg" alt="img" className="" />
          </div>
          <div className="w-1/2">
            <img src="/assets/play.svg" alt="img" className="mt-5" />
          </div>
        </div>
        <div className="lg:w-1/3 p-3 ">
          <p className="mb-2">Qui sommes-nous ?</p>
          <h3 className="my-2 text-myBrand text-2xl font-bold">
            FOURNITURES POUR LIBRAIRIES
          </h3>
          <h5 className="mb-2 text-myHeartColor font-[400]">
            Lien librairie-fournisseur
          </h5>
          <span className="text-myTextSlateGray leading-8">
            Chez DIPODIRECT, nous nous engageons à révolutionner le processus
            d'approvisionnement des librairies en leur offrant une plateforme en
            ligne pratique et efficace pour l'achat de fournitures de leurs
            fournisseurs préférés. Notre objectif est de simplifier et de
            rationaliser ce processus, permettant ainsi aux librairies de se
            concentrer sur leur activité principale.
          </span>
        </div>
      </div>
      <AvisSection />
    </>
  );
}
