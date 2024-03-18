"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { HomeIcon } from "lucide-react"
import Link from "next/link"

const links = [
    {
        urlPath: "/empresas",
        title: "Empresas"
    },
    {
        urlPath: "/contratos",
        title: "Contratos"
    },
    {
        urlPath: "/eventos",
        title: "Eventos"
    },
    {
        urlPath: "/evidencias",
        title: "Evidencias"
    },

]



interface Props {
    urlPath: string
    title: string

}


export function ItemsLinks({ urlPath, title }: Props) {
    return (
        <NavigationMenuItem>
            <Link href={urlPath} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {title}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}


export function NavMenu() {
    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href={"/dashboard"} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <HomeIcon height={17} width={17}></HomeIcon>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    {
                        links.map((link) =>
                            <ItemsLinks
                                key={link.urlPath}
                                title={link.title}
                                urlPath={link.urlPath}
                            />
                        )
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </>

    )
}



