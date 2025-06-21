
type TInput = {
    width?: string,
    random?: string
}

interface IInput {
    placeholder: string,
    style?: TInput,
    value: any,
    onchange: any
}

export default function InputComponent (props: IInput) {
    const defaultStyles = `text-[14px] pt-2 pb-2 pr-3 pl-3 border-stone-300 rounded-[10px] bg-stone-400/10`
    return (
        <input className={defaultStyles + " " + props.style?.width + " " + props.style?.random} placeholder={props.placeholder} onChange={props.onchange} value={props.value}/>
    )
}