
import { useNavigate } from 'react-router-dom'
import { ChatSVG } from '../../assets/logo'
import CardComponent from '../../components/card/card'
import ButtonComponent from '../../components/Button/button'
import InputComponent from '../../components/input/input'
import SubHeadingComponent from '../../components/subHeading/subHeading'
import HeadingComponent from '../../components/heading/heading'
import HeadPop from '../../components/head-pop/head-pop'
import { HomeUtils } from '../../utils/helperFunction'
import { useRecoilState } from 'recoil'
import { RoomId } from '../../utils/states/roomId'
import axios from 'axios'
import { LineComponent } from '../../components/Line/LineComponent'

export default function Home () {

    const navigate = useNavigate()
    const [roomId, setRoomId] = useRecoilState(RoomId)

    async function createRoomID (id: string, p: any) {
      if(p === "Join") {
        const call = await axios.get("http://localhost:5001/getAllId")
        console.log(call);
        const check = call.data.includes(id.trim())
        if(!check) {
          alert("Invalid Room Id")
          return
        }
      }
      if (!sessionStorage.getItem("tabId")) {
        sessionStorage.setItem("tabId", crypto.randomUUID());
      }
      
      const generateUserId = Math.floor(100000 + Math.random() * 900000).toString()
      const tabId = sessionStorage.getItem("tabId");
      sessionStorage.setItem(`${tabId}-roomVar`, id);
      sessionStorage.setItem(`${tabId}-userId`, generateUserId);

      navigate("/chatPage")
    }
  
    return (
      <>
      <div className='flex flex-col h-screen items-center justify-center '>
        <CardComponent>
        <HeadPop title={HomeUtils.HeadPop} logo={<ChatSVG/>} />
        <HeadingComponent title={HomeUtils.Heading} />
        <SubHeadingComponent title={HomeUtils.SubHeading} />
        <div className='w-full pr-10 pl-10'>
          <InputComponent placeholder={HomeUtils.InputPlaceHolder} value={roomId} onchange={(e: any)=>setRoomId(e.target.value)} style={{
            width: "w-full",
            random: "mb-2"
          }}/>
          <ButtonComponent title={HomeUtils.Button1Title} runFunction={()=>createRoomID(roomId, "Join")} transition={true} style={{
            bgColor: "bg-black",
            textColor: "text-white",
            width: "w-full"
          }} />
        </div>
        
        <LineComponent title='OR' />
        <div className='pr-10 pl-10 w-full'>
          <ButtonComponent title={HomeUtils.Button2Title} transition={true} style={{
            bgColor: "bg-[#ee5f33]",
            textColor: "text-white",
            width: "w-full"
          }} runFunction={()=>createRoomID(Math.floor(100000 + Math.random() * 900000).toString(), "Create")} />
        </div>
        <div className='pr-10 pl-10 w-full'>
          <ButtonComponent title={HomeUtils.Button3Title} transition={true} style={{
            bgColor: "bg-transparent",
            textColor: "text-black",
            width: "w-full",
            random: "border-[1px] border-black"
          }} runFunction={()=>createRoomID("ChatWithAI"+Math.floor(100000 + Math.random() * 900000).toString(), "Create")} />
        </div>
        </CardComponent>
      </div>
      </>
    )
  }