import axios, {AxiosResponse} from "axios";
import {useQueries, useQuery, UseQueryResult} from "react-query";

import { PokemonResponse } from '../types'

const pokemonApi = (id?: string) =>
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ''}`, { params: { limit: 151}});

const usePokemon = <T>(id?: string): UseQueryResult<AxiosResponse<T>, Error> => {
    return useQuery(id ? ['pokemon', id] : 'pokemon', () => pokemonApi(id));
}

export const usePokemonQueries = (names: string[]): UseQueryResult<AxiosResponse<PokemonResponse>, Error>[] => {
    const queries = names.map((name, idx) => ({
        queryKey: ['evolution', `${name}_${idx}`],
        queryFn: () => pokemonApi(name)
    }))
    return useQueries(queries) as UseQueryResult<AxiosResponse<PokemonResponse>, Error>[]
}

export default usePokemon;