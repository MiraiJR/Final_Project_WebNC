import { RefObject } from "react";
import moment from "moment";

export const Helper = {
  isCodeResp: (data: any): data is CodeResp => {
    return typeof data === "object" && "code" in data;
  },
  getFullNameIcon: (fullname: string) => {
    const words = fullname.split(" ");
    const lastName = words[words.length - 1];
    const firstLetter = lastName.charAt(0);
    return firstLetter;
  },
  handleOutSideClick: (ref: RefObject<HTMLElement>, cb: Function): Function => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        cb(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  },
  capitalizeString: (input: string) => {
    return input
      .split(" ")
      .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
      .join(" ");
  },
  formatDate: (date: Date): string => {
    const momentDate = moment(date);
    return momentDate.format("DD/MM/YYYY HH:mm");
  },
  addDate: (startedDate: Date, duration: number): string => {
    const momentStartedDate = moment(startedDate);
    const endDate = momentStartedDate.add(duration, "days");
    return Helper.formatDate(endDate.toDate());
  },
};
