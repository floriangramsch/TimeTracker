"use client";

import { Box } from "@mui/material";
import Label from "./components/Label";
import Connection from "./components/Connection";
import React, { useEffect, useState } from "react";
import ControleButton from "./components/ControleButton";
import { Delete, Loop } from "@mui/icons-material";
import { useAddTime, useResetTimes, useTimes } from "./composables/useTimes";

export default function Content() {
  const { data: times } = useTimes();
  const addTimeMutation = useAddTime();
  const resetTimeMutation = useResetTimes();

  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<string>("");
  const [trackMode, setTrackMode] = useState<"times" | "count">("count");

  const pad = (num: number) => (num < 10 ? "0" + num : num);

  const getTime = () => {
    const date = new Date();
    return (
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      "h"
    );
  };

  const timeToString = (time: Date) => {
    return (
      pad(time.getHours()) +
      ":" +
      pad(time.getMinutes()) +
      ":" +
      pad(time.getSeconds()) +
      "h"
    );
  };

  const convertTime = (date: string, value: number) => {
    const [hours, minutes, seconds] = date.split(":");
    const newDate = new Date(
      new Date().setHours(
        Number(hours),
        Number(minutes),
        Number(seconds.slice(0, seconds.length - 1)),
        0
      )
    );
    newDate.setMinutes(newDate.getMinutes() + value);
    return newDate;
  };

  const handlePlayClick = (value?: number) => {
    if (trackMode === "times") {
      addTimeMutation.mutate({
        type: isBreak ? "Break" : "Work",
        time: getTime(),
      });
      setIsBreak((prev) => !prev);
    } else if (trackMode === "count" && value && times) {
      const lastTime =
        times?.length === 0
          ? new Date(new Date().setHours(0, value, 0, 0))
          : convertTime(times[times.length - 1].time, value);
      addTimeMutation.mutate({ type: "Work", time: timeToString(lastTime) });

      setIsBreak((prev) => !prev);
    }
  };

  const handleEndClick = () => {
    addTimeMutation.mutate({
      type: isBreak ? "Break" : "Work",
      time: getTime(),
      end: true,
    });
    setIsFinished(true);
  };

  useEffect(() => {
    setInitialTime(getTime());
  }, []);

  const switchmode = () => {
    if (trackMode === "count") setTrackMode("times");
    else if (trackMode === "times") setTrackMode("count");
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        flexGrow: "1",
        overflowY: "auto",
        my: 2,
        pb: 10,
      }}
    >
      <Label>
        <div onClick={switchmode} className="absolute left-3 cursor-pointer">
          <Loop />
        </div>
        {trackMode === "times" ? initialTime : "00:00:00h"}
        <div
          onClick={() => resetTimeMutation.mutate()}
          className="absolute right-3 cursor-pointer"
        >
          <Delete />
        </div>
      </Label>
      {times &&
        times.map((time, index) => {
          return (
            <React.Fragment key={index}>
              <Connection>{time.type}</Connection>
              {time.end ? (
                <Label>{time.time}</Label>
              ) : (
                <Label secondary>{time.time}</Label>
              )}
            </React.Fragment>
          );
        })}
      <Box
        sx={{
          position: "absolute",
          bottom: 100,
          display: "flex",
        }}
      >
        {!isFinished &&
          (trackMode === "times" ? (
            !isBreak ? (
              <ControleButton onClick={handlePlayClick} type="Pause" />
            ) : (
              <ControleButton onClick={handlePlayClick} type="Play" />
            )
          ) : (
            <>
              <ControleButton
                onClick={() => handlePlayClick(5)}
                type="Time"
                value={5}
              />
              <ControleButton
                onClick={() => handlePlayClick(10)}
                type="Time"
                value={10}
              />
              <ControleButton
                onClick={() => handlePlayClick(30)}
                type="Time"
                value={30}
              />
            </>
          ))}
        {!isFinished && trackMode === "times" && (
          <ControleButton onClick={handleEndClick} type="Stop" />
        )}
      </Box>
    </Box>
  );
}
