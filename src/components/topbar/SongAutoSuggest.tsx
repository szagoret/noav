import React, {useState} from "react";
import {alpha, Autocomplete, InputBase, styled} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import {SongType} from "src/types/SongType";
import {useSearchSongByNameQuery} from "src/services/songApiService";
import {debounce} from 'lodash';
import {useNavigate} from "react-router-dom";


const SongAutoSuggest = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleOnInputChange = debounce(setSearchTerm, 300);
    const {data, isLoading} = useSearchSongByNameQuery(searchTerm, {skip: !searchTerm});
    const navigate = useNavigate();

    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%'
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%'
        },
        width: '100%'
    }));

    return (
        <Autocomplete id="search-songs"
                      autoComplete
                      getOptionLabel={(option) => option.title}
                      options={data || []}
                      onChange={(e: any, value: SongType | null) => value && navigate(`/songs/${value.code}`)}
                      isOptionEqualToValue={(option, value) => option.code === value.code}
                      loading={!!isLoading}
                      filterOptions={(x) => x}
                      onInputChange={(event, newInputValue) => handleOnInputChange(newInputValue)}
                      renderOption={(props, option, {inputValue}) => {
                          const matches = match(option.title, inputValue);
                          const parts = parse(option.title, matches);
                          return (
                              <li {...props} key={option.code}>
                                  <div>
                                      {parts.map((part, index) => (
                                          <span key={index}
                                                style={{
                                                    fontWeight: part.highlight ? 700 : 400,
                                                    color: part.highlight ? '#e76f51' : 'inherit'
                                                }}>
                                              {part.text}
                                          </span>
                                      ))}
                                  </div>
                              </li>
                          );
                      }}
                      renderInput={(params) => {
                          return (
                              <Search>
                                  <SearchIconWrapper>
                                      <SearchIcon/>
                                  </SearchIconWrapper>
                                  <StyledInputBase ref={params.InputProps.ref}
                                                   placeholder="Caută…"
                                                   autoFocus
                                                   inputProps={{
                                                       'aria-label': 'search',
                                                       width: '100%', ...params.inputProps,
                                                   }}
                                  />
                              </Search>
                          );
                      }}
        />

    );
};

export default SongAutoSuggest;