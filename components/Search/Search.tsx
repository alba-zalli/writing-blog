/** Watched this tutorial to help create the search bar https://www.youtube.com/watch?v=0e1Z7-jVTyM&t=162s */
"use client"
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from "next/navigation";


export type SearchProps = {
    onSearch: (value: string) => void
}

const Search = (props: SearchProps) => {
    const {onSearch} = props
    const [value, setValue] = useState('Search blog...');
    const router = useRouter();

    const searchHandler = (event: ChangeEvent <HTMLInputElement>) => {
            const {target} = event;
            setValue(target.value);
            console.log(value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(value);
            handleSearch();
            console.log(value);
        }
    }

    const handleSearch = () => {
        if (!value.trim()) return;
            router.push(`/?search=${encodeURIComponent(value)}`);
    }

    return (
        <div className = "relative w-full text-gray-600">
            <input
                type = {'search'}
                name = {'search'}
                placeholder={value}
                className ="text-base bg-white m-px h-10 px-5 pr-10 w-full content-end rounded-full text-sm focus:outline-none"
                onChange = {searchHandler}
                onKeyDown={handleKeyDown}
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8">
                    </circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
            </button>
        </div>
    )
}

export default Search