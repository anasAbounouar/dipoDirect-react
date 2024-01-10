import { useState } from 'react';
import SelectComponent from '../../components/common/SelectComponent/SelectComponent';
import styles from './HomePage.module.css';
import PromoteSection from '../../components/features/PromoteSection/PromoteSection';
import ContactUs from '../../components/features/ContactUs/ContactUs';
import ServiceDescription from '../../components/features/ServiceDescription/ServiceDescription';
import { useNavigate } from 'react-router-dom'; // Updated import

// Define the option type for the select component
interface Option {
  id: number | string;
  value: string;
  label: string;
}
export default function HomePage() {
  // State for the selected option in the select component
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate(); // Updated to use useNavigate

  // Options for the select component
  const options: Option[] = [
    { id: 1, value: 'arrissala', label: 'Arrissala' },
    { id: 2, value: 'aladnane', label: 'Aladnane' },
    // ... add more options as needed
  ];

  // Function to handle the selection change
  const handleSelectChange = (value: string) => {
    

    navigate(`/library-intro/${value}`);
  };

  return (
    <div>
      <section
        id="mosque"
        className={`${styles.mosque}  relative p-4 flex items-center justify-center`}
      >
        <div className="overlay"></div>
        <div className="container relative">
          <div className="flex flex-col items-center justify-center">
            <div className="w-10/12 mb-3">
              <h3 className="text-white relative text-xl md:text-3xl font-bold">
                Acheter votre Fourniture en un seul click!
              </h3>
            </div>
            <div className="w-8/12">
              {/* Use the SelectComponent here */}
              <form>
                <SelectComponent
                  labelId="supplierSelectLabel"
                  options={options}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  placeholder="--Choisir votre fournisseur--"
                  onChange={handleSelectChange}
                />
              </form>
            </div>
          </div>
        </div>
        {/* ... other content ... */}
      </section>
      <PromoteSection />
      <ServiceDescription />

      <ContactUs />
    </div>
  );
}
