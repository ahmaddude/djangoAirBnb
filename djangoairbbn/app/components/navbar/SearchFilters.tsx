const SearchFilters=()=>{
    return(
        <div className="h-16 flex flex-row items-center justify-between border border-gray-300 rounded-full">
            <div className="hidden lg:block" >
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer w-50 h-16 px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 ">
                        <p className="text-xs font-semibold">Where</p>
                        <p className="text-sm">Wanted location</p>
                    </div>

                    <div className="cursor-pointer w-34 h-16 px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 ">
                        <p className="text-xs font-semibold">Check in</p>
                        <p className="text-sm">Add dates</p>
                    </div>

                    <div className="cursor-pointer w-34 h-16 px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 ">
                        <p className="text-xs font-semibold">Check out</p>
                        <p className="text-sm">Add dates</p>
                    </div>
                    <div className="cursor-pointer w-34 h-16 px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 ">
                        <p className="text-xs font-semibold">Who</p>
                        <p className="text-sm">Add guests</p>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <div className="cursor-pointer p-4 bg-airbnb hover:bg-airbnbDark rounded-full text-white">
                    <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false"
                    style={{ display:'block', fill:'none', height:'16px', width:'16px', stroke:'currentcolor', strokeWidth:4 , overflow:'visible' }} >
                        <path d="m20.666 20.666 10 10"></path><path d="m24.0002 12.6668c0 6.2593-5.0741 11.3334-11.3334 11.3334-6.2592 0-11.3333-5.0741-11.3333-11.3334 0-6.2592 5.0741-11.3333 11.3333-11.3333 6.2593 0 11.3334 5.0741 11.3334 11.3333z" fill="none"></path>
                        </svg>
                        </div>
            </div>
        </div>
    )
}

export default SearchFilters