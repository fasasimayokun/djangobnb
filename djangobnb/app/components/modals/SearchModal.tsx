'use client'

import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModel"
import Modal from "./Modal"
import SelectCountry, {SelectCountryValue} from "../forms/SelectCountry"
import { useState } from "react"
import CustomButton from "../forms/CustomButton"
import { Range } from "react-date-range"
import DatePicker from "../forms/Calendar"


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

const SearchModal = () => {
  let content= (<></>);
  const searchModal = useSearchModal();
  const [numGuests, setNumGuests] = useState<string>('1');
  const [numBedrooms, setBedrooms] = useState<string>('0');
  const [numBathrooms, setBathrooms] = useState<string>('0');
  const [country, setCountry] = useState<SelectCountryValue>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numGuests),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      category: ''
    }

    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };
  
  // set date range
  const _setDateRange = (selection: Range) => {
    if (searchModal.step === 'checkin') {
      searchModal.open('checkout');
    } else if (searchModal.step === 'checkout') {
      searchModal.open('details');
    }

    setDateRange(selection);
  };

  const contentLocation = (
    <>
      <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
      
      <SelectCountry
        value={country}
        onChange={(value) => setCountry(value as SelectCountryValue)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="Check in date ->"
          onClick={() => searchModal.open('checkin')}
        />
      </div>
    </>
  );

  const contentCheckin = (
    <>
      <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Location"
          onClick={() => searchModal.open('location')}
        />

        <CustomButton
          label="Check out date ->"
          onClick={() => searchModal.open('checkout')}
        />
      </div>
    </>
  )

  const contentCheckout = (
    <>
      <h2 className="mb-6 text-2xl">When do you want to check out?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Check in date"
          onClick={() => searchModal.open('checkin')}
        />

        <CustomButton
          label="Details ->"
          onClick={() => searchModal.open('details')}
        />
      </div>
    </>
  )

  const contentDetails = (
    <>
      <h2 className="mb-6 text-2xl">Details</h2>

      <div className="space-y-4">
        <div className="space-y-4">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numGuests}
            placeholder="Number of guests..."
            min="1"
            onChange={(e) => setNumGuests(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="space-y-4">
          <label>Number of bedrooms:</label>
          <input
            type="number"
            value={numBedrooms}
            placeholder="Number of bedrooms..."
            min="0"
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="space-y-4">
          <label>Number of bathrooms:</label>
          <input
            type="number"
            value={numBathrooms}
            placeholder="Number of bathrooms..."
            min="1"
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Check out date"
          onClick={() => searchModal.open('checkout')}
        />

        <CustomButton
          label="Search"
          onClick={closeAndSearch}
        />
      </div>
    </>
  )

  if (searchModal.step == 'location') {
    content = contentLocation;
  } else if (searchModal.step == 'checkin') {
    content = contentCheckin;
  } else if (searchModal.step == 'checkout') {
    content = contentCheckout;
  } else if (searchModal.step == 'details') {
    content = contentDetails;
  }
  
  return (
    <Modal
      label="Search"
      content={content}
      isOpen={searchModal.isOpen}
      close={searchModal.close}
    />
  )
}


export default SearchModal;