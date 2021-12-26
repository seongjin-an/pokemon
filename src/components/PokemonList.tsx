import React from "react";
import styled from "@emotion/styled";
import usePokemon from "../hooks/usePokemon";
import {ListResponse} from "../types";

const Base = styled.div`
    margin-top: 24px;
`;

const ListItem = styled.li`
    position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  box-shadow: 6px 4px 14px 5px rgba(0,0,0,0.21);
  border-radius: 12px;
  & + & {
    margin-top: 18px;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Image = styled.img`
  
`;

const Name = styled.p`
    margin: 0;
  padding: 0 0 0 12px;
  flex: 1 1 100%;
  color: #374151;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: bold;
`;

const Index = styled.p`
  position: absolute;
  margin: 0;
  padding: 0;
  right: 16px;
  font-size: 24px;
  font-weight: bold;
  color: #D1D5DB;
`;

const LoadingWrapper = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 180px);
`;

const Loading = styled.img``;

const getImageUrl = (pokemonIndex: number):string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`
}

const PokemonList: React.FC = () => {
    const {isLoading, isError, data} = usePokemon<ListResponse>()
    const formatNumbering = (index:number): string => {
        return `#${String(index).padStart(3, '0')}`;
    }
    return(
        <Base>
            {
                isLoading || isError ? (
                    <LoadingWrapper>
                        <Loading src="/loading.gif" alt="loading"/>
                    </LoadingWrapper>
                ) : (
                    <List>
                        {
                            data?.data.results.map((pokemon, idx) => {
                                return(
                                    <ListItem key={pokemon.name}>
                                        <Image src={getImageUrl(idx + 1)}/>
                                        <Name>{pokemon.name}</Name>
                                        <Index>{formatNumbering(idx + 1)}</Index>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                )
            }

        </Base>
    )
}
export default PokemonList;