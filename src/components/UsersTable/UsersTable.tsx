import {useMemo, useState, useCallback, useEffect} from 'react';
import {SmartTable} from '@/components/SmartTable/SmartTable';
import {UserTPLevelDefaultSchema} from '@/schemas/types';
import useUserTakeProfitLevelsStore from '@/store/actions/userTakeProfitLevels';
import {
    useSearchUserTPDefaultsMutation,
    useUpdateUserTPDefaultMutation,
} from '@/store/api/userTakeProfitLevels';
import useUserStore from '@/store/actions/user';
import {MRT_ColumnDef} from 'mantine-react-table';
import {
    getUserTakeProfitLevelsColumns,
    initialUserTakeProfitLevelsConfig,
} from '@/components/UsersTable/UsersTableUtil';
import UsersSettings from '@/components/UsersTable/UsersSettings';

const UsersTable = () => {
    const {users} = useUserStore();

    const [searchTPDefaults, {data: userTPDefaultsData}] = useSearchUserTPDefaultsMutation();
    const [updateTPDefault, {isLoading: isUpdating}] = useUpdateUserTPDefaultMutation();

    const {setItems} = useUserTakeProfitLevelsStore();

    const [editLevelsModalOpen, setEditLevelsModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

    useEffect(() => {
        const getUserTPDefaults = async () => {
            const res = await searchTPDefaults({}).unwrap();
            setItems(res);
        }

        getUserTPDefaults();
    }, [searchTPDefaults, setItems]);

    const onOpenAccountModal = useCallback((account: string) => {
        setSelectedAccount(account);
        setEditLevelsModalOpen(true);
    }, []);

    const handleCloseEditLevelsModal = useCallback(() => {
        setEditLevelsModalOpen(false);
        setSelectedAccount(null);
    }, []);

    const columns: MRT_ColumnDef<UserTPLevelDefaultSchema>[] = useMemo(
        () =>
            getUserTakeProfitLevelsColumns({
                onOpenAccountModal,
            }),
        [onOpenAccountModal]
    );

    const getTotalQuantityForAccount = useCallback(
        (account: string) =>
            (userTPDefaultsData ?? []).reduce<number>((sum, curr) => {
                if (curr.account === account) {
                    const q = curr.quantity ?? 0;
                    return sum + q;
                }
                return sum;
            }, 0),
        [userTPDefaultsData]
    );

    const tableRows: UserTPLevelDefaultSchema[] = useMemo(
        () =>
            (users ?? []).map((u) => {
                const totalQty = getTotalQuantityForAccount(u.email || '');
                return {
                    id: String(u.id ?? u.email),
                    user_id: String(u.id ?? ''),
                    account: u.email || '',
                    level_index: 1,
                    quantity: totalQty,
                };
            }),
        [users, getTotalQuantityForAccount]
    );

    const selectedUserId = useMemo(() => {
        if (!selectedAccount) return null;
        const u = (users ?? []).find((x) => x.email === selectedAccount);
        return u ? String(u.id ?? '') : null;
    }, [selectedAccount, users]);

    const initialLevelsForSelected: UserTPLevelDefaultSchema[] = useMemo(() => {
        if (!selectedAccount) return [];
        return (userTPDefaultsData ?? [])
            .filter((x) => x.account === selectedAccount)
            .sort((a, b) => (a.level_index ?? 0) - (b.level_index ?? 0))
            .map((x) => ({
                id: x.id,
                user_id: x.user_id,
                account: x.account,
                level_index: x.level_index ?? 0,
                quantity: x.quantity ?? 0,
            }));
    }, [selectedAccount, userTPDefaultsData]);

    const handleSubmitLevels = async (levels: UserTPLevelDefaultSchema[]) => {
        await updateTPDefault({userId: String(levels[0].user_id), data: levels}).unwrap();
        const refreshed = await searchTPDefaults({}).unwrap();
        setItems(refreshed);
        setEditLevelsModalOpen(false);
    }

    return (
        <div className="flex flex-col gap-3">
            <SmartTable<UserTPLevelDefaultSchema>
                className="w-full"
                columns={columns}
                data={tableRows}
                config={initialUserTakeProfitLevelsConfig}
            />
            <UsersSettings
                open={editLevelsModalOpen}
                account={selectedAccount}
                userId={selectedUserId}
                initialLevels={initialLevelsForSelected}
                isSaving={isUpdating}
                onClose={handleCloseEditLevelsModal}
                onSubmit={handleSubmitLevels}
            />
        </div>
    );
};

export default UsersTable;
