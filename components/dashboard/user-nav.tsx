import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ModeToggle } from "@/components/theme-toggle"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"
import { LogoutButton } from "../session/logout-button"

export async function UserNav() {
    const session = await getServerSession(authOptions)

    const userName = session?.user?.name ?? 'No hay nombre'
    const avatarUrl = session?.user?.image ?? 'No image'
    const userEmail = session?.user?.email ?? 'No email'
    const userRoles = session?.user?.roles

    //TODO: Rol usuario

    return (

        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={avatarUrl} alt={`imagen del usuario ${userName}`} />
                            <AvatarFallback>{userName.split(" ").map(value => value[0]).join("")}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none"> {userName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {userEmail}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {userRoles?.join(",")}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href={'/perfil'}>
                                Perfil
                            </Link>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>New Team</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <LogoutButton isSession={session} ></LogoutButton>
                </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
        </>
    )
}