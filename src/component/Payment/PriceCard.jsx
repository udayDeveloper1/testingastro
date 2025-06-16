import {  memo } from 'react'

const PriceCard = ({
  data,
  price,
  extraLabel,
  onClick,
  openInModel = false,
  classList = ""
}) => {
  return (
    <div class={`rounded-xl bg-white shadow-md flex flex-col items-center overflow-hidden pb-[20px] p-[10px] ${classList}`}>
      <div
        class='w-full py-6 bg-[linear-gradient(270deg,_#FDF3EC_0%,_#F9E9EC_100%)] text-center rounded-xl cursor-pointer'
        onClick={() => {
          onClick(data)
        }}
      >
        <span class='text-lg lg:text-xl xl:text-2xl font-bold text-black'>
          ₹ {price.toLocaleString()}
        </span>
      </div>

      <div class='pt-[10px] lg:pt-[20px] text-center'>
        <span class='text-[14px] lg:text-[16px] font-semibold bg-gradient-to-r from-[#C32853] to-[#EE7E49] bg-clip-text text-transparent'>
          {extraLabel}
        </span>
      </div>
    </div>
  )
}

export default memo(PriceCard)
{
  /* <div className="w-full rounded-[10px] overflow-hidden WalletCard text-center bg-white">
      <div className={`bg-white  ${!openInModel ? "py-6" : "py-4"}`}>
        <p className="text-lg font-semibold mb-0">₹ {price.toLocaleString()}</p>
      </div>

      <CustomButton
        onClick={() => { onClick(data) }}
        className={`w-full rounded-[10px] ${!openInModel ? "py-[10px]" : "py-2"}`}
      >
        {extraLabel}
      </CustomButton>
    </div> */
}
