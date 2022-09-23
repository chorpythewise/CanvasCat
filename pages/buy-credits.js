import { React, useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Toggle from "react-toggle";
import Script from "next/script";
// import dynamic from "next/dynamic";
// import { UserContext } from "../../../lib/context";
import { UserContext } from "../firebase/context";

// import { auth } from "../../../lib/firebase";

import toast from "react-hot-toast";
import PaddleLoader from "../components/PaddleLoader";
import axios from "axios";
// import { doc, getFirestore, updateDoc } from "firebase/firestore";

function BuyCredits(props) {
  // const [annual, setAnnual] = useState(true);
  // const [successPopUp, setSuccessPopUp] = useState(false);
  // const [plan, setPlan] = useState("Basic");
  // const [credits, setCredits] = useState(100);
  // const [cancelSubUrl, setCancelSubUrl] = useState(null);

  const { user, aiCredits } = useContext(UserContext);

  useEffect(() => {
    const Paddle = window.Paddle;
    // console.log(Paddle)
    // eslint-disable-next-line
    if (typeof Paddle !== "undefined") {
      // console.log("IT RAN, NO EXCUSES");
      let vendorNum = Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID);
      // console.log(vendorNum);
      // eslint-disable-next-line
      Paddle.Setup({
        vendor: vendorNum,
      });
      console.log("Loaded Paddle");
    }
  }, []);

  // const updateIdea = async (
  //   amount,
  //   planType,
  //   cancelUrl,
  //   updateUrl,
  //   paddleUserId,
  //   nextBillDate,
  //   subscriptionStartDate,
  //   subscriptionID
  // ) => {
  //   let uid;

  //   if (user?.uid) {
  //     uid = user?.uid;
  //   } else if (userUIDRedux) {
  //     uid = userUIDRedux;
  //   } else if (auth.currentUser?.uid) {
  //     uid = auth.currentUser?.uid;
  //   } else {
  //     uid = "default";
  //     // console.log("no uid available :(");
  //   }
  //   const ref = doc(getFirestore(), "users", uid);

  //   let data = {
  //     credits: amount,
  //     plan: planType,
  //     cancelUrl: cancelUrl,
  //     updateUrl: null,
  //     paddleUserID: null,
  //     nextBillDate: null,
  //     subscriptionStartDate: null,
  //     subscriptionID: null,
  //   };
  //   await updateDoc(ref, data)
  //     .then(() => {
  //       toast.success(`New AI credit balance: ${amount}`);
  //     })
  //     .catch((error) => {
  //       toast.error("Error occured, please contact support");
  //       console.log("Update failed!" + error);
  //     });
  // };

  function checkoutComplete(data) {
    // console.log(data);
    // alert("Thanks for your purchase.");

    let saveToDB = async () => {
      let creditNum = data.product.id === "776865" ? 100 : 20;

      // console.log(creditNum);
      axios({
        method: "POST",
        url: "/api/paddleWebhooks",
        data: {
          credits: aiCredits + creditNum,
          user: data.checkout.passthrough,
          client: true,
        },
        // headers: headers,
      });
    };
    saveToDB()
      .then((response) => {
        // console.log(response);
        toast.success("Purchase Successful!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Purchase Failed :(");
      });
    // let updateUrl;
    // let cancelUrl;
    // let paddleUserId;
    // let nextBillDate;
    // let subscriptionStartDate;
    // let subscriptionID;

    // if (
    //   data.product.name === "Hobbyist" ||
    //   data.product.name === "Hobbyist Monthly"
    // ) {
    //   setCredits(0);
    //   setPlan("Hobbyist");
    //   // updateIdea(0, "Hobbyist");
    //   setSuccessPopUp(true);
    // } else if (
    //   data.product.name === "Innovator" ||
    //   data.product.name === "Innovator Monthly"
    // ) {
    //   setCredits(250);
    //   setPlan("Innovator");
    //   // updateIdea(250, "Innovator");
    //   setSuccessPopUp(true);
    // } else if (
    //   data.product.name === "Pro" ||
    //   data.product.name === "Pro Monthly"
    // ) {
    //   setCredits(1000);
    //   setPlan("Pro");
    //   // updateIdea(1000, "Pro");
    //   setSuccessPopUp(true);
    // } else if (data.product.name === "Beta Test Plan") {
    //   setCredits(50);
    //   setPlan("Beta");
    //   // updateIdea(1000, "Pro");
    //   setSuccessPopUp(true);
    // }
  }

  function checkoutClosed(data) {
    // console.log(data);

    toast.error("Purchase canceled");
  }

  return (
    <div className="overflow-auto ">
      {/* <PaddleLoader /> */}
      {/* <script async src="https://cdn.paddle.com/paddle/paddle.js">
          {console.log("Loaded paddleeeeeeeeeee from script")}
        </script> */}
      <Script
        id="paddle-checkout-js"
        src="https://cdn.paddle.com/paddle/paddle.js"
        // strategy="beforeInteractive"
        onLoad={(e) => {
          // console.log("before load paddle");

          // eslint-disable-next-line
          // Paddle.Environment.set("sandbox");
          // eslint-disable-next-line
          Paddle.Setup({
            vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
          });
          // console.log("Loaded paddle");
        }}
        onError={(e) => {
          console.log("Error loading paddle");
          console.log(e);
        }}
      />
      <div className="mt-4 font-semibold text-center">
        <h1 className="md:text-5xl fre text-t-bd sm:text-2xl">Credit Refill</h1>
        <p>My credits: {aiCredits}</p>
        {/* <p className="p-5">
            {" "}
            <span className="text-lg font-bold text-t-pm">
              Free ebook included with either refill!
            </span>{" "}
            Top 10 Software Business Ideas you can start this week.
          </p> */}
      </div>
      <div>
        <div className="items-center mt-1 fade-effect-quick">
          <div className="flex flex-col items-center">
            {/* <div className="flex items-center w-[16em] justify-center rounded-xl p-2  gap-3  h-10 mt-0 glass-box bg-white/50 dark:bg-slate-600/80">
                <p
                  className={
                    annual
                      ? "text-slate-500 text-sm transition"
                      : "!text-t-bl text-lg transition"
                  }
                >
                  Monthly
                </p>
                <Toggle
                  className=" fade-effect"
                  defaultChecked={annual}
                  icons={false}
                  onChange={() => {
                    setAnnual(!annual);
                  }}
                />
                <p
                  className={
                    !annual
                      ? "text-slate-500 text-sm transition"
                      : "!text-t-bl text-lg transition"
                  }
                >
                  Annual
                </p>
              </div> */}

            <div className="flex-wrap items-center justify-center w-full my-0 sm:gap-3 md:gap-8 sm:flex md:flex-row sm:flex-col">
              {/* 20 CREDITS */}
              <div
                className={
                  "w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg min-w-[15em]     sm:w-1/2 md:w-1/2 lg:w-1/4 group  flex-col flex justify-between  bg-white/60 md:hover:bg-clear-bl2 dark:bg-slate-600/80 shadow-lg"
                }
              >
                <div className="relative p-4">
                  <div className="flex justify-center">
                    <span className="inline-flex px-4 py-1 mb-0 text-4xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text fre whitespace-nowrap ">
                      20 Credits
                    </span>
                  </div>
                  <div className="flex justify-center mt-4 text-3xl font-extrabold leading-none transition duration-1000 text-blues-200 group-hover:text-white nun">
                    $4.99
                    {/* <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200 dark:text-white fre ">
                        /month
                      </span> */}
                  </div>
                  {/* <p className="mt-4 text-md">Plan includes :</p> */}
                  {/* <ul className="w-full mt-2 mb-6 text-sm">
                    <li className="flex items-center mb-3 dark:text-white nun ">
                      <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                      $0.25 per credit
                    </li>
                  </ul> */}
                </div>

                <button
                  className={
                    "w-full px-3 py-2  transition-colors duration-700 transform rounded-lg shadow text-md   text-white hover:bg-white hover:text-t-bl bg-t-bl"
                  }
                  onClick={() => {
                    //   if (paidPlan !== "Hobbyist") {
                    // eslint-disable-next-line
                    if (Paddle.Audience.AllowPopup() === true) {
                      // eslint-disable-next-line
                      Paddle.Checkout.open({
                        product: "776865",
                        // product: "769844",
                        email: user.email || null,
                        passthrough: `${user?.uid}`,
                        successCallback: checkoutComplete,
                        closeCallback: checkoutClosed,
                      });
                    } else {
                      toast.error("Please allow popups to proceed");
                    }
                    //   } else {
                    //     toast.error("You are already on this plan");
                    //   }
                  }}
                >
                  Buy
                </button>
              </div>

              {/* 100 CREDITS */}
              <div
                className={
                  "w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg min-w-[15em]     sm:w-1/2 md:w-1/2 lg:w-1/4 group  flex-col flex justify-between  bg-white/60 md:hover:bg-clear-bl2 dark:bg-slate-600/80 shadow-lg"
                }
              >
                <div className="relative p-4">
                  <div className="flex justify-center">
                    <span className="inline-flex px-4 py-1 mb-0 text-4xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text fre whitespace-nowrap">
                      100 Credits
                    </span>
                  </div>
                  <div className="flex justify-center mt-4 text-3xl font-extrabold leading-none transition duration-1000 text-blues-200 group-hover:text-white nun">
                    $19.99
                    {/* <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200 dark:text-white fre ">
                        /month
                      </span> */}
                  </div>
                  {/* <p className="mt-4 text-md">Plan includes :</p> */}
                  {/* <ul className="w-full mt-2 mb-6 text-sm">
                    <li className="flex items-center mb-3 dark:text-white nun ">
                      <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                      Free ebook included! Top 10 Software Business Ideas you
                      can start this week.
                    </li>
                  </ul> */}

                  <div className="flex"></div>
                </div>

                <button
                  className={
                    "w-full px-3 py-2  transition-colors duration-700 transform rounded-lg shadow text-md   text-white hover:bg-white hover:text-t-bl bg-t-bl"
                  }
                  onClick={() => {
                    //   if (paidPlan !== "Hobbyist") {
                    // eslint-disable-next-line
                    if (Paddle.Audience.AllowPopup() === true) {
                      // eslint-disable-next-line
                      Paddle.Checkout.open({
                        product: "776868",
                        // product: "769844",
                        email: user.email || null,
                        passthrough: `${user?.uid}`,
                        successCallback: checkoutComplete,
                        closeCallback: checkoutClosed,
                      });
                    } else {
                      toast.error("Please allow popups to proceed");
                    }
                    //   } else {
                    //     toast.error("You are already on this plan");
                    //   }
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyCredits;