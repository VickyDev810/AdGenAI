
function Header() {
    return (
        <header className="bg-footer text-signinpurple font-extrabold p-3 flex justify-between items-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
            <div className="flex items-center">
                <img src="logo.png" alt="Logo" className="h-9 w-16 mr-2" />
                <h1 className="text-2xl ">DeezNulls</h1>
            </div>
            <button className="bg-signinpurple text-white rounded w-20 h-10">Sign In</button>
        </header>
    );
}

export default Header;