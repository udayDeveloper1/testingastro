// import bhumipujaMuhurat from "../../assets/img/banner/bhumipujaMuhurat.webp";
import CommonBanner from '../../component/CommonBanner'
import SupportChatPageComp from '../../component/Support/SupportChatPage'

const categories = [
  'First Free Session',
  'Previous Order',
  'Payment Failure',
  'Technical Issue',
  'Astrologer Related',
  'Live Event Related',
  'AstroMall Related',
  'Offers & Coupons',
  'General FAQs',
  'Escalate The Issue'
]

const messages = [
  {
    text: 'Hey there! How can I assist you today?',
    time: '08:22 AM',
    sender: 'agent'
  },
  { text: 'Hi', time: '08:20 AM', sender: 'user' },
  { text: 'Hello', time: '08:20 AM', sender: 'user' },
  { text: 'Hey! How can I help you today?', time: '08:22 AM', sender: 'agent' }
]

function SupportChatPage () {
  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={bhumipujaMuhurat}
          text='Bhoomi pujan '
          highlight='muhurat 2025'
        />
      </section>
      <div className='w-full h-screen flex text-sm font-medium container padding50'>
        <SupportChatPageComp />
      </div>
    </>
  )
}

export default SupportChatPage
