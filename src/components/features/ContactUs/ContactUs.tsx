const contactDetails = {
  color: '#FFF',
  // fontFamily: 'Poppins',
  fontSize: '19.389px',
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: 'normal',
};

const ContactUs = () => {
  return (
    <div
      id="contact"
      className="bg-myBrand flex-1 flex items-center justify-center flex-col md:flex-row py-7 lg:gap-20"
    >
      <img
        className="w-[342.656px]"
        src="/assets/contactus.png"
        alt="Contact Us"
      />
      <div className="flex justify-center">
        <div className="info block">
          <ContactItem
            iconClass="fa-solid fa-location-dot"
            text="Casablanca Prince"
            style={contactDetails}
          />
          <ContactItem
            iconClass="fa-solid fa-phone"
            text="067508371"
            style={contactDetails}
          />
          <ContactItem
            iconClass="fa-regular fa-envelope"
            text="dipoDirect@gmail.com"
            style={contactDetails}
          />
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ iconClass, text, style }) => (
  <>
    <div className="flex align-center">
      <i
        className={`${iconClass} text-myIndigo !flex items-center justify-center m-0 p-0 text-[25px]`}
        aria-hidden="true"
      ></i>
      <p className="ml-3 p-2 text-white" style={style}>
        {text}
      </p>
    </div>
  </>
);

export default ContactUs;
