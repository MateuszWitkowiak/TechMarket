import React from 'react'
import Logo from '../components/Logo'

export default function register() {
  const handleSearchClick = () => {
    return
  }
  return (
    <div className="flex flex-row h-12 w-[100%]">
      <Logo />
      <input type="search" placeholder="Search here.." onClick={handleSearchClick}/>
    </div>
  )
}
