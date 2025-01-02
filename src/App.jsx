import { useState } from "react";
import "./App.css";
import Banner from "./components/Banner/Banner";
import FishContainer from "./components/FishContainer/FishContainer";
import Header from "./components/Header/Header";
import { toast } from "react-hot-toast";
import { addToLS, removeFromLS } from "./components/Utils/localStorage";
import Footer from "./components/Footer/Footer";

function App() {
  const [isActive, setIsActive] = useState(true);
  const [newfish, setNewFish] = useState([]);
  const [price, setPrice] = useState(0);

  const handleDelete = (id, money) => {
    const remainingFishes = newfish.filter((fish) => fish.ID !== id);
    console.log(remainingFishes);
    toast.success("Succesfully Removed From Cart", {
      duration: 3000,
      position: "bottom right",
      className: "h-20 font-bold",
    });
    setNewFish(remainingFishes);
    removeFromLS(id);
    setPrice((prev) => prev - money);
  };

  const handleAddToCart = (fish) => {
    const isExist = newfish.find((f) => f.ID === fish.ID);
    if (isExist) {
      toast.error("Can Not Add A Cart twice!!!", {
        duration: 2000,
        position: "right-top",

        // Styling
        style: {},
        className: "h-20",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#F44336", // Error icon color
          secondary: "#FFCDD2", // Secondary shade for the icon
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },

        // Additional Configuration
        removeDelay: 1000,
      });
    } else {
      setNewFish([...newfish, fish]);
      addToLS(fish.ID);
      setPrice((prev) => prev + fish.price);
      toast.success("Successfully Added To The Cart,Sir!!!", {
        duration: 1000,
        position: "right top",

        className: "h-20 font-bold",
      });
    }
  };

  const handleActiveState = (status) => {
    if (status === "available") {
      setIsActive(true);
      document.getElementById("all-fish").classList.remove("hidden");
    } else {
      setIsActive(false);
      document.getElementById("all-fish").classList.add("hidden");
    }
  };

  return (
    <>
      <Header price={price} newfish={newfish}></Header>
      <Banner></Banner>
      <div className="text-center hidden" id="spinner-control">
      <span className="loading w-20 loading-spinner"></span>
      </div>
      <FishContainer
        handleDelete={handleDelete}
        handleAddToCart={handleAddToCart}
        handleActiveState={handleActiveState}
        isActive={isActive}
        newfish={newfish}
        setNewFish={setNewFish}
        setPrice={setPrice}
      ></FishContainer>
      <Footer></Footer>
    </>
  );
}





export default App;
