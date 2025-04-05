import {useState} from "react";
import {Modal, TextInput, Button, Group, Alert} from "@mantine/core";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
    useCreateDailyTradeEventsMutation,
    useDeleteDailyTradeEventsMutation, useSearchDailyTradeEventsMutation,
} from "@/store/api/dailyTradeEventsApi";
import {DailyTradeEventsSchema} from "@/schemas/types";
import useDailyTradeEventsStore from "@/store/actions/dailyTradeEvents";
import {convertToIsraelTime} from "@/utils/date.util";
import {DailyTradeEventsState} from "@/store/@types/dailyTradeEvents";

const localizer = momentLocalizer(moment);

export default function FullCalendar() {
    const [createEvent, {isLoading: isCreating}] = useCreateDailyTradeEventsMutation();
    const [deleteEvent, {isLoading: isDeleting}] = useDeleteDailyTradeEventsMutation();
    const [searchEvents] = useSearchDailyTradeEventsMutation();
    const events = useDailyTradeEventsStore((state) => state.dailyTradeEvents);
    const setEvents = useDailyTradeEventsStore((state: DailyTradeEventsState) => state.setDailyTradeEvents);

    const [modalOpened, setModalOpened] = useState(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});
    const [eventToDelete, setEventToDelete] = useState<DailyTradeEventsSchema | null>(null);

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

    const handleSelectSlot = ({start, end}: { start: Date; end: Date }) => {
        const formatDateTimeLocal = (date: Date) => {
            return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                .toISOString()
                .slice(0, 16);
        };

        setNewEvent({
            title: "",
            start: formatDateTimeLocal(start),
            end: formatDateTimeLocal(end),
        });

        setModalOpened(true);
    };


    const handleSelectEvent = (event: DailyTradeEventsSchema) => {
        setEventToDelete(event);
        setDeleteModalOpened(true);
    };

    const handleSubmit = async () => {
        if (newEvent.title && newEvent.start && newEvent.end) {
            try {
                await createEvent({
                    title: newEvent.title,
                    start_date: new Date(newEvent.start).toISOString(),
                    end_date: new Date(newEvent.end).toISOString(),
                }).unwrap();
                setModalOpened(false);
                refetchEvents();
            } catch (error) {
                console.error("Error creating event", error);
            }
        }
    };


    const handleDeleteEvent = async () => {
        if (eventToDelete) {
            try {
                await deleteEvent(eventToDelete.id).unwrap();
                setDeleteModalOpened(false);
                setEventToDelete(null);
                refetchEvents();
            } catch (error) {
                console.error("Error deleting event", error);
            }
        }
    };
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
                style={{height: 500}}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
            />

            <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Create Event">
                <TextInput
                    label="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Enter event title"
                />
                <Group position="left" mt="md">
                    <TextInput
                        label="Start Time"
                        value={newEvent.start}
                        onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                        type="datetime-local"
                    />
                </Group>
                <Group position="left" mt="md">
                    <TextInput
                        label="End Time"
                        value={newEvent.end}
                        onChange={(e) => setNewEvent({...newEvent, end: e.target.value})}
                        type="datetime-local"
                    />
                </Group>
                <Group position="right" mt="md">
                    <Button variant="outline" onClick={() => setModalOpened(false)} color="gray">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} loading={isCreating}>
                        Create Event
                    </Button>
                </Group>
            </Modal>

            <Modal opened={deleteModalOpened} onClose={() => setDeleteModalOpened(false)} title="Delete Event">
                <Alert color="red">Are you sure you want to delete the event: "{eventToDelete?.title}"?</Alert>
                <Group position="right" mt="md">
                    <Button variant="outline" onClick={() => setDeleteModalOpened(false)} color="gray">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteEvent} color="red" loading={isDeleting}>
                        Delete Event
                    </Button>
                </Group>
            </Modal>
        </div>
    );
}
