const UserNav=()=>{
    return(
        <div className="p-2 relative inline-block border border-gray-500 rounded-full">
            <button className="cursor-pointer flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                </svg>
            </button>
        </div>
    )
}

export default UserNav;