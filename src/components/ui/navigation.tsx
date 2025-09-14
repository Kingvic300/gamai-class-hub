import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

export default function Navigation() {
    return (
        <div className="flex justify-center py-4 bg-white shadow-md">
            <NavigationMenu>
                <NavigationMenuList>
                    {/* Home */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/"
                                className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                            >
                                Home
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* About dropdown */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>About</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="p-4 grid gap-2 w-[200px]">
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/about/company"
                                        className="block rounded-md px-2 py-1 hover:bg-gray-100"
                                    >
                                        Company
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/about/team"
                                        className="block rounded-md px-2 py-1 hover:bg-gray-100"
                                    >
                                        Team
                                    </Link>
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Courses */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/courses"
                                className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                            >
                                Courses
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Contact */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/contact"
                                className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                            >
                                Contact
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
