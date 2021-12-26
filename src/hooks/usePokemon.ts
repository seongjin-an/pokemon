import axios, {AxiosResponse} from "axios";
import {useQuery, UseQueryResult} from "react-query";

import { PokemonResponse } from '../types'

const pokemonApi = (id?: string) =>
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ''}`, { params: { limit: 151}});

const usePokemon = <T>(id?: string): UseQueryResult<AxiosResponse<T>, Error> => {
    return useQuery(id ? ['pokemon', id] : 'pokemon', () => pokemonApi(id));
}

export default usePokemon;