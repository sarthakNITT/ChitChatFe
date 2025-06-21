interface ILine {
    title: string
}

export function LineComponent (props: ILine) {
    return <div className='flex pr-10 pl-10 items-center w-full gap-5 justify-center '>
        <div className='border-[0.1px] border-stone-900/20 w-full'></div>
        <div className='text-stone-900/70 text-sm'>{props.title}</div>
        <div className='border-[0.1px] border-stone-900/20 w-full'></div>
    </div>
}