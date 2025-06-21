
import { useEffect, useRef, useState } from 'react'
import CardComponent from '../../components/card/card'
import ButtonComponent from '../../components/Button/button'
import InputComponent from '../../components/input/input'
import HeadPop from '../../components/head-pop/head-pop'
import { ChatUtils } from '../../utils/helperFunction'
import { useRecoilState } from 'recoil'
import { Room } from '../../utils/states/roomVar'
import { ChatText } from '../../utils/states/chatText'
import { ChatArr } from '../../utils/states/chatArr'
import { UserId } from '../../utils/states/userid'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ChatPage () {
    const wsRef = useRef<WebSocket | null>(null)
    const [chats, setChats] = useRecoilState(ChatArr)
    const [userID, setUserID] = useRecoilState(UserId)
    const [roomVar, setRoomVar] = useRecoilState(Room)
    const [chat, setChat] = useRecoilState(ChatText)
    const [aiTyping, setAiTyping] = useState(false)
    const roomRef = useRef("")
    const userRef = useRef("")
    const awaitingAIResponseRef = useRef(false)
    const navigate = useNavigate()

    useEffect(()=>{
      setChats([])
      const tabId = sessionStorage.getItem("tabId");
      const getRoomVar = sessionStorage.getItem(`${tabId}-roomVar`) || roomVar 
      const getUserID = sessionStorage.getItem(`${tabId}-userId`) || userID

      if(getRoomVar.startsWith("ChatWithAI")){
        const aiChat = {
          message: "Hi, How can I help?",
          client: "AI"
        }
        setChats(m => [...m, aiChat])
      }

      const getChats = async function () {
        const res = await axios.get(`http://localhost:5001/getChats/${getRoomVar}`)
        console.log(res.data);
        
        if(res.data === "New Chat Room"){
          return 
        }
        const formatted = res.data.map((c: any) => ({
          message: c.Chat,
          client: c.ClientID
        }))
        setChats(formatted)        
      }
      getChats()

      roomRef.current = getRoomVar;
      userRef.current = getUserID;

      setRoomVar(getRoomVar)
      setUserID(getUserID)
      
      console.log(getRoomVar);
      console.log(getUserID);
      
      const ws = new WebSocket("ws://localhost:8080")
      wsRef.current = ws
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: "join",
          payload: {
            roomId: roomRef.current,
            clientId: userRef.current
          }
        }))
      }
      ws.onmessage = (event: any) => {
        const res = JSON.parse(event.data)
        setChats(m => [...m, {message: res.message, client: res.clientId}])
        if (res.clientId.startsWith("AI") && awaitingAIResponseRef.current) {
          setAiTyping(false)
          awaitingAIResponseRef.current = false
        }        
      }
    },[])
  
    function sendChat () {
      console.log(chat);
      console.log(userRef);
      if(chat.trim().length === 0){
        alert("enter chat")
        return
      }
      const isAIChat = roomRef.current.startsWith("ChatWithAI")
      if (isAIChat) {
        setAiTyping(true)  
        awaitingAIResponseRef.current = true 
      }
      wsRef.current?.send(JSON.stringify({
        type: "chat",
        payload: {
          message: chat,
          clientId: userRef.current,
          roomId: roomRef.current
        }
      }))
      setChat("")
    }

    function leaveChat () {
      console.log("pressed");
      
      wsRef.current?.send(JSON.stringify({
        type: "leave",
        payload: {
          clientId: userRef.current,
          roomId: roomRef.current
        }
      }))
      navigate("/")
    }
  
    return (
      <div className='flex flex-col h-screen items-center justify-center '>
          <CardComponent>
          <div className='flex justify-evenly w-full items-center'>
            <HeadPop random='Room Id - ' title={roomVar}/>
            <ButtonComponent style={{
              bgColor: "bg-[#ee5f33]",
              textColor: "text-white",
              random: "pt-2 pb-2"
            }} title='Leave chat' runFunction={leaveChat}/>
          </div>
          <div className='overflow-y-scroll pr-10 pl-10 overflow-x-hidden h-[100%] pt-2 pb-2 flex flex-col w-full gap-2 overflow-scroll pl-10 border-b border-t border-slate-200/50 w-full '>
          {chats.map((object, index)=>(
          (object.client === userID ? (
            <div key={index} className='flex flex-col pr-10 '>
              <div className='text-[8px] self-end flex'>
                {userID}
              </div>
                <div className='flex w-full justify-end items-center gap-2 group'>
                  <div className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                  </div>
                  <div className='bg-black rounded-[20px] text-[12px] text-white flex flex-col max-w-[45%] whitespace-pre-wrap break-words justify-start items-start shadow-sm pt-2 pb-2 pr-4 pl-4'>
                    {object.message}
                  </div>
                </div>
            </div>
          ) : (
            <div key={index} className='flex flex-col pr-10'>
              <div className='text-[8px] self-start flex'>
                {object.client}
              </div>
              <div className='bg-slate-100/10 self-start rounded-[20px] text-[12px] text-black flex flex-col max-w-[45%] whitespace-pre-wrap break-words justify-start items-start shadow-sm pt-2 pb-2 pr-4 pl-4'>
                {object.message}
              </div>
            </div>
          ))
          ))}
          {aiTyping && (
            <div className='flex flex-col pr-10'>
              <div className='text-[8px] self-start flex'>AI</div>
              <div className='bg-slate-100/10 self-start rounded-[20px] text-[12px] text-black flex flex-col max-w-[45%] justify-start items-start shadow-sm pt-2 pb-2 pr-4 pl-4'>
                <div className="animate-pulse">Typing...</div>
              </div>
            </div>
          )}
          </div>
          <div className='w-full flex flex-row justify-between items-center pr-10 pl-10'>
            <InputComponent placeholder={ChatUtils.InputPlaceholder} value={chat} onchange={(e: any)=>setChat(e.target.value)} style={{
              width: "w-[75%]"
            }}/>
            <ButtonComponent title={ChatUtils.Button1Title} runFunction={()=>sendChat()} style={{
              bgColor: "bg-[#ee5f33]",
              textColor: "text-white",
              random: "pt-2 pb-2"
            }} />
          </div>
        </CardComponent>
      </div>
    )
  }