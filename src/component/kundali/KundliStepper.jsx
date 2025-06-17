import { lazy, memo, Suspense } from "react"
import defaultImg from "../../assets/img/kundali/astakoot.svg"
import { UpdatedPaths } from '../../routers/Paths'
const KundliParts = lazy(() => import("./KundliParts"))
const KundliStepper = () => {
  const PATHS = UpdatedPaths()

  let kundliInfo = [
    {
      id: 1,
      title: 'Basic',
      link: PATHS.FREE_KUNDLI_KUNDLI_DETAILS_BASIC,
      classList: 'mx-auto py-5 xl:py-10  ',
      classList2:
        ' kundli_border_right sm:w-[50%] w-full md:w-[33.33%] lg:w-[16.67%]',
      svg: defaultImg
    },
    {
      id: 2,
      title: 'Charts',
      link: PATHS.FREE_KUNDLI_KUNDLI_DETAILS_CHARTS,
      classList: 'mx-auto py-5 xl:py-10  ',
      classList2:
        ' kundli_border_right sm:w-[50%] w-full md:w-[33.33%] lg:w-[16.67%]',
      svg: defaultImg
    },
    {
      id: 3,
      title: 'KP',
      link: PATHS.FREE_KUNDALI_DETAILS_KP,
      classList: 'mx-auto py-5 xl:py-10  ',
      classList2:
        'kundli_border_right sm:w-[50%] w-full md:w-[33.33%] lg:w-[16.67%]',
      svg: defaultImg
    },
    {
      id: 4,
      title: 'Ashtakvarga',
      link: PATHS.FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA,
      classList: 'mx-auto py-5 xl:py-10  ',
      classList2:
        ' kundli_border_right sm:w-[50%] w-full md:w-[33.33%] lg:w-[16.67%]',
      svg: defaultImg
    },
    {
      id: 5,
      title: 'Dasha',
      link: PATHS.FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT,
      classList: 'mx-auto py-5 xl:py-10  ',
      classList2:
        ' sm:border-b-0 kundli_border_right sm:w-[50%] w-full md:w-[33.33%] lg:w-[16.67%]',
      svg: defaultImg
    },
    {
      id: 6,
      title: 'Report',
      link: PATHS.FREE_KUNDALI_REPORT,
      classList: 'mx-auto py-5 xl:py-10  ',
      classList2:
        'kundli_border_right sm:w-[50%] w-full md:w-[33.33%] lg:w-[16.67%] ',
      svg: defaultImg
    }
  ]

  return (
    <div className='padding50 container'>
      <div className='flex w-full justify-between rounded-lg KundliPartsLine mx-auto overflow-x-auto lg:overflow-hidden'>
        <Suspense fallback={<></>}>
        {kundliInfo?.map((ele, ind) => {
          return (
            <div className={ele.classList2} key={ind}>
              <KundliParts
                svg={ele.svg}
                title={ele.title}
                link={ele.link}
                classList={ele.classList}
                classList2={ele?.classList2}
              />
            </div>
          )
        })}
        </Suspense>
      </div>
    </div>

  )
}

export default memo(KundliStepper)
