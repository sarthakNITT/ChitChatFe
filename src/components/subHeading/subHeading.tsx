interface ISubHeading {
    title: string
}

export default function SubHeadingComponent (props: ISubHeading) {
    return (
        <div className='w-full pr-10 pl-10 text-center text-stone-900 font-medium '>
            {props.title}
        </div>
    )
}