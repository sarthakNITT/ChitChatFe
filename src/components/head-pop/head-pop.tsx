interface IHeadProp {
    title: string,
    logo?: any,
    random?: string
}

export default function HeadPop (props: IHeadProp) {
    return (
        <div className='cursor-pointer pr-10 pl-10 text-black flex items-center gap-1 bg-white pt-2 pb-2 pr-8 pl-8 rounded-[10px] text-[13px] border-stone-900 shadow-sm shadow-stone-500/50'>
            <span className="text-[#ee5f33] font-bold">{props.random}{props.logo}</span>{props.title}
        </div>
    )
}