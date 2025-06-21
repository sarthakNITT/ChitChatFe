interface IHeading {
    title: any
}

export default function HeadingComponent (props: IHeading) {
    return (
        <div className='text-center pr-10 pl-10 text-[45px]/[1.2] font-bold w-full whitespace-normal '>
            {props.title} <span className='text-[#ee5f33]'>ChitChat</span>
        </div>
    )
}