'use client';

import useContractsStore from "@/store/actions/contract";
import {useSearchContractsMutation} from "@/store/api/contractApi";
import {useEffect} from "react";

export const FetchDataInBackground = () => {
    const [searchContracts, {data}] = useSearchContractsMutation();
    const setContracts = useContractsStore((state) => state.setContracts);

    const fetchContracts = async () => {

        const contracts = await searchContracts({}).unwrap();
        setContracts(contracts);
    };

    useEffect(() => {
        if (data) {
            setContracts(data);
        } else {
            fetchContracts();
        }
    }, [data, setContracts]);

    return null;
};
