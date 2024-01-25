import React, { useState } from "react";

export const Calendario = () => {
  const DAYS = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];
  const MOUNTHS = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let date = new Date();
  let day = date.getDate();
  let [mounth, setMounth] = useState(date.getMonth());
  let [year, setYear] = useState(date.getFullYear());

  function isLeap() {
    return (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0;
  }

  function startDay() {
    let startDay = new Date(year, mounth, 1);
    return startDay.getDay() - 1 === -1 ? 6 : startDay.getDay() - 1;
  }

  function setNewDate() {
    date.setFullYear(year, mounth, day);
  }

  function getTotalDays(mounth) {
    if (
      mounth === 0 ||
      mounth === 2 ||
      mounth === 4 ||
      mounth === 6 ||
      mounth === 7 ||
      mounth === 9 ||
      mounth === 11
    )
      return 31;
    else if (mounth === 3 || mounth === 5 || mounth === 8 || mounth === 10)
      return 30;
    else return isLeap() ? 29 : 28;
  }

  let calendar = Array(35)
    .fill(null)
    .map((content, index) => {
      if (index < startDay() || index >= startDay() + getTotalDays(mounth))
        return null;
      let daycode = new Date(year, mounth, index - startDay() + 1).getDay() - 1;
      return {
        day: daycode < 0 ? DAYS[6] : DAYS[daycode],
        number: index - startDay() + 1,
        code: index - startDay() + 1 + "-" + mounth + "-" + year,
        events: [],
      };
    });

  return (
    <div className="calendar mt-4">
      <div className="calendar-head">
        <div
          onClick={() => {
            if (mounth !== 0) setMounth(--mounth);
            else {
              setMounth(11);
              setYear(--year);
            }
            setNewDate();
          }}
          className="calendar-prev"
          style={{
            transform: "rotate(180deg)",
            fontSize: 60,
          }}
        >
          {" "}
          &#10143;
        </div>
        <div>
          <div className="calendar-mounth"> {MOUNTHS[mounth]}</div>
          <div className="calendar-year"> {year}</div>
        </div>
        <div
          className="calendar-next"
          style={{
            fontSize: 60,
          }}
          onClick={() => {
            if (mounth !== 11) setMounth(++mounth);
            else {
              setMounth(0);
              setYear(++year);
            }
            setNewDate();
          }}
        >
          {" "}
          &#10143;
        </div>
      </div>

      <div className="calendar-content mt-4">
        {calendar.map((content, index) => {
          let active =
            content !== null &&
            content.code ===
              date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
          return (
            <div key={index} className={active ? "square today" : "square"}>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: active ? "#2bc74f" : "GrayText",
                }}
                className="day_nom"
              >
                {content === null ? content : content.day}
              </p>
              <p
                style={{
                  marginTop: "-0.3em",
                  fontSize: 50,
                }}
                className="day_num"
              >
                {content === null ? content : content.number}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
