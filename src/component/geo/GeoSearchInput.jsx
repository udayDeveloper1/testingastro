import { AutoComplete } from 'antd';
import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import close from "../../assets/img/panchang/close.png";
import { geo_search } from '../../services/api/api.services';
const CustomButton = lazy(() => import('../Homepage/CustomButton'))

const GeoSearchInput = ({
  value,
  onChange,
  onSelectLocation,
  placeholder = "Enter City Name",
  className = "",
  showClear = true,
  showButton = false, // Optional prop if you want to include a GET PANCHANG button
  onSubmit,
}) => {
  const locationData = useSelector(state => state.masterSlice?.location)
  const { t } = useTranslation()
  const [options, setOptions] = useState([]);
  const isPlaceSelected = useRef(false);
  const searchTimeoutRef = useRef(null);
  const isCleared = useRef(false);
  const [error, setError] = useState("");

  const handleSearch = (val) => {
    isPlaceSelected.current = false;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      if (val.trim().length < 3) {
        setOptions([]);
        return;
      }

      try {
        const response = await geo_search({ city: val });
        if (response?.code === 1 && Array.isArray(response?.data?.response)) {
          const formattedOptions = response.data.response.map((item) => ({
            ...item,
            value: item.full_name,
          }));
          setOptions(formattedOptions);
        } else {
          setOptions([]);
        }
      } catch (err) {
        console.error("Geo search failed", err);
        setOptions([]);
      }
    }, 500);
  };

  const handleSelect = (val) => {
    const selected = options.find((item) => item.full_name === val);
    isPlaceSelected.current = true;
    setOptions([]);
    onSelectLocation?.(selected);
    onChange?.(val);
  };

  useEffect(() => {
    const setDefaultCity = async () => {
      try {
        const isValidLocation = locationData && Object.keys(locationData).length > 0 && locationData?.name;
        if (isValidLocation) {
          const response = await geo_search({ city: isValidLocation ? locationData?.name : "Ahmedabad" });
          if (response?.code === 1 && Array.isArray(response?.data?.response)) {
            const formattedOptions = response.data.response.map((item) => ({
              ...item,
              value: item.full_name,
            }));

            setOptions(formattedOptions);

            const mumbaiOption = formattedOptions.find(
              (item) => item?.full_name?.toLowerCase()?.includes("ahmedabad")
            );

            if (mumbaiOption) {
              isPlaceSelected.current = true;
              onChange?.(mumbaiOption.full_name);
              onSelectLocation?.(mumbaiOption);
            }
          }
        }
      } catch (err) {
        console.error("Failed to set default Mumbai", err);
      }
    };
    setDefaultCity();
  }, [locationData]);

  useEffect(() => {
    setError("");
  }, [isPlaceSelected.current])


  return (
    <div className={`p-4 md:p-10  rounded-[10px] flex flex-col md:flex-row items-start justify-between gap-2 md:gap-[20px] ${className} commonLightBack geoSearchInputDiv`} >
      {/* Input Field */}
      <div className="w-full md:flex-1 relative geoSearchInputContainer">
        <div>
          <AutoComplete
            options={!isPlaceSelected.current ? options : []}
            onSearch={handleSearch}
            onSelect={handleSelect}
            onChange={(val) => {
              onChange?.(val);
              isPlaceSelected.current = false;
            }}
            value={value}
            placeholder={placeholder}
            className="w-full rounded-lg py-2 md:py-3 px-4 md:px-6 text-xs md:text-sm bg-white h-full outline-none geoSearchInput"
            open={!isPlaceSelected.current && options.length > 0}
            dropdownStyle={{
              maxWidth: '95vw',
              overflow: 'auto'
            }}
          />
          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>

        {showClear && value && (
          <img
            src={close}
            alt="clear"
            className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 cursor-pointer "
            style={{ width: '16px', height: '16px' }}
            onClick={() => {
              onChange?.("");
              isPlaceSelected.current = false;
              setOptions([]);
            }}
          />
        )}
      </div>

      {/* Button */}
      {showButton && (
        <div className="w-full md:w-auto mt-2 md:mt-0 h-full flex justify-center items-center">
          <Suspense fallback={<></>}>
          <CustomButton
            className="text-white text-sm md:text-[16px] font-semibold px-4 md:px-20 py-2 md:py-4 font-medium w-full md:w-auto text-center"
            parentClassName='w-full'
            // disabled={!value?.trim()}
            onClick={() => {
              if (!value?.trim() && !isPlaceSelected.current) {
                setError("Location is required");
                return;
              }
              onSubmit();
            }}
          >
            {t('Get_PANCHANG')}
          </CustomButton>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default memo(GeoSearchInput);
