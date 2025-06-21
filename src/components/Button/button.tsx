type Tstyle = {
    bgColor?: string,
    textColor?: string,
    width?: string,
    random?: string
}

interface Ibutton {
    title: string,
    runFunction: ()=>void,
    style?: Tstyle,
    transition?: boolean,
}

export default function ButtonComponent (props: Ibutton) {
    const defaultStyles = `
        ${props.style?.random?.includes("pt") ? props.style?.random : "pt-3"}
        ${props.style?.random?.includes("pb") ? props.style?.random : "pb-3"}
        ${props.style?.random?.includes("pr") ? props.style?.random : "pr-3"}
        ${props.style?.random?.includes("pl") ? props.style?.random : "pl-3"}
        text-[13px] cursor-pointer rounded-[10px] shadow-xl ${props.transition===true ? " duration-300 ease-out ease-in hover:scale-102 transform-gpu" : null }`
    return (
        <button className={defaultStyles + " " + props.style?.bgColor + " " + props.style?.textColor + " " + props.style?.width + " " + props.style?.random } onClick={props.runFunction}>{props.title}</button>
    )
}