import {
    Button,
    Group,
    Modal,
    TextInput,
    Select,
} from "@mantine/core";
import {DailyTradeEventsCreateSchema, DailyTradeEventType} from "@/schemas/types";

interface CreateCalendarEventsModalProps {
    modalOpened: boolean;
    newEvent: DailyTradeEventsCreateSchema;
    isCreating: boolean;
    isEditing: boolean;

    handleSubmit(): void;

    handleDelete(): void;

    setModalOpened(opened: boolean): void;

    handleCloseModal(): void;

    setNewEvent(event: DailyTradeEventsCreateSchema): void;
}

export const CreateCalendarEventsModal = (
    {
        modalOpened,
        setModalOpened,
        newEvent,
        setNewEvent,
        handleSubmit,
        handleDelete,
        isCreating,
        isEditing
    }: CreateCalendarEventsModalProps) => {
    return (
        <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Create Event">
            <TextInput
                label="Event Title"
                value={newEvent.title ?? ""}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Enter event title"
            />
            <Select
                mt="md"
                label="Event Type"
                data={[
                    {value: DailyTradeEventType.DAILY_TRADE_LIMIT, label: "Daily Trade Limit"},
                    {value: DailyTradeEventType.EVENT_TRADE_LIMIT, label: "Event Trade Limit"},
                ]}
                value={newEvent.type ?? DailyTradeEventType.DAILY_TRADE_LIMIT}
                onChange={(value) =>
                    setNewEvent({
                        ...newEvent,
                        type: value as DailyTradeEventType,
                        value: value === DailyTradeEventType.DAILY_TRADE_LIMIT ? newEvent.value : null,
                    })
                }
            />
            {newEvent.type === "daily_trade_limit" && (
                <TextInput
                    mt="md"
                    label="Limit Value"
                    value={newEvent.value ?? ""}
                    onChange={(e) => setNewEvent({...newEvent, value: e.target.value})}
                    placeholder="Enter daily trade limit value"
                />
            )}
            <Group position="left" mt="md">
                <TextInput
                    label="Start Time"
                    value={newEvent.start_date}
                    onChange={(e) => setNewEvent({...newEvent, start_date: e.target.value})}
                    type="datetime-local"
                />
            </Group>
            <Group position="left" mt="md">
                <TextInput
                    label="End Time"
                    value={newEvent.end_date}
                    onChange={(e) => setNewEvent({...newEvent, end_date: e.target.value})}
                    type="datetime-local"
                />
            </Group>
            <Group position="right" mt="md">
                {isEditing && <Button variant="outline" onClick={handleDelete} color="gray">
                    Delete
                </Button>}
                <Button variant="outline" onClick={() => setModalOpened(false)} color="gray">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} loading={isCreating}>
                    {isEditing ? "Update Event" : "Create Event"}
                </Button>
            </Group>
        </Modal>
    );
};
