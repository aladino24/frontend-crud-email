import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventFormModal from "./FormDialog";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Config from "../config";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  email?: string;
  date?: string;
  description?: string;
  subject?: string; // Added subject property
}

interface SelectedSlot {
  start: Date;
  end: Date;
}

const ReactBigCalendar: React.FC = () => {
  const [eventsData, setEventsData] = useState<CalendarEvent[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      try {
        const response = await axios.post(`${Config.api.server1}/api/get-email`, {
          email
        }, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.data) {
          const formattedEvents: CalendarEvent[] = response.data.map((event: any) => ({
            id: event._id,
            title: event.subject,
            start: new Date(event.date),
            end: new Date(event.date)
          }));

          setEventsData(formattedEvents);
        } else {
          console.error("emails data tidak tersedia");
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          navigate("/", { replace: true });
        } else {
          console.error("Error fetching events:", err);
        }

      }
    };

    fetchEvents();
  }, [navigate]);

  const handleSelect = (slotInfo: SelectedSlot) => {
    setSelectedSlot(slotInfo);
  };

  const handleEventAdded = (formValues: { newEmail: CalendarEvent }) => {
    const { subject, email, date, description } = formValues.newEmail;

    const title = subject || "Untitled Event";

    const newEvent: CalendarEvent = {
      id: eventsData.length,
      title,
      start: selectedSlot!.start,
      end: selectedSlot!.end,
      email,
      date,
      description
    };

    setEventsData((prevEvents) => [
      ...prevEvents,
      newEvent
    ]);

    setSelectedSlot(null);
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
      {selectedSlot && (
        <EventFormModal start={selectedSlot.start} onEventAdded={handleEventAdded} />
      )}
    </div>
  );
};

export default ReactBigCalendar;
