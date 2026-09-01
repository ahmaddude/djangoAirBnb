interface CustomButtonProps{
    label:string;
    onClick?:()=>void;
    className?:string;
}
const CustomButton:React.FC<CustomButtonProps>= ({label, onClick, className})=>{
    return(
        <button className={`w-full py-4 bg-airbnb hover:bg-airbnbDark text-white rounded-xl transition cursor-pointer ${className}`}
        onClick={onClick}>
            {label}
        </button>
    )
}

export default CustomButton;