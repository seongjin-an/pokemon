import axios, {AxiosResponse} from "axios";
import {useQueries, UseQueryResult} from "react-query";

import {Ability, AbilityResponse} from "../types";

type ReturnType = AxiosResponse<AbilityResponse>;

const useAbilities = (abilities: Ability[]): UseQueryResult<ReturnType, Error>[] => {
    const queries = abilities.map(({ability}, idx) => ({
        queryKey: ['ability', idx],
        queryFn: () => axios.get(ability.url)
    }))
    return useQueries(queries) as UseQueryResult<AxiosResponse<AbilityResponse>, Error>[]
}

export default useAbilities;