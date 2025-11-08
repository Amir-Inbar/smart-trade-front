import {useEffect} from 'react';
import {
    Button as MantineButton,
    Modal,
    NumberInput,
    Group,
    Stack,
    Divider,
    Text,
} from '@mantine/core';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {UserTPLevelDefaultSchema} from '@/schemas/types';

type FormValues = { take_profit_levels_defaults: UserTPLevelDefaultSchema[] };

type Props = {
    open: boolean;
    account: string | null;
    userId: string | null;
    initialLevels: UserTPLevelDefaultSchema[];
    isSaving?: boolean;
    onClose: () => void;
    onSubmit: (levels: UserTPLevelDefaultSchema[]) => Promise<void> | void;
};

const UsersSettings = ({
                           open,
                           account,
                           userId,
                           initialLevels,
                           isSaving,
                           onClose,
                           onSubmit,
                       }: Props) => {
    const {control, handleSubmit, reset, getValues, formState} = useForm<FormValues>({
        defaultValues: {take_profit_levels_defaults: []},
        mode: 'onChange',
    });

    const {fields} = useFieldArray({
        control,
        name: 'take_profit_levels_defaults',
    });

    const normalize = (
        rows: UserTPLevelDefaultSchema[],
        acc: string,
        uid: string
    ): UserTPLevelDefaultSchema[] => {
        const sorted = [...rows].sort((a, b) => (a.level_index ?? 0) - (b.level_index ?? 0));
        return sorted.map((row, i) => ({
            id: row.id ?? crypto.randomUUID(),
            user_id: row.user_id || uid,
            account: row.account || acc,
            level_index: i + 1,
            quantity: row.quantity ?? 0,
        }));
    };

    useEffect(() => {
        if (!account || !userId) return;
        const defaults =
            initialLevels.length > 0
                ? normalize(initialLevels, account, userId)
                : [
                    {
                        id: crypto.randomUUID(),
                        user_id: userId,
                        account,
                        level_index: 1,
                        quantity: 0,
                    },
                ];
        reset({take_profit_levels_defaults: defaults});
    }, [account, userId, initialLevels, reset]);

    const submit = (values: FormValues) => onSubmit(values.take_profit_levels_defaults);

    const handleAppend = () => {
        if (!account || !userId) return;
        const current = getValues('take_profit_levels_defaults') ?? [];
        const nextIndex = current.length + 1;
        const next = [
            ...current,
            {
                id: crypto.randomUUID(),
                user_id: userId,
                account,
                level_index: nextIndex,
                quantity: 0,
            },
        ];
        reset({take_profit_levels_defaults: next});
    };

    const handleRemove = (idx: number) => {
        const current = getValues('take_profit_levels_defaults') ?? [];
        const filtered = current.filter((_, i) => i !== idx);
        const renumbered = filtered.map((row, i) => ({...row, level_index: i + 1}));
        reset({take_profit_levels_defaults: renumbered});
    };

    return (
        <Modal opened={open} onClose={onClose} title="Edit Take-Profit Levels" centered>
            <form onSubmit={handleSubmit(submit)}>
                <Stack>
                    <Text size="sm" c="dimmed">
                        {account
                            ? `Editing default take-profit levels for account: ${account}`
                            : 'No account selected.'}
                    </Text>
                    <div className="mb-2">
                        {fields.map((field, index) => (
                            <Stack key={field.id} className="mb-3">
                                <Group align="end">
                                    <Controller
                                        control={control}
                                        name={`take_profit_levels_defaults.${index}.level_index`}
                                        rules={{required: true, min: 1}}
                                        render={({field: rhfField}) => (
                                            <NumberInput
                                                label="level_index"
                                                placeholder="1"
                                                min={1}
                                                {...rhfField}
                                                value={rhfField.value ?? 1}
                                                readOnly
                                                w={140}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`take_profit_levels_defaults.${index}.quantity`}
                                        rules={{required: true, min: 0}}
                                        render={({field: rhfField}) => (
                                            <NumberInput
                                                label="quantity"
                                                placeholder="0"
                                                min={0}
                                                {...rhfField}
                                                value={rhfField.value ?? 0}
                                                onChange={(val) => rhfField.onChange(Number(val ?? 0))}
                                                w={160}
                                            />
                                        )}
                                    />
                                    <MantineButton
                                        variant="outline"
                                        color="red"
                                        onClick={() => handleRemove(index)}
                                        type="button"
                                    >
                                        Remove
                                    </MantineButton>
                                </Group>
                                {formState.errors.take_profit_levels_defaults?.[index]?.level_index && (
                                    <Text size="xs" c="red">
                                        level_index must be ≥ 1
                                    </Text>
                                )}
                                {formState.errors.take_profit_levels_defaults?.[index]?.quantity && (
                                    <Text size="xs" c="red">
                                        quantity must be ≥ 0
                                    </Text>
                                )}
                                <Divider/>
                            </Stack>
                        ))}
                        <MantineButton variant="outline" type="button" onClick={handleAppend}>
                            Add Take Profit Level
                        </MantineButton>
                    </div>
                    <Group mt="md">
                        <MantineButton variant="outline" onClick={onClose} type="button">
                            Cancel
                        </MantineButton>
                        <MantineButton color="blue" type="submit" loading={isSaving}>
                            Save
                        </MantineButton>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};

export default UsersSettings;
