export default function CardComponent ({children}: any) {
    return (
        <div className="flex flex-col items-center pt-15 pb-15 min-h-[73%] rounded-[10px] shadow-xl gap-5 w-120">
            {children}
        </div>
    )
}