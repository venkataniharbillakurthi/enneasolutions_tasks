import React from 'react';
import search from '../assets/icons/search.svg';
import { useNavigate } from "react-router-dom";

const Nav = ({ input, setInput, setPlace }) => {
  const navigate = useNavigate();

  const goToLandingPage = () => {
    navigate("/");
  };

  const submitCity = () => {
    const trimmedInput = input.trim(); 
    if (trimmedInput) {
      setPlace(trimmedInput); 
      setInput('');
    } else {
      alert('Please enter a valid city name.'); 
    }
  };

  return (
    <nav className="w-full p-3 flex justify-between items-center">
      <button
        onClick={goToLandingPage}
        className="bg-blue-100 px-2 py-1 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white"
      >
        Back
      </button>
      <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>
      <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
        <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
        <input
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              submitCity();
            }
          }}
          type="text"
          placeholder="Search city"
          className="focus:outline-none w-full text-[#212121] text-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Nav;
