import { lazy, memo, Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Constatnt } from "../../utils/Constent";

const ProfileDropdown = lazy(() => import("./ProfileDropdown"));

const ProfileIconWithDropdown = ({ profileImg }) => {
  const { is_login, loginUserData } = useSelector(
    (state) => state?.masterSlice?.loginUser || {}
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative group inline-block"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)} // Desktop hover
      onMouseLeave={() => setIsOpen(false)} // Desktop hover
    >
      <div
        className="bg-gray-300 rounded-full cursor-pointer w-[32px] h-[32px]"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <img
          src={loginUserData?.profile_image_url || Constatnt?.DEFAULT_IMAGE}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div
        className={`absolute top-1 right-0 transition-all duration-200 z-50 ${isOpen ? "opacity-100 visible" : " opacity-0 invisible"
          }`}
      >
        <Suspense fallback={<div className='min-h-[100vh]'></div>}>
          <ProfileDropdown setIsOpen={setIsOpen} />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(ProfileIconWithDropdown);
