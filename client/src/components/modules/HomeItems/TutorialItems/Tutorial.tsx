import React, { useState, useEffect } from "react";
import { Tabs } from "flowbite-react";
import { HiDocument, HiOutlineUser, HiOutlineUsers } from "react-icons/hi";
import profileImg from "../../../../assets/profile_tutorial.png";
import timelineImg from "../../../../assets/timeline.png";
import feed1 from "../../../../assets/public_feed.png";
import feed2 from "../../../../assets/private_feed.png";
import feed3 from "../../../../assets/draft_feed.png";


const DashboardTheme = {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex ",
      styles: {
        underline: "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
        paddingTop: ""
      },
      tabitem: {
        base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none",
        styles: {
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "text-sky-900 rounded-t-lg border-b-2 border-sky-900 active dark:text-sky-800 dark:border-sky-800",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: {
      base: "",
      styles: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "py-3",
  };

  export const Tutorial = () => {
    return (
      <div className=" p-2 w-full relative top-0">
        <Tabs aria-label="Tabs with underline" theme={DashboardTheme} style="underline">
          <Tabs.Item active title="Timeline" icon={HiDocument}>
            <div className="c-center">
                <section className="">
                    <img src={timelineImg} alt="TImeline Description"/>
                </section>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Feed" icon={HiOutlineUser}>
          <div className="c-center">
                <section className="">
                <img src={feed1} alt="Public description"/>
                <img src={feed2} alt="private description"/>
                <img src={feed3} alt="Draft description"/>
                </section>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Profile" icon={HiOutlineUser}>
          <div className="c-center">
                <section className="">
                    <img src={profileImg} alt="Profile description"/>
                </section>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    );
  };
