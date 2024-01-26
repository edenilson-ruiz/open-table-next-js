"use client"

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react';

export default function SearchBar() {

    const router = useRouter();

    const [location, setLocation] = useState("");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (location === "") return;
        router.push(`/search?city=${location}`)
        setLocation("");
    }

    return (
        <div className="text-left text-lg py-3 m-auto flex justify-center">
            <form onSubmit={onSubmit}>
                <input
                    className="rounded  mr-3 p-2 w-[450px]"
                    type="text"
                    placeholder="State, city or town"
                    value={location}
                    name='location'
                    onChange={(e) => setLocation(e.target.value.toLowerCase())}
                />
                <button className="rounded bg-red-600 px-9 py-2 text-white" type="submit">Let's go</button>
            </form>
        </div>
    );
}