import { lazy } from 'react'
// import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { astrologerDetailsRedirection } from '../../utils/navigations/NavigationPage'
import astrologer1 from '/homepage/astrologer1.webp'
const CustomButton = lazy(() => import('./CustomButton'))

function OurAstrologer ({ AstrologerList, viewAll }) {
  const location = useLocation()

  // const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6'>
        {AstrologerList?.length > 0 ? (
          <>
            {AstrologerList?.map(
              (astro, index) =>
                index < 4 && (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row w-full bg-white shadow-md rounded-lg p-7 items-center gap-7 md:gap-9 ${
                      location?.pathname == '/' ? 'staticRadius' : ''
                    }  `}
                  >
                    <div className='homeAstroImageDiv'>
                      <img
                        src={astrologer1 || astro?.profile_image}
                        alt={astro?.name}
                        className='homeAstroImage rounded-full object-contain'
                      />
                    </div>
                    <div className='flex flex-col gap-2  text-center md:text-start items-center md:items-start'>
                      <h3 className='homeAstrologerName mb-0'>{astro?.name}</h3>
                      <p className='commonQuesP mb-0'>{astro?.email}</p>
                      <div>
                        <CustomButton
                          className='astroCardButton px-4 py-3'
                          onClick={() => {
                            // astrologerDetailsRedirection(navigate, astro?._id);
                            astrologerDetailsRedirection(
                              navigate,
                              PATHS?.ASTROLOGER_DETAIL_PAGE,
                              astro?._id
                            )
                          }}
                        >
                          View Profile
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                )
            )}
          </>
        ) : (
          <>
            <div
              // key={index}
              className={`flex flex-col md:flex-row w-full bg-white shadow-md rounded-lg p-7 items-center gap-7 md:gap-9 ${
                location?.pathname == '/' ? 'staticRadius' : ''
              }`}
            >
              <div className='homeAstroImageDiv'>
                <h1>Astrologer Not Found</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default OurAstrologer
