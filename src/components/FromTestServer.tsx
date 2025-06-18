import React, { useEffect, useState } from 'react'


type Geo = {
    lat: string;
    lng: string;
  };
  
  type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  };
  
  type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  
  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  };

const FromTestServer = () => {

    const [users, setUsers] =  useState<User[]>([])


    async function getDataFromTestServer(): Promise<void> {
        const stored = localStorage.getItem('token');
        if (!stored) {
          console.error('Token not found');
          return;
        }
      
        const parsed = JSON.parse(stored);
        const jwt = parsed.token;
      
        try {
          const resp = await fetch('http://localhost:8000/all-users', {
            headers: {
              'Authorization': `Bearer ${jwt}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (!resp.ok) {
            throw new Error('Unauthorized or fetch failed');
          }
      
          const { data } = await resp.json();
          console.log("@@data", data);
          setUsers(data);
        } catch (err) {
          console.error('Fetch error:', err);
        }
      }
      

    useEffect(()=>{
        getDataFromTestServer()
    }, [])
  return (
    <div>{users.map(user=>{
        return (
            <div>{user?.username}</div>
        )
    })}
        </div>
  )
}

export default FromTestServer