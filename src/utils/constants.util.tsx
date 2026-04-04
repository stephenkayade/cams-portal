import { StatusEnum } from "./enums.util"
import helper from "./helper.util"

export const TaskStatus = helper.pickFrom(StatusEnum, [
    'DRAFT', 'PENDING', 'INPROGRESS', 'SUBMITTED', 'REVIEWED', 'DEFAULTED', 'ABANDONED', 'COMPLETED'
] as const)

export const BADGES = [
    // --- SUPER BADGES ---
    {
        name: 'Streak Master',
        label: 'streak-master',
        description: 'Maintained a 7-day activity streak',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge01.png', // Placeholder
        type: 'super'
    },
    {
        name: 'Task Starter',
        label: 'task-starter',
        description: 'Completed your first Task',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge01.png',
        type: 'super'
    },
    {
        name: 'Assessment Rookie',
        label: 'assessment-rookie',
        description: 'Completed your first assessment',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge01.png',
        type: 'super'
    },
    {
        name: 'Pathfinder',
        label: 'pathfinder',
        description: 'Completed your first roadmap',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge01.png',
        type: 'super'
    },

    // --- POWER-UP BADGES ---
    {
        name: 'Task Slayer',
        label: 'task-slayer',
        description: 'Completed 10 tasks',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge02.png',
        type: 'power-up'
    },
    {
        name: 'Top Scholar',
        label: 'top-scholar',
        description: 'Achieved 5 "A" grades in assessments',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge02.png',
        type: 'power-up'
    },
    {
        name: 'Skill Builder',
        label: 'skill-builder',
        description: 'Completed 15 assessments, 10 tasks, and 4 roadmaps',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge02.png',
        type: 'power-up'
    },

    // --- PLATFORM BADGES ---
    {
        name: 'Neburis',
        label: 'neburis',
        description: 'The Cosmic Cradle: Shaping chaos into clarity.',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge03.png',
        type: 'platform'
    },
    {
        name: 'Voidspire',
        label: 'voidspire',
        description: 'The Void Breaker: Creating greatness from nothing.',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge03.png',
        type: 'platform'
    },
    {
        name: 'Tideforge',
        label: 'tiedforge',
        description: 'The Relentless Force: Unbreakable mastery through consistency.',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge03.png',
        type: 'platform'
    },
    {
        name: 'Perenius',
        label: 'perenius',
        description: 'The Timeless Endurer: Unwavering consistency over seasons.',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge03.png',
        type: 'platform'
    },
    {
        name: 'Eclipsara',
        label: 'eclipsara',
        description: 'The Cosmic Alignment: Transcending limits and achieving the impossible.',
        logo: 'https://storage.googleapis.com/pacitude-buckets/badge03.png',
        type: 'platform'
    }
]