import React from 'react'
import Logo from './Logo'
function Navbar() {
  return (
    <div className="flex flex-row h-24 w-full mt-4 ml-2 items-center border-b-2">
        <Logo />
        <input type="search" placeholder="Search here..." className="ml-4 pl-2 w-[40%] h-[30px]" />
        <div className="">

        </div>
        <div className="">

        </div>
        <div className="">

        </div>
    </div>
  )
}

export default Navbar