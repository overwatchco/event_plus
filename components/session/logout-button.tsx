'use client'

import { Session } from "next-auth"
import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"
import { signIn, signOut } from "next-auth/react"


interface Props {
    isSession?: Session | null
}

export const LogoutButton = ({ isSession }: Props) => {


    if (isSession) {
        return (
            <DropdownMenuItem onClick={() => signIn()}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        )

    }

    return (
        <DropdownMenuItem onClick={() => signOut()}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
    )
}

