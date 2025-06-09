import { useNavigate } from "react-router";
// import { PATHS } from "../../routers/Paths";
import CustomButton from "../Homepage/CustomButton";
import { UpdatedPaths } from "../../routers/Paths";
import { useTranslation } from "react-i18next";

export default function BalanceActionBar({
  balance = 0,
  onDeleteAll = () => {},
}) {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const PATHS = UpdatedPaths()

  const onRecharge = async () => {
    navigate(PATHS.MONEY_WALLET);
  };
  
  return (
    <div className="flex justify-between items-center bg-white p-4  rounded-[10px] box_shadow_common new_border gap-3">
      {/* Left Side: Balance */}
      <div className="col-span-6 md:col-span-2 text-center">
        <span className="font-semibold new_body_font text-base">
          {t('Available_Balance')}: ₹ {balance}
        </span>
      </div>

      {/* Right Side: Action Buttons */}
      {/* <div className="col-span-6 md:col-span-4 grid grid-cols-2 gap-2 justify-items-end"> */}
      {/* <div className="w-full col-span-2 md:col-span-1"> */}
      <div className="">
        <CustomButton
          className=" px-6 py-3 w-full md:max-w-max "
          onClick={onRecharge}
        >
          {t('RECHARGE')}
        </CustomButton>
      </div>

      {/* <CustomButton
          danger
          type="default"
          onClick={onDeleteAll}
          className="!bg-transparent website_color w-full md:max-w-max col-span-2 md:col-span-1col-span-2 md:col-span-1"
        >
          DELETE ALL
        </CustomButton> */}
      {/* </div> */}
    </div>
  );
}
