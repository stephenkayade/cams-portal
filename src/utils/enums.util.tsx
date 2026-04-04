export enum CurrencyType {
    NGN = 'NGN',
    USD = 'USD'
}
export enum CurrencySymbol {
    NGN = '₦',
    USD = '$'
}
export enum HeaderType {
    IDEMPOTENT = 'x-idempotent-key'
}
export enum CookieKeyType {
    XHIT = 'x-hit'
}

export enum UIView {
    FORM = 'form',
    MESSAGE = 'message'
}

export enum UserEnumType {
    SUPER = 'superadmin',
    ADMIN = 'admin',
    BUSINESS = 'business',
    TALENT = 'talent',
    USER = 'user'
}
export enum WorkspaceType {
    PERSONAL = 'personal',
    BUSINESS = 'business',
}
export enum PasswordType {
    SELF = 'self',
    GENERATED = 'generated',
    SELF_CHANGED = 'self-changed'
}

export enum FileLinks {
    TOPIC_CSV = 'https://docs.google.com/spreadsheets/d/1kJxsETglcWDsRSlHyO7MQEcJHBn9tHiUWnNKW4p1myQ/edit?usp=sharing'
}

export enum LevelEnum {
    DEFAULT = 'default',
    NOVICE = 'novice',
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced',
    PROFESSIONAL = 'professional',
    LEADER = 'leader',
    EXPERT = 'expert'
}

export enum TimeHandleEnum {
    SECONDS = 'second',
    MINUTE = 'minute',
    HOUR = 'hour'
}

export enum DifficultyEnum {
    RANDOM = 'random',
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
    DIFFICULT = 'difficult'
}

export enum QuestionTypeEnum {
    TRIVIAL = 'trivial',
    PRACTICAL = 'practical',
    GENERAL = 'general'
}

export const WorkspaceEnum = {
    PERSONAL: 'personal',
    BUSINESS: 'business',
} as const
export const OwnerEnum = {
    TALENT: 'talent',
    BUSINESS: 'business',
} as const

export const StatusEnum = {
    ACTIVE: 'active',
    PENDING: 'pending',
    INPROGRESS: 'in-progress',
    OVERDUE: 'overdue',
    PROCESSING: 'processing',
    ONGOING: 'ongoing',
    SUCCESSFUL: 'successful',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    PAID: 'paid',
    CANCELLED: 'cancelled',
    SUBMITTED: 'submitted',
    REVIEWED: 'reviewed',
    ABANDONED: 'abandoned',
    AVAILABLE: 'available',
    ACCEPTED: 'accepted',
    DECLINED: 'declined',
    DEFAULTED: 'defaulted',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'rejected',
    DRAFT: 'draft',
} as const

export enum SubmittedByEnum {
    TALENT = 'talent',
    SYSTEM = 'system',
}

export enum TaskSubmissionEnum {
    LINK = 'link',
    FILE = 'file',
}

export enum PlanTypeEnum {
    TALENT = 'talent',
    BUSINESS = 'business',
}

export enum PlanNameEnum {
    STARTER = 'starter',
    PREMIUM = 'premium',
}

export enum FrequencyEnum {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
    MONTH = 'month',
    YEAR = 'year'
}

export enum TicketTypeEnum {
    FEEDBACK = 'feedback',
    SUPPORT = 'support',
}

export enum TicketStatusEnum {
    OPEN = 'open',
    RESOLVED = 'resolved',
    CLOSED = 'closed',
}

export const RubricEnum ={
    ASSESSMENTS: 'assessments',
    TASKS: 'tasks',
    PROJECTS: 'projects',
    SESSIONS: 'sessions',
    POINTS: 'points',
    ROADMAPS: 'roadmaps'
}

export const RankingTypeEnum = {
    POINTS: 'points',
    STREAK: 'streak',
} as const

export const BadgeEnum = {
    SUPER: 'super',
    POWER_UP: 'power-up',
    PLATFORM: 'platform'
}
export const TaskFieldEnum = {
    OBJECTIVES: 'objectives',
    INSTRUCTIONS: 'instructions',
    DELIVERABLES: 'deliverables',
    RESOURCES: 'resources',
    OUTCOMES: 'outcomes',
    REQUIREMENTS: 'requirements',
    RUBRICS: 'rubrics',
    SKILLS: 'skills',
    GUIDELINES: 'guidelines',
} as const

export const UIEnum = {
    NEW: 'new',
    OLD: 'old',
} as const

export const TaskTypeEnum = {
    TEMPLATE: 'template',
} as const

export const UploadFormatEnum = {
    BASE64: 'base64',
    RAW_FILE: 'rawfile'
} as const

export const UIViewEnum = {
    FORM: 'form',
    MESSAGE: 'message',
    BROWSE: 'browse-file',
    FILE_SELECTED: 'file-selected',
    UPLOADED: 'uploaded',
    UPLOAD_ERROR: 'upload-error'
} as const