import { AudioOutlined, SendOutlined } from '@ant-design/icons'
import cloneDeep from 'lodash/cloneDeep'
import { faQuestion, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'antd/dist/reset.css'
import '../../assets/css/chatui.css'
import React, {
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import sampleImage from '../../assets/img/astrologer/astro2.webp'
import chatSendIcon from '../../assets/img/chat/send.webp'
import notFoundImg from '../../assets/img/noDataFound/No_Data_Found.webp'
import PhoneAuthModals from '../../component/auth/PhoneAuthModals'
import RatingModal from '../../component/Chat/RatingModal'
import PaymentModal from '../../component/Modals/PaymentModal'
import { createSocket } from '../../component/socket/socket'
import CountdownTimer from '../../component/Timer/Timer'
import {
  addChatduration,
  addChatRequest,
  chatHistory,
  editChatRequest,
  getAstrologersDetails,
  giveStarPlusReview
} from '../../services/api/api.services'
import {
  setAstroDetails,
  setAstroPaymentDetails
} from '../../storemain/slice/astroLogerDetailsSlice'
import { setUserLoginData } from '../../storemain/slice/MasterSlice'
import {
  closeModel,
  Decryption,
  formatDate,
  formatTime,
  openModel,
  setLoginUserData,
  TOAST_ERROR,
  utcToTst
} from '../../utils/CommonFunction'
import { Codes } from '../../utils/CommonVariable'
import { Constatnt } from '../../utils/Constent'
import { UpdatedPaths } from '../../routers/Paths'
import Loader2 from '../../component/loader/Loader2'
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'))
const ConfirmModal = lazy(() => import('../../component/Modals/ConfirmModal'))

const ChatUI = () => {
  const { t } = useTranslation()
  const PATHS = UpdatedPaths()

  const { is_login, loginUserData } = useSelector(
    state => state?.masterSlice?.loginUser
  )
  let senderId = localStorage.getItem(Constatnt.AUTH_KEY)
    ? JSON.parse(localStorage.getItem(Constatnt.AUTH_KEY))?._id
    : ''

  const { is_model, model_type } = useSelector(
    state => state?.masterSlice?.modal
  )
  const [isModalVisible, setModalVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const scrollBottomRef = useRef(null)
  // const [reloadOpen, setReloadOpen] = useState(false)
  const { chatAstroId } = useParams()
  const [urlData, setUrlData] = useState({})
  const [receiverId, setReceiverId] = useState('')
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [profileImage, setProfileImage] = useState(sampleImage)
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const [time, setTime] = useState({ minutes: 0, seconds: 0 })
  const [showMessage, setShowMessage] = useState('')
  // const [freechatDurationCalled, setFreechatDurationCalled] = useState(false)
  const [sessionID, setSessionID] = useState('')
  const [typing, setTyping] = useState({})

  const [is_freechat_count, setIs_freechat_count] = useState(
    loginUserData?.is_freechat_count || 0
  )
  const countsRef = useRef(0)
  const [waitingRef, setWaitingRef] = useState(false)
  const [disconnected, setDisconnected] = useState(false)
  const [redErrorRef, setRedErrorRef] = useState(false)
  const timerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState(false)

  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const astroDetails = useSelector(
    state => state?.AstroDetailsDataSlice?.astroDetails
  )

  const startTimer = async () => {
    if (+is_freechat_count > 0) {
      setTime({ minutes: +loginUserData?.freechat_duration, seconds: 0 })
    } else {
      setTime({ minutes: 0, seconds: 0 })
    }
  }

  const resumeTimer = async () => {
    timerRef.current?.resumeTimer()
  }

  const pauseTimer = () => {
    timerRef.current?.pauseTimer()
  }

  const getAstrologerDetail = async id => {
    try {
      let data = {
        astrologer_id: id
      }
      const response = await getAstrologersDetails(data)
      if (response.code === 1) {
        dispatch(setAstroDetails(response.data))
      }
    } catch (error) {}
  }

  const handleReview = async rating => {
    try {
      const response = await giveStarPlusReview(rating)
      if (response.code === 1) {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    // setModalVisible(false)
  }

  const sendMessage = () => {
    if (socket && message.trim()) {
      const msgData = {
        chat_room_id: '',
        sender_id: senderId,
        sender_type: 'user',
        receiver_id: receiverId,
        receiver_type: 'astrologer',
        message: message,
        message_type: '',
        image: '',
        attachment: '',
        attachment_type: '',
        // free_chat: is_freechat_count === 0 ? false : true,
        free_chat: urlData.is_ai_chat == '1' ? true : false,
        userDetails: {
          name: loginUserData?.name || 'hello User',
          dob:
            formatDate(loginUserData?.dob, 'DD-MM-YYYY') !== 'Invalid date'
              ? formatDate(loginUserData?.dob, 'DD-MM-YYYY')
              : '01-01-2000',
          tob:
            formatTime(loginUserData?.time_of_birth, 'hh:mm A') !==
            'Invalid date'
              ? formatTime(loginUserData?.time_of_birth, 'hh:mm A')
              : '01:11 PM',
          place: loginUserData?.place_of_birth || 'Amreli, Gujarat, IN'
        }
      }
      socket.emit('send_message', msgData)
      // Reset input
      setMessage('')
    }
  }

  const isSameDate = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  const formatDateLabel = date => {
    if (isSameDate(date, today)) return 'Today'
    if (isSameDate(date, yesterday)) return 'Yesterday'
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const addTodayLabel = () => {
    let msg = {}
    const date = new Date()
    let formattedLabel = formatDateLabel(date)
    msg.timeStampLabel = formattedLabel
    return msg
  }

  const getChatData = async () => {
    setLoading(true)
    try {
      let chatAstroID = await Decryption(chatAstroId)
      setUrlData(chatAstroID)
      setSessionID(chatAstroID?.sessionID)
      dispatch(setAstroPaymentDetails(chatAstroID))
      let id = ''
      if (chatAstroID.chatType === 'history') {
        id = chatAstroID?.receiver_id
        setReceiverId(chatAstroID?.receiver_id)
        try {
          let data = {
            chat_room_id: chatAstroID?._id
          }
          const response = await chatHistory(data)
          if (response?.code === 1) {
            let lastDateLabel = null
            const mergedMessages = (response?.data).map(msg => {
              const date = new Date(msg.created_at)
              let formattedLabel = null

              if (!lastDateLabel || !isSameDate(lastDateLabel, date)) {
                formattedLabel = formatDateLabel(date)
                lastDateLabel = date
              }

              if (formattedLabel) {
                msg.timeStampLabel = formattedLabel
              }

              return msg
            })
            setMessages(mergedMessages)
          }
        } catch (error) {}
        setHistory(true)
        setWaitingRef(false)
        setRedErrorRef(false)
        setDisconnected(false)
      } else {
        connectSocket(false, chatAstroID)
        id = chatAstroID?._id
        setReceiverId(chatAstroID?._id)
        setMessages([])
      }

      if (Object?.keys(astroDetails)?.length === 0) {
        getAstrologerDetail(id)
      }
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }

  const chatAddDuration = async () => {
    try {
      let data = {
        astrologer_id: receiverId,
        chat_duration_minutes: 1,
        amount: +is_freechat_count > 0 ? 0 : 1 * +astroDetails?.price_per_min,
        is_free: +is_freechat_count > 0 ? true : false,
        session_id: sessionID
      }

      const response = await addChatduration(data)

      if (response?.code === Codes?.SUCCESS) {
        let changedData = {
          total_wallet_balance: response?.data?.total_wallet_balance
        }
        setLoginUserData(
          dispatch,
          is_login,
          loginUserData,
          setUserLoginData,
          changedData
        )

        if (
          response?.data?.is_free === 'true' &&
          time.minutes === 0 &&
          time.seconds === 0
        ) {
          navigate(`${PATHS?.CHATWITHASTROLOGERS}`)
        }
      } else if (response?.code === Codes.INVALID_OR_FAIL) {
        disconnectSocket()
        openModel(dispatch, 'openRecharge')
        pauseTimer()
      }
    } catch (error) {}
  }

  const deductMoney = async () => {
    try {
      if (
        +loginUserData?.total_wallet_balance > +astroDetails?.price_per_min ||
        +loginUserData?.is_freechat_count > 0
      ) {
        chatAddDuration()
      } else {
        disconnectSocket()
        openModel(dispatch, 'openRecharge')
        pauseTimer()
      }
    } catch (error) {}
  }

  const scrollBottom = () => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const freshMessage = (chatType, socket) => {
    if (chatType === 'new') {
      let msgData = {
        chat_room_id: '',
        sender_id: senderId,
        sender_type: 'user',
        receiver_id: receiverId,
        receiver_type: 'astrologer',
        message: `name: ${loginUserData?.name || 'Test User'}<br /> dob: ${
          formatDate(loginUserData?.dob, 'DD-MM-YYYY') !== 'Invalid date'
            ? formatDate(loginUserData?.dob, 'DD-MM-YYYY')
            : '01-01-2000'
        }<br /> tob: ${
          formatTime(loginUserData?.time_of_birth, 'hh:mm A') !== 'Invalid date'
            ? formatTime(loginUserData?.time_of_birth, 'hh:mm A')
            : '01:11 PM'
        }<br /> place: ${
          loginUserData?.place_of_birth || 'Amreli, Gujarat, IN'
        } <br /> Hello ${
          urlData?.name || 'Hello Userji'
        }Ji,<br /> Jay Shree Krishna !! <br />`,
        message_type: '',
        image: '',
        attachment: '',
        attachment_type: '',
        // free_chat: is_freechat_count === 0 ? false : true,
        free_chat: urlData.is_ai_chat == '1' ? true : false,
        userDetails: {
          name: loginUserData?.name || 'Kim Jong Un',
          dob: formatDate(loginUserData?.dob, 'DD-MM-YYYY') || '01-01-2000',
          tob:
            formatTime(loginUserData?.time_of_birth, 'hh:mm A') || '01:11 PM',
          place: loginUserData?.place_of_birth || 'Amreli, Gujarat, IN'
        }
      }
      socket.emit('send_message', msgData)
    }
  }

  const connectSocket = (reconnect = false, chatAstroID = {}) => {
    let rec_id = receiverId || chatAstroID?._id
    if ((!socket && senderId && rec_id) || reconnect) {
      // if ((!socket && senderId && (receiverIds ? receiverIds : receiverId)) || reconnect) {
      let urlDatas = Object.keys(chatAstroID).length > 0 ? chatAstroID : urlData
      const newSocket = createSocket(
        senderId,
        rec_id,
        urlDatas.is_ai_chat == '1' ? true : false
      )
      setSocket(newSocket)
      newSocket.on('connect', () => {})
      newSocket.on('disconnect', err => {
        setIsSocketConnected(false)
      })

      newSocket.on('connect_error', err => {
        setIsSocketConnected(false)
        console.error('Connection error:', err.message)
      })

      newSocket.on('chat_status', data => {
        setShowMessage(data?.code === Codes.SUCCESS ? 'Online' : 'Waiting...')
        if (data?.code === Codes.SUCCESS || data?.code === '') {
          setSocket(newSocket)
          setIsSocketConnected(true)
          if (urlDatas.chatType === 'new' && countsRef.current === 0) {
            countsRef.current = 1
            freshMessage(urlDatas.chatType, newSocket)
            startTimer()
          } else {
            resumeTimer()
          }
          setWaitingRef(false)
          setRedErrorRef(false)
          setDisconnected(false)
        } else if (
          data?.code === Codes.NO_DATA_FOUND ||
          data?.code === Codes.INVALID_OR_FAIL
        ) {
          setTyping(data || {})
          setWaitingRef(true)
          setRedErrorRef(false)
          setDisconnected(false)
        } else if (data?.code === Codes.DELETE_ACCOUNT) {
          //reject mate 3 lidhu che
          setWaitingRef(false)
          setRedErrorRef(true)
          setDisconnected(false)
        } else if (data?.code === Codes.ASTROLOGER_DISCONNECTED) {
          // openModel(dispatch, 'waitingForAstrologer')
          pauseTimer()
          setDisconnected(true)
        } else {
          setIsSocketConnected(false)
          disconnectSocket()
          setDisconnected(false)
        }
      })

      newSocket.on('send_message', data => {
        setMessages(prev => {
          if (prev.length === 0) {
            const obj = addTodayLabel()
            return [obj, data?.data]
          } else {
            return [...prev, data?.data]
          }
        })
        // setMessages(prev => [...prev, data?.data])
      })

      newSocket.on('typing', data => {
        setTyping(data)
      })

      newSocket.on('stop_typing', data => {
        setTyping(data || {})
      })

      newSocket.on('send_message_error', data => {})
    }
  }

  const disconnectSocket = async () => {
    if (socket) {
      socket.disconnect()
      setSocket(null)
      setIsSocketConnected(false)
    }
  }

  const editChatRequestApi = async () => {
    if (urlData?.AstroData) {
      try {
        const payload = {
          chat_request_id: urlData?.AstroData?._id,
          conversation_types: urlData?.AstroData?.conversation_types,
          astro_request: '',
          user_request: '2',
          is_active: '',
          is_delete: ''
        }
        const editChatReq = await editChatRequest(payload)
        if (editChatReq.code === Codes.SUCCESS) {
        } else {
          TOAST_ERROR(response.message)
        }
      } catch (error) {
        TOAST_ERROR(error.message)
      }
    }
  }

  const endChat = async () => {
    navigate(PATHS.HOMEPAGE)
  }

  const onPaymentSuccess = async () => {
    try {
      await connectSocket()
      // await chatAddDuration()
      await closeModel(dispatch)
      setHistory(false)
    } catch (error) {}
  }

  const freeChatComplete = async () => {
    // chatAddDuration()
    pauseTimer()
    editChatRequestApi()
    endChat()
  }

  //   const handleChatStart = async () => {
  //   if (+loginUserData?.total_wallet_balance > +astroDetails?.price_per_min) {
  //     try {
  //       const response = await addChatRequest({
  //         astrologer_id: urlData?.receiver_id,
  //         conversation_types: 'chat'
  //       });

  //       const updatedData = cloneDeep(urlData);
  //       updatedData.AstroData = response.data;
  //       setUrlData(updatedData);

  //       await connectSocket();
  //       // await chatAddDuration();
  //       await closeModel(dispatch);
  //       setHistory(false);
  //     } catch (error) {
  //       console.error('Failed to start chat:', error);
  //       // Optionally show error to user
  //     }
  //   } else {
  //     openModel(dispatch, 'openRecharge');
  //   }
  // };

  // ui parts

  const handleChatStart = async () => {
    const walletBalance = +loginUserData?.total_wallet_balance || 0
    const perMinutePrice = +astroDetails?.price_per_min || 0

    if (walletBalance > perMinutePrice) {
      const receiverId = urlData?.receiver_id
      // if (!receiverId) return

      try {
        const { data, code, message } = await addChatRequest({
          astrologer_id: receiverId,
          conversation_types: 'chat'
        })
        if (code === Codes.SUCCESS) {
          setUrlData(prev => ({ ...prev, AstroData: data }))
          await Promise.all([connectSocket(), closeModel(dispatch)])
          setHistory(false)
        } else {
          TOAST_ERROR(message)
        }
      } catch (error) {
        TOAST_ERROR(error.message)
      }
    } else {
      openModel(dispatch, 'openRecharge')
    }
  }

  const ChatMessage = React.memo(
    ({ message, isUser, time }) => {
      return (
        <div
          className={`flex ${
            isUser ? 'justify-end' : 'justify-start'
          } 
          my-2 mb-4`}
          // px-2 md:px-6 
        >
          <div className='flex flex-col items-start'>
            <div
              className={`max-w-md px-5 py-3 text-[16px] font-medium rounded-lg leading-[180%] ChatMessage
          ${
            isUser
              ? 'bg_website_color text-white rounded-br-none self-end'
              : 'commonLightBack text-[#333333] rounded-bl-none'
          }`}
              dangerouslySetInnerHTML={{ __html: message }}
            ></div>
            {/* <p className='max-w-md px-5 py-3 text-[16px] font-medium rounded-lg leading-[180%] ChatMessage'>
          {message}
        </p> */}
            <div
              className={`text-[16px] font-normal text-gray-500 mt-1 w-full text-end leading-5 ${
                isUser
                  ? 'text-right text-[#e3725d] self-end pr-1'
                  : 'text-gray-500 pl-1'
              }`}
            >
              {time}
            </div>
          </div>
        </div>
      )
    },
    [message]
  )

  const renderedMessages = useMemo(() => {
    return messages?.map((ele, ind) => (
      <React.Fragment key={ele?.created_at}>
        {ele?.timeStampLabel && (
          <div className='text-center text-[#A1A1A1] text-xs mb-7 flex justify-center sticky top-0 left-0 max-w-[150px] min-w-[150px] mx-auto'>
            <p className='min-w-max max-w-max commonLightBack bg-opacity-10 text-[#e3725d] px-4 py-2 rounded-md font-medium text-[14px] mb-0 shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]'>
              {ele?.timeStampLabel}
            </p>
          </div>
        )}
        {Object.keys?.(ele)?.length > 2 && (
          <ChatMessage
            isUser={ele?.sender_type === 'user'}
            message={ele?.message}
            time={utcToTst(ele?.created_at) || ''}
          />
        )}
      </React.Fragment>
    ))
  }, [messages])

  const WaitingMessage = () => (
    <div className='website_color w-full'>
      <p className='text-center mb-0 text-[12px] sm:text-[16px]'>
        Your request has been sent to the astrologer! Please wait a moment while
        we connect you. Thank you for your patience!
      </p>
    </div>
  )

  const HistoryMessage = () => (
    <div className='website_color w-full flex justify-center items-center mx-auto'>
      {' '}
      <p className='text-center mb-0 text-[12px] sm:text-[16px]'>
        {/* {Astrologer_Name} ₹ {Astrologer_per_min}  */}
        price per min, Would you like to continue the chat?
      </p>
      <button
        className='text-[12px] sm:text-[16px] !border-[unset] box_shadow_common py-2 px-2 sm:px-5 ms-3 rounded-sm cursor-pointer transition-all bg-white text-[#e3725d] font-bold hover:text-white hover:bg-[linear-gradient(90deg,_#C32853_0%,_#EE7E49_100%)]'
        onClick={handleChatStart}
      >
        Continue Chat
      </button>
    </div>
  )

  const ErrorMessage = () => (
    <div className='website_color w-full'>
      {' '}
      <p className='text-center mb-0 text-[12px] sm:text-[16px]'>
        Sorry, Right now our all astrologer are busy, Please wait while to
        connect or try again after sometime !!
      </p>
    </div>
  )

  const showChatInput = useMemo(() => {
    return (
      waitingRef === false &&
      redErrorRef === false &&
      disconnected === false &&
      history === false
    )
  }, [waitingRef, redErrorRef, disconnected, history])

  if (!senderId) {
    return (
      <>
        <div className='bg_website_color text-white py-3 px-7 flex items-center gap-4 rounded-t-xl'>
          <FontAwesomeIcon
            icon={faUser}
            className='w-8 h-8 rounded-full border-2 border-white p-3'
          />
          <FontAwesomeIcon
            icon={faQuestion}
            className='text-[50px] text-white'
          />
        </div>

        {/* Chat Area */}
        <div className='h-[450px] overflow-y-auto py-5 pb-12 bg-white leading-none flex items-center justify-center'>
          <CustomButton
            className=' text-white px-4 py-2 rounded-md  border '
            onClick={() => setIsModalOpen(true)}
          >
            {t('login')}
          </CustomButton>
        </div>

        {/* Input Area */}
        <div className='bg-[#F7F2FD] px-4 py-3 flex items-center gap-3 rounded-b-xl'>
          <textarea
            placeholder='Write your message'
            className='rounded-full px-4 py-2 flex-1 bg-white text-[16px] font-medium chatInput'
            disabled={true}
          />
          <AudioOutlined
            className='text-xl text-gray-500 cursor-pointer'
            disabled={true}
          />
          <SendOutlined
            className='text-xl text-[#6A1B9A] cursor-pointer'
            disabled={true}
          />
        </div>

        <PhoneAuthModals
          isPhoneModalOpen={isModalOpen}
          issetIsModalOpen={setIsModalOpen}
        />
      </>
    )
  }

  // ui parts

  const handleImageError = useCallback(e => {
    e.target.onerror = null
    e.target.src = sampleImage
  }, [])

  useEffect(() => {
    if (senderId !== '' && receiverId !== '') {
      // connectSocket()
    } else {
      disconnectSocket()
    }
    return () => {
      disconnectSocket()
    }
  }, [senderId, receiverId])

  useEffect(() => {
    getChatData()

    // const handleBeforeUnload = event => {
    //   event.preventDefault()
    //   event.returnValue = ''
    // }
    // window.addEventListener('beforeunload', handleBeforeUnload)
    // return () => {
    //   window.removeEventListener('beforeunload', handleBeforeUnload)
    // }
  }, [])

  useEffect(() => {
    scrollBottom()
  }, [messages])
  if (loading)
    return (
      <div className='py-10'>
        <Loader2 />
      </div>
    )

  return (
    <>
      <section className=' chat_section'>
        <div className='container mx-auto py-2'>
          <div className='bg-white rounded-[10px] shadow-md overflow-hidden'>
            <div>
              <div className='shadow-[rgba(0, 0, 0, 0.35) 0px 5px 15px] relative z-[1]'>
                <div className='bg_website_color text-white py-3 px-2 md:px-5 lg:px-7 flex items-center gap-2 sm:gap-4 rounded-t-xl justify-between flex-wrap'>
                  <div className='flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap'>
                    <img
                      src={astroDetails?.profile_image}
                      alt='astrologer'
                      className='w-8 h-8 sm:w-15 sm:h-15 rounded-full border-2 border-white bg-white object-cover'
                      onError={e => handleImageError(e)}
                      loading='lazy'
                      decoding='async'
                      width={60}
                      height={60}
                    />
                    <div className='flex flex-col gap-[5px]'>
                      <div className='text-[14px] sm:text-[20px] font-bold capitalize break-all'>
                        {astroDetails?.name}
                      </div>
                      {typing?.role ? (
                        <div className='text-[14px] font-medium capitalize break-all'>
                          {typing?.role} {typing?.role && ` typing...`}
                        </div>
                      ) : (
                        <>
                          {waitingRef ? (
                            <p className='mb-0 text-[12px]'>
                              {'Waiting for Astrologer...'}
                            </p>
                          ) : (
                            <>
                              {disconnected ? (
                                <p className='mb-0 text-[12px]'>
                                  {'Astrologer Disconected'}
                                </p>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className='text-[16px] font-normal relative min-w-[130px] min-h-[21px] flex items-center'>
                    <CountdownTimer
                      ref={timerRef}
                      freeChatComplete={freeChatComplete}
                      // time={time}
                      minutes={time.minutes}
                      seconds={time.seconds}
                      setTime={setTime}
                      is_freechat_count={is_freechat_count}
                      isSocketConnected={isSocketConnected}
                      onApiCall={deductMoney}
                    />

                    <button
                      className='text-[12px] sm:text-[16px] border border-white py-2 px-2 sm:px-5 ms-3 rounded-sm cursor-pointer transition-all bg-white text-[#e3725d] font-bold hover:text-white hover:bg-[linear-gradient(90deg,_#C32853_0%,_#EE7E49_100%)]'
                      onClick={() => {
                        // disconnectSocket()
                        // editChatRequestApi()
                        // endChat()
                        openModel(dispatch, 'end_chat')
                      }}
                    >
                      End Chat
                    </button>
                  </div>
                </div>
              </div>

              <div className='relative'>
                <div
                  className={`overflow-y-auto py-5 pb-12 bg-white leading-none chatbox_sec ${
                    messages.length === 0
                      ? 'flex items-center justify-center'
                      : ''
                  }`}
                >
                  {renderedMessages}

                  {messages?.length === 0 && (
                    <div className='px-5 block mx-auto text-center'>
                      <img
                        src={notFoundImg}
                        alt='no-data-found '
                        className='max-w-[300px] block object-contain mx-auto '
                      />
                      <div className='website_new_color '>
                        <p className='text-[35px] font-bold mb-0 -mt-8 leading-[150%]'>
                          {waitingRef
                            ? 'Waiting for Astrologer...'
                            : 'No Chat Found.'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div ref={scrollBottomRef}></div>
                </div>
              </div>
              {
                <div className='commonLightBack px-2 sm:px-4 py-2 sm:py-5 flex items-center gap-3 rounded-b-xl '>
                  {showChatInput ? (
                    <>
                      {' '}
                      <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                          }
                        }}
                        placeholder='Write your message'
                        className='rounded-full px-4 !py-3 flex-1 bg-white text-[16px] font-medium chatInput'
                      />
                      <img
                        src={chatSendIcon}
                        alt='send'
                        width={25}
                        height={26}
                        onClick={sendMessage}
                        decoding='async'
                        loading='lazy'
                        className={` ${
                          isSocketConnected
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed'
                        }`}
                      />
                    </>
                  ) : waitingRef === true ? (
                    <WaitingMessage />
                  ) : (
                    <>
                      {history ? (
                        <HistoryMessage />
                      ) : redErrorRef || disconnected ? (
                        <ErrorMessage />
                      ) : null}
                    </>
                  )}
                </div>
              }
            </div>
          </div>
        </div>
        <RatingModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleReview}
          expertName={astroDetails?.name}
          astrologerId={receiverId}
          imageUrl={astroDetails?.profile_image}
        />
        <PaymentModal
          isOpen={is_model && model_type == 'openRecharge'}
          title={`"Your wallet balance is lower than the astrologer's per-minute rate. To continue the chat, please recharge your wallet. `}
          description=''
          okText='Recharge Now'
          cancelText='Cancel'
          onPaymentSuccess={onPaymentSuccess}
          onCancel={() => {
            closeModel(dispatch)
            editChatRequestApi()
            endChat()
          }}
          className='paymentModel'
        />
        <ConfirmModal
          isOpen={is_model && model_type === 'end_chat'}
          title={t('you_want_to_end_chat')}
          description={t('you_want_to_end_chat_descreption')}
          okText={t('end_chat')}
          cancelText={t('cancel')}
          onConfirm={() => {
            disconnectSocket()
            editChatRequestApi()
            closeModel(dispatch)
            endChat()
          }}
          onCancel={() => {
            closeModel(dispatch)
          }}
        />
      </section>
      {/* <ReloadModal
        isOpen={reloadOpen}
        title='Are you sure?'
        description="This action Can't be undone."
        okText='Yes'
        cancelText='Cancel'
        onCancel={onCancelReload}
        onConfirm={onConfirmReload}
      /> */}
    </>
  )
}

export default React.memo(ChatUI)
