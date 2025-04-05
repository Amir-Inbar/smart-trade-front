import {useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
    useCreateDailyTradeEventsMutation,
    useDeleteDailyTradeEventsMutation, useSearchDailyTradeEventsMutation, useUpdateDailyTradeEventsMutation,
} from "@/store/api/dailyTradeEventsApi";
import {DailyTradeEventsCreateSchema, DailyTradeEventsSchema, DailyTradeEventType} from "@/schemas/types";
import useDailyTradeEventsStore from "@/store/actions/dailyTradeEvents";
import {convertToIsraelTime} from "@/utils/date.util";
import {DailyTradeEventsState} from "@/store/@types/dailyTradeEvents";
import {CreateCalendarEventsModal} from "@/components/CreateCalendarEventsModal/CreateCalendarEventsModal";

const localizer = momentLocalizer(moment);

export default function FullCalendar() {
    const [createEvent, {isLoading: isCreating}] = useCreateDailyTradeEventsMutation();
    const [deleteEvent, {isLoading: isDeleting}] = useDeleteDailyTradeEventsMutation();
    const [updateEvent, {isLoading: isUpdating}] = useUpdateDailyTradeEventsMutation();
    const [searchEvents] = useSearchDailyTradeEventsMutation();
    const events = useDailyTradeEventsStore((state) => state.dailyTradeEvents);
    const setEvents = useDailyTradeEventsStore((state: DailyTradeEventsState) => state.setDailyTradeEvents);

    const [modalOpened, setModalOpened] = useState(false);
    const [newEvent, setNewEvent] = useState<DailyTradeEventsCreateSchema | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<DailyTradeEventsSchema | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const refetchEvents = async () => {
        try {
            const events = await searchEvents({}).unwrap();
            const convertedEvents = events.map(event => ({
                ...event,
                start_date: String(convertToIsraelTime(event.start_date)),
                end_date: String(convertToIsraelTime(event.end_date)),
            }));
            setEvents(convertedEvents);
        } catch (error) {
            console.error("Failed to refetch events", error);
        }
    };

    const formatDateTimeLocal = (date: Date) => {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);
    };

    const handleSelectSlot = ({start, end}: { start: Date; end: Date }) => {
        setIsEditing(false);
        setNewEvent({
            title: "",
            start_date: formatDateTimeLocal(start),
            end_date: formatDateTimeLocal(end),
            type: "daily_trade_limit",
            value: "",
        });

        setModalOpened(true);
    };


    const handleSelectEvent = (event: DailyTradeEventsSchema) => {
        const formattedEvent: DailyTradeEventsCreateSchema = {
            title: event.title,
            start_date: formatDateTimeLocal(new Date(event.start_date)),
            end_date: formatDateTimeLocal(new Date(event.end_date)),
            type: event.type,
            value: event.value ?? "",
        };
        console.log(event)
        setNewEvent(formattedEvent);
        setSelectedEvent(event);
        setIsEditing(true);
        setModalOpened(true);
    };


    const handleSubmit = async () => {
        if (!newEvent) return;

        const {start_date, end_date, type, value, title} = newEvent;

        if (!start_date || !end_date) {
            console.error("Start and end date are required");
            return;
        }

        try {
            if (isEditing && selectedEvent) {
                await updateEvent({
                    id: selectedEvent.id,
                    title: title ?? "No Title",
                    start_date: new Date(start_date).toISOString(),
                    end_date: new Date(end_date).toISOString(),
                    type: type ?? DailyTradeEventType.DAILY_TRADE_LIMIT,
                    value,
                }).unwrap();
            } else {
                await createEvent({
                    title: title ?? "No Title",
                    start_date: new Date(start_date).toISOString(),
                    end_date: new Date(end_date).toISOString(),
                    type,
                    value,
                }).unwrap();
            }

            setModalOpened(false);
            setIsEditing(false);
            setNewEvent(null);
            setSelectedEvent(null);
            refetchEvents();
        } catch (error) {
            console.error("Error saving event", error);
        }
    };


    const handleCloseModal = () => {
        setModalOpened(false);
        setNewEvent(null);
        setIsEditing(false);
        setSelectedEvent(null);
    };

    const handleDeleteEvent = async () => {
        if (selectedEvent) {
            try {
                await deleteEvent(selectedEvent.id).unwrap();
                setModalOpened(false);
                setSelectedEvent(null);
                refetchEvents();
            } catch (error) {
                console.error("Error deleting event", error);
            }
        }
    }


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">📅 Big Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events.map((event) => ({
                    ...event,
                    start: new Date(event.start_date),
                    end: new Date(event.end_date),
                }))}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                style={{
                    height: 500,
                }}
            />
            {newEvent &&
                <CreateCalendarEventsModal isEditing={isEditing} isCreating={isCreating} newEvent={newEvent}
                                           modalOpened={modalOpened}
                                           setNewEvent={setNewEvent}
                                           setModalOpened={setModalOpened}
                                           handleCloseModal={handleCloseModal}
                                           handleDelete={handleDeleteEvent}
                                           handleSubmit={handleSubmit}/>}
        </div>
    );
}
