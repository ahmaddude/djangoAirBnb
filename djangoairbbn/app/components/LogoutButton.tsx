'use client';

import { useRouter } from "next/navigation";

import {resetAuthCookies} from '../lib/actions'
import MenuLink from "./navbar/MenuLink";

 const LogoutButton: React.FC=()=>{
    const router=useRouter();
    const submitLogout=async()=>{
        resetAuthCookies();
        router.push('/');
    }

    return(
        <MenuLink
        label="log out"
        onClick={submitLogout}
        />
    )
}

export default LogoutButton;