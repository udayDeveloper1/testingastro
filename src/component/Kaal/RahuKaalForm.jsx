import { AutoComplete, DatePicker } from "antd";
import dayjs from "dayjs";
import { lazy, memo, Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import close from "../../assets/img/panchang/close.png";
import calender from "../../assets/img/rahukaal/calender.svg";
import { geo_search } from "../../services/api/api.services";
import { Codes, DateFormat } from "../../utils/CommonVariable";
import { Constatnt } from "../../utils/Constent";
const CustomButton = lazy(() => import("../Homepage/CustomButton"));
const RahuKaalForm = ({
  value,
  onChange,
  onSelectLocation,
  placeholder = "Enter City Name",
  className = "",
  showClear = true,
  showButton = false, // Optional prop if you want to include a GET PANCHANG button
  showDate = false,
  onSubmit,
  selectedDate,
  setSelectedDate,
  form_button_text = ""
}) => {

  const { t } = useTranslation();
  const [options, setOptions] = useState([]);
  const isPlaceSelected = useRef(false);
  const searchTimeoutRef = useRef(null);
  const [autoSubmit, setAutoSubmit] = useState(false);
  const [error, setError] = useState("");


  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
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
    }, 200);
  };

  const handleSelect = (val) => {
    const selected = options.find((item) => item.full_name === val);
    isPlaceSelected.current = true;
    onSelectLocation(selected);
    setOptions([]);
    onChange(val);
  };

  useEffect(() => {
    const setDefaultCity = async () => {
      try {
        const response = await geo_search({ city: "Ahmedabad" });
        if (response?.code === Codes?.SUCCESS && Array.isArray(response?.data?.response)) {
          const formattedOptions = response.data.response.map((item) => ({
            ...item,
            value: item.full_name,
          }));
          setOptions(formattedOptions);
          const mumbaiOption = formattedOptions.find((item) =>
            item?.full_name?.toLowerCase()?.includes("ahmedabad")
          );

          if (mumbaiOption) {
            isPlaceSelected.current = true;
            onChange(mumbaiOption.full_name);
            onSelectLocation(mumbaiOption);
            setAutoSubmit(true);
          }
        }
      } catch (err) {
        console.error("Failed to set default Mumbai", err);
      }
    };
    setDefaultCity();
  }, [LocalLanguage]);

  const handleDateChange = (date, dateString) => {
    const formatted = date ? date.format(DateFormat?.DATE_DASH_FORMAT) : null;
    setSelectedDate(formatted)
  };
  useEffect(() => {
    setError("");
  }, [isPlaceSelected.current])
  return (
    <div
      className={`p-4 md:p-10  rounded-[10px] flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 ${className} commonLightBack geoSearchInputDiv`}
    >
      {/* Input Field */}
      <div
        className={`w-full md:flex-1  relative geoSearchInputContainer ${showDate ? "flex gap-[10px] lg:gap-[20px] flex-col lg:flex-row" : ""
          }`}
      >
        {/* Date Picker */}
        {showDate && (
          <DatePicker
            placeholder={t('select_date')}
            value={dayjs(selectedDate, DateFormat?.DATE_DASH_FORMAT)}
            format={DateFormat?.DATE_SLASH_FORMAT || 'YYYY-MM-DD'}
            onChange={handleDateChange}
            allowClear={false}
            // suffixIcon={<CalendarOutlined style={{ color: '#e94057' }} />}
            suffixIcon={
              <img
                src={calender} // Replace with your image path
                alt="calendar"
                style={{ width: "24px", height: "24px", objectFit: "contain" }}
              />
            }
            className="w-full rounded-[10px] flex-1 outline-none geoSearchInput border-none py-[11px] md:py-3 md:ps-[16px] md:pe-[16px]"
          />
        )}
        <div className="flex-2">
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
            className="w-full rounded-[10px] py-2 md:py-3 px-[11px] md:px-4 text-xs md:text-sm bg-white h-full outline-none geoSearchInput "
            open={!isPlaceSelected.current && options.length > 0}
          // dropdownStyle={{
          //   maxWidth: "95vw",
          //   overflow: "auto",
          // }}
          />
          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
        {showClear && value && (
          <img
            src={close}
            alt="clear"
            className="absolute top-[85px] lg:top-1/2 right-[13px] md:right-4 -translate-y-1/2 cursor-pointer close_img_rahukaal"
            style={{ width: "16px", height: "16px" }}
            onClick={() => {
              onChange("");
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
              className="text-white text-sm md:text-[16px] font-semibold px-4 md:px-20 py-2 md:py-4 w-full md:w-auto text-center"
              parentClassName="w-full"
              onClick={() => {
                if (!value?.trim() && !isPlaceSelected.current) {
                  setError("Location is required");
                  return;
                }
                onSubmit();
              }}
            >
              {form_button_text || t("Get_rahu_kaal")}
            </CustomButton>
          </Suspense>

        </div>
      )}
    </div>
  );

};

export default memo(RahuKaalForm);
