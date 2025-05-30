import {
    IconCamera,
    IconClipboardList,
    IconFileAi,
    IconFileDescription,
    IconHelp,
    IconHome,
    IconInnerShadowTop,
    IconListDetails,
    IconNews,
    IconPackageExport,
    IconSearch,
    IconSettings,
    IconUsers,
} from '@tabler/icons-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        // {
        //   title: "Dashboard",
        //   url: "/",
        //   icon: IconDashboard,
        // },

        {
            title: 'Dashboard',
            url: route('dashboard'),
            icon: IconHome,
        },

        {
            title: 'Category',
            url: route('categories.index'),
            icon: IconListDetails,
        },

        {
            title: 'Products',
            url: route('products.index'),
            icon: IconPackageExport,
        },

        {
            title: 'Orders',
            url: '/orders',
            icon: IconClipboardList,
        },

        {
            title: 'Users',
            url: '/users',
            icon: IconUsers,
        },

        {
            title: 'Articles',
            url: '/articles',
            icon: IconNews,
        },
    ],
    navClouds: [
        {
            title: 'Capture',
            icon: IconCamera,
            isActive: true,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Proposal',
            icon: IconFileDescription,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Prompts',
            icon: IconFileAi,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: IconSettings,
        },
        {
            title: 'Get Help',
            url: '#',
            icon: IconHelp,
        },
        {
            title: 'Search',
            url: '#',
            icon: IconSearch,
        },
    ],
};

interface AuthUser extends PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { props: inertiaProps } = usePage<AuthUser>();
    console.log(inertiaProps);
    const user = {
        name: inertiaProps.auth.user.name,
        email: inertiaProps.auth.user.email,
        avatar: '/avatars/shadcn.jpg',
    };
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            {/* <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">Acme Inc.</span>
                            </a> */}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />

                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
