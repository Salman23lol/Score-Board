
import { React, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [friends, setFriends] = useState([]);
  const [count, setCount] = useState(0);
  const [addButtonClicks, setAddButtonClicks] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [loopInterval, setLoopInterval] = useState(null);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      setFriends([...friends, { id: friends.length, name: inputValue, points: count }]);
      setCount(0);
      setInputValue("");
      setAddButtonClicks(addButtonClicks + 1);
    }
  };

  const handleRemoveClick = (id) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    setFriends(updatedFriends);
  };

  useEffect(() => {
    // Start the loop when the component mounts (page refresh)
    const intervalId = setInterval(() => {
      setLoopCount((prevLoopCount) => prevLoopCount + 1);
    }, 1000);

    // Store the interval ID in state
    setLoopInterval(intervalId);

    // Clear the interval when the component unmounts (page is closed or navigated away)
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleStartLoop = () => {
    // Start the loop
    const intervalId = setInterval(() => {
      setLoopCount((prevLoopCount) => prevLoopCount + 1);
    }, 1000);

    // Store the interval ID in state
    setLoopInterval(intervalId);
  };

  const handleResetLoop = () => {
    // Stop the loop by clearing the interval
    if (loopInterval) {
      clearInterval(loopInterval);
      setLoopInterval(null);
    }

    // Reset the loop count
    setLoopCount(0);
  };

  return (
    <>
      <div className="nav bg-green-300 w-full h-26">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-col pl-4 text-start">
            <h1
              className="text-lg text-black font-semibold"
              id="total-friend-count"
            >
              Players: {friends.length}
            </h1>
            <h1
              className="text-lg text-black font-semibold"
              id="all-friends-points"
            >
              Total Points: {friends.reduce((total, friend) => total + friend.points, 0)}
            </h1>
          </div>
          <p className="text-3xl font-semibold text-black">Score Board</p>
          <div className="w-1/5 h-26 bg-blue-300">
            <div className="flex flex-col items center">
              <h1 className="text-lg font-semibold text-black text-center mt-2">
                Stop Watch
              </h1>
              <h1
                className="text-lg font-semibold text-black text-center mt-2"
                id="loop-count"
              >
                {loopCount}
              </h1>
              <div className="flex flex-row items-center justify-between px-4">
                <button className="bg-green-300 px-2 py-1 my-2 cursor-pointer" id="start-loop" onClick={handleStartLoop}>
                  Start
                </button>
                <button className="bg-green-300 px-2 py-1 my-2 cursor-pointer" id="reset-loop" onClick={handleResetLoop}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main bg-gray-100 w-full h-[482px] overflow-y-scroll">
        <div className="flex flex-col items-center w-full h-16 container mx-auto">
          {friends.map((friend) => (
            <div
              className="flex flex-row items-center justify-between px-4 bg-blue-200 py-1 mt-8 w-[100%]"
              id="item"
              key={friend.id}
            >
              <div className="flex flex-row items-center justify-between w-[14%]">
                <i
                  class="fa-solid fa-xmark text-lg text-black"
                  onClick={() => handleRemoveClick(friend.id)}
                ></i>
                <i class="fa-solid fa-crown text-black text-lg" id="plus-point"></i>
                <h1 className="text-lg text-black font-medium" id="friend">
                  {friend.name}
                </h1>
              </div>
              <div className="flex flex-row justify-evenly w-1/4 h-16">
                <button
                  className="bg-gray-300 flex items-center justify-center text-3xl px-6"
                  id="less-btn"
                  onClick={decrement}
                >
                  -
                </button>
                <button
                  className="flex items-center justify-center text-3xl px-6"
                  id="friend-points"
                >
                  {count}
                </button>
                <button
                  className="bg-gray-300 flex items-center justify-center text-3xl px-6"
                  id="add-btn"
                  onClick={increment}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer w-full h-24 bg-green-300">
        <div className="flex flex-row w-full h-full items-center justify-between px-4">
          <input
            type="text"
            name="user-input"
            id="user-input"
            className="px-4 py-3 w-[78%] rounded inpit- text-white"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Player Name"
          />
          <button
            className="px-20 rounded py-3 bg-blue-300 text-white font-semibold"
            id="add-friend"
            onClick={handleButtonClick}
          >
            Add Friend
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
