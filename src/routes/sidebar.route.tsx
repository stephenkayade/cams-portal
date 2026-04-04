import { IRoute } from "../utils/interfaces.util";

const sidebarRoutes: Array<IRoute> = [
    {
        name: 'dashboard',
        title: 'Dashboard',
        url: '/dashboard',
        iconName: 'layout-right',
        action: 'navigate',
        isAuth: true,
        params: [],
        content: { collapsed: false, backButton: false }
    },
    {
        name: 'events',
        title: 'Events',
        url: '/events',
        iconName: 'events',
        action: 'navigate',
        isAuth: true,
        params: [],
        inroutes: [
            {
                route: 'events',
                parent: 'events',
                name: 'event-add',
                title: 'Add event',
                displayTitle: 'Add event',
                url: '/add',
                isAuth: true,
                params: [],
                content: { collapsed: false, backButton: true }
            },
            {
                route: 'events',
                parent: 'events',
                name: 'event-details',
                title: 'Event details',
                displayTitle: 'Event details',
                url: '',
                isAuth: true,
                params: [{ type: 'url', name: 'id' }],
                content: { collapsed: false, backButton: true }
            },
            {
                route: 'events',
                parent: 'events',
                name: 'event-edit',
                title: 'Edit event',
                displayTitle: 'Edit event',
                url: '/edit',
                isAuth: true,
                params: [{ type: 'url', name: 'id' }],
                content: { collapsed: false, backButton: true }
            },
        ],
        content: { collapsed: false, backButton: false }
    },
    {
        name: 'participants',
        title: 'Participants',
        url: '/participants',
        iconName: 'user-scan',
        action: 'navigate',
        isAuth: true,
        params: [],
        inroutes: [
            {
                route: 'participants',
                parent: 'participants',
                name: 'participant-details',
                title: 'Participant details',
                displayTitle: 'Participant details',
                url: '',
                isAuth: true,
                params: [{ type: 'url', name: 'id' }],
                content: { collapsed: false, backButton: true }
            }
        ],
        content: { collapsed: false, backButton: false }
    },
    {
        name: 'accommodations',
        title: 'Accommodations',
        url: '/accommodations',
        iconName: 'home',
        action: 'navigate',
        isAuth: true,
        params: [],
        content: { collapsed: false, backButton: false }
    },
    {
        name: 'resources',
        title: 'Resources',
        url: '/resources',
        iconName: 'hard-drive',
        action: 'navigate',
        isAuth: true,
        params: [],
        content: { collapsed: false, backButton: false }
    },
    {
        name: 'sessions',
        title: 'Sessions',
        url: '/sessions',
        iconName: 'apple-wallet',
        action: 'navigate',
        isAuth: true,
        params: [],
        content: { collapsed: false, backButton: false }
    },
    {
        name: 'users',
        title: 'Users',
        url: '/users',
        iconName: 'group',
        action: 'navigate',
        isAuth: true,
        params: [],
        content: { collapsed: false, backButton: false }
    },
    {
        name: 'reports',
        title: 'Reports',
        url: '/reports',
        iconName: 'reports',
        action: 'navigate',
        isAuth: true,
        params: [],
        content: { collapsed: false, backButton: false }
    },
    {
        name: 'communications',
        title: 'Communications',
        url: '/communications',
        iconName: 'send-mail',
        action: 'navigate',
        isAuth: true,
        params: [],
        content: { collapsed: false, backButton: false }
    }
];

export default sidebarRoutes;
