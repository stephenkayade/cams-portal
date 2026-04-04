import { ChangeEvent, CSSProperties, KeyboardEvent, RefObject, MouseEvent, ReactElement, ReactNode, LazyExoticComponent, LegacyRef } from "react";
import { AudioAcceptType, ButtonType, CSVAcceptType, DisabledType, DocAcceptType, FeatureCategory, FileAcceptType, FilterType, FlexReverseType, FontWeightType, FormatDateType, IconFamilyType, IconName, ImageAcceptType, LevelType, ListUIType, LoadingType, NavItemType, PagesearchType, PDFAcceptType, PositionType, QueryOrderType, QuestionType, RefineType, ResourceType, RouteActionType, RouteParamType, RubricType, SemanticType, SizeType, StatusType, UserType, VideoAcceptType } from "./types.util";
import User from "../models/User.model";
import Industry from "../models/Industry.model";
import Question, { IQuestionTime } from "../models/Question.model";
import Career from "../models/Career.model";
import Field from "../models/Field.model";
import Skill from "../models/Skill.model";
import Topic from "../models/Topic.model";
import Talent, { ITalentCareer, ITalentGrowth } from "../models/Talent.model";
import Assessment from "../models/Assessment.model";
import Subscription from "../models/Subscription.model";
import Plan from "../models/Plan.model";
import Transaction from "../models/Transaction.model";
import Ticket from "../models/Ticket.model";
import Roadmap from "../models/Roadmap.model";
import Metric from "../models/Metric.model";
import Task from "../models/Task.model";
import Workspace, { IBusinessWorkspace, IPersonalWorkspace } from "../models/Workspace.model";

export interface ISeedFeature {
    plan: string,
    features: Array<{
        name: string,
        category: FeatureCategory,
        displayName: string,
        description: string,
        limit: number,
        isEnabled: boolean,
        modules: Array<Record<string, string>>,
        frequency: "monthly" | "yearly" | "unbound",
        pricing: {
            naira: {
                monthly: number,
                yearly: number
            },
            dollar: {
                monthly: number,
                yearly: number
            }
        }
    }>
}

export interface IUIFeature {
    name: string,
    displayName: string,
    category: FeatureCategory,
    plans: Array<{
        name: string
        limit: number,
        label?: string
        isEnabled: boolean,
        modules: Array<Record<string, string>>,
        frequency: "monthly" | "yearly" | "unbound",
        pricing: {
            naira: {
                monthly: number,
                yearly: number
            },
            dollar: {
                monthly: number,
                yearly: number
            }
        }
    }>
}

export interface ISetCookie {
    key: string,
    payload: any,
    expireAt?: Date,
    maxAge?: number,
    path?: string
}

export interface IGetCookie {
    key: string,
    parse?: boolean
}

export interface IRemoveCookie {
    key: string,
    parse?: boolean
}

export interface IRouteParam {
    type: RouteParamType,
    name: string,
    value?: string
}

export interface IRouteItem {
    name: string,
    title?: string,
    displayTitle?: string,
    url: string,
    isAuth: boolean,
    iconName?: string,
    action?: RouteActionType,
    content: {
        backButton?: boolean,
        collapsed?: boolean
    }
    params?: Array<IRouteParam>
}

export interface IInRoute extends IRouteItem {
    layout?: boolean,
    route: string,
    parent: string,
}

export interface IRoute extends IRouteItem {
    subroutes?: Array<IRouteItem>
    inroutes?: Array<IInRoute>
}

export interface INavItem {
    type: NavItemType,
    label: string,
    path?: string,
    active?: boolean,
    disabled?: boolean,
    hide?: boolean,
    icon: {
        enable?: boolean,
        name: string,
        className?: string
    }
    onClick(e: MouseEvent<HTMLAnchorElement>): void
}

export interface INavDivider {
    type: NavItemType,
    show?: boolean
}

export interface IStorage {
    storeAuth(token: string, id: string): void,
    checkToken(): boolean,
    getToken(): string | null,
    checkUserID(): boolean,
    getUserID(): string,
    checkUserEmail(): boolean,
    getUserEmail(): string | null,
    getConfig(): any,
    getConfigWithBearer(): any,
    clearAuth(): void,
    keep(key: string, data: any): boolean,
    keepLegacy(key: string, data: any): boolean,
    fetch(key: string): any,
    fetchLegacy(key: string): any,
    deleteItem(key: string, legacy?: boolean): void,
    trimSpace(str: string): void,
    copyCode(code: string): void
}

export interface IDateToday {
    year: string,
    month: string,
    date: string,
    hour: string,
    minutes: string,
    seconds: string,
    ISO: string,
    dateTime: string | number
}

export interface IState {
    code: string,
    name: string,
    subdivision: string
}

export interface ITimezone {
    name: string,
    label: string,
    displayName: string,
    countries: Array<string>,
    utcOffset: string,
    utcOffsetStr: string,
    dstOffset: string,
    dstOffsetStr: string,
    aliasOf: string
}

export interface ICountry {
    name: string
    code2: string,
    code3: string,
    capital: string,
    region: string,
    subregion: string,
    states: Array<IState>,
    slug: string,
    timezones: Array<ITimezone>
    flag: string,
    base64: string,
    currencyCode: string,
    currencyImage: string,
    phoneCode: string

}

export interface IHelper {
    init(type: string): void,
    scrollTo(id: string): void,
    scrollToTop(): void,
    addClass(id: string, cn: string): void,
    removeClass(id: string, cn: string): void,
    splitQueries(query: any, key: string): any,
    navOnScroll(data: { id: string, cn: string, limit?: number }): void,
    decodeBase64(data: string): { width: string, height: string, image: any },
    isEmpty(data: any, type: 'object' | 'array'): boolean,
    capitalize(val: string): string,
    sort(data: Array<any>): Array<any>,
    days(): Array<{ id: number, name: string, label: string }>
    months(): Array<{ id: number, name: string, label: string }>,
    random(size: number, isAlpha?: boolean): string,
    formatDate(date: any, type: FormatDateType): string,
    equalLength(id: string, childId: string, len?: number): void,
    setWidth(id: string, val: number): void,
    setHeight(id: string, val: number): void,
    isNAN(val: any): boolean,
    reposition(data: Array<any>, from: number, to: number): Array<any>,
    prioritize(data: Array<any>, prio: Array<any>, key?: string): Array<any>
    splitByComma(data: string): Array<string>
    dateToday(date: string | Date): IDateToday,
    roundFloat(val: number): number,
    addElipsis(val: string, size: number): string,
    formatPhone(val: string, code: string): string,
    leadingZero(val: number): string,
    encodeCardNumber(num: string): string,
    monthsOfYear(val: string | number): string,
    readCountries(): Array<any>,
    listCountries(): Array<{ code: string, name: string, phone: string }>
    sortData(data: Array<any>, filter: string): Array<any>,
    attachPhoneCode(code: string, phone: string, include: boolean): string,
    capitalizeWord(value: string): string,
    shrinkWordInString(value: string, ret: number): string,
    truncateText(text: string, max: number): string
    objectToArray(data: Object | any): Array<any>,
    displayBalance(value: number): string,
    parseInputNumber(value: string, type: 'number' | 'decimal'): number,
    toDecimal(value: number, places: number): number
    formatCurrency(currency: string): string,
    currentDate(): Date,
    getCurrentPage(data: IPagination): number;
    getInitials(value: string): string,
    hyphenate(action: 'add' | 'remove', val: string): string,
    daysFromDates(start: string, end: string): number,
    getCountry(code: string): ICountry | null,
    getAvatar(select: string | number): string,
    enumToArray(data: Object, type: 'all' | 'values-only' | 'keys-only'): Array<any>,
    extractor(data: any): any,
    countWeeks(start: string, end: string): number,
    pickFrom<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>,
    sanitizeWord(data: any): string


}

export interface IRoutil {
    computeAppRoute(route: IRoute): string,
    computePath(route: string): string,
    computeSubPath(route: IRoute, subroute: IRouteItem): string,
    computeInPath(inroute: IInRoute): string,
    inRoute(payload: { route: string, name: string, params?: Array<IRouteParam> }): string,
    resolveRouteParams(params: Array<IRouteParam>, stickTo: 'app' | 'page'): string
}

export interface IICon {
    type: IconFamilyType,
    name: string,
    size?: number,
    position?: 'absolute' | 'relative',
    clickable?: boolean,
    url?: string,
    height?: number,
    className?: string,
    style?: CSSProperties
    onClick?(e: MouseEvent<HTMLAnchorElement>): void
}

export interface ISVGIcon {
    name: 'check' | 'x' | 'cancel' | 'roads' | 'roads-green',
    size?: number,
    position?: 'absolute' | 'relative',
    width?: string,
    height?: string,
    className?: string,
    style?: CSSProperties,
    stroke?: number
    onClick?(e: MouseEvent<HTMLAnchorElement>): void
}

export interface IPanelBox {
    title: string,
    animate?: boolean,
    width?: number,
    children?: React.ReactNode,
    onClose?(e: any): void,
    onOpen?(e: any): void
}

export interface ITextInput {
    type: 'text' | 'email' | 'url',
    readonly?: boolean,
    name?: string,
    id?: string
    defaultValue?: string,
    value?: string,
    size?: SizeType,
    className?: string,
    autoComplete?: boolean,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    icon?: {
        enable: boolean,
        position: PositionType
        child: ReactNode,
        onClick?(e: any): void
    },
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    onFocus?(e: any): void,
    onKeyUp?(e: KeyboardEvent<HTMLInputElement>): void
    onChange(e: ChangeEvent<HTMLInputElement>): void
}

export interface ISwitchInput {
    id?: string,
    checked: boolean,
    disabled?: boolean,
    size?: SizeType,
    label?: {
        text: string,
        className?: string,
        size?: number,
        weight?: FontWeightType,
    }
    ariaLabel?: string, // accessible label when visual label isn't present
    className?: string,
    onChange(checked: boolean): void,
}

export interface IPinInput {
    type: 'text' | 'password',
    readonly?: boolean,
    size?: SizeType,
    className?: string,
    showFocus?: boolean,
    length: number,
    isError?: boolean,
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    onChange(pin: string): void

}

export interface IPasswordInput {
    readonly?: boolean,
    name?: string,
    id?: string
    defaultValue?: string,
    value?: string,
    size?: SizeType,
    className?: string,
    autoComplete?: boolean,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    disabled?: boolean,
    forgot?: {
        enable: boolean,
        onClick(e: any): void
    }
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    icon?: {
        enable: boolean,
        position: PositionType
        child: ReactNode,
        onClick?(e: any): void
    },
    onChange(e: ChangeEvent<HTMLInputElement>): void

}

export interface ISearchInput {
    readonly?: boolean,
    name?: string,
    id?: string
    defaultValue?: string,
    value?: string,
    size?: SizeType,
    className?: string,
    autoComplete?: boolean,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    hasResult?: boolean,
    disabled?: boolean
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    onFocus?(e: any): void,
    onChange(e: ChangeEvent<HTMLInputElement>): void
    onSearch(e: MouseEvent<HTMLAnchorElement>): void
}

export interface ISelectInput {
    readonly?: boolean,
    name?: string,
    id?: string
    selected?: string,
    size?: SizeType,
    className?: string,
    showFocus?: boolean,
    isError?: boolean,
    placeholder: {
        value: string,
        enable?: boolean
    },
    options: Array<{
        name: string,
        value: any
    }>
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    onSelect(e: ChangeEvent<HTMLSelectElement>): void
}

export interface ITextAreaInput {
    rows?: number,
    cols?: number,
    readonly?: boolean,
    name?: string,
    id?: string
    defaultValue?: string,
    value?: string,
    size?: SizeType,
    className?: string,
    autoComplete?: boolean,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    icon?: {
        enable: boolean,
        position: PositionType
        child: ReactNode,
        onClick?(e: any): void
    },
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    onFocus?(e: any): void,
    onKeyUp?(e: KeyboardEvent<HTMLTextAreaElement>): void
    onChange(e: ChangeEvent<HTMLTextAreaElement>): void

}

export interface IPhoneInput {
    textInput: ITextInput,
    filter: IFilter,
    width?: string,
    gap?: string,
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
}

export interface ICountryInput {
    ref?: RefObject<HTMLInputElement>,
    readonly?: boolean,
    name?: string,
    id?: string
    defaultValue?: string,
    value?: string,
    size?: string,
    className?: string,
    autoComplete?: boolean,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    dropdown: {
        countryCode?: boolean
        contryName?: boolean,
        size?: string,
    }
    onSelect(data: any): void

}

export interface INumberInput {
    readonly?: boolean,
    name?: string,
    id?: string
    defaultValue?: string,
    value?: string,
    size?: SizeType,
    className?: string,
    autoComplete?: boolean,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    min?: string | number,
    max?: string | number,
    step?: string,
    icon?: {
        enable: boolean,
        position: PositionType
        child: ReactNode,
        onClick?(e: any): void
    },
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    onChange(e: ChangeEvent<HTMLInputElement>): void

}

export interface IFilter {
    readonly?: boolean,
    name?: string,
    id?: string
    defaultValue?: string,
    size?: SizeType,
    className?: string,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    position?: PositionType,
    noFilter?: boolean,
    disabled?: boolean,
    multiple?: boolean,
    control?: {
        showImage?: boolean,
        display?: 'badge' | 'default',
        badgeType?: SemanticType,
        flat?: boolean
    }
    icon?: {
        type?: any,
        name?: string,
        style?: CSSProperties,
        child?: ReactNode
    }
    menu?: {
        style?: CSSProperties,
        search?: boolean,
        className?: string,
        fullWidth?: boolean,
        limitHeight?: SizeType,
    }
    items: Array<IFilterItem>,
    onChange(item: IFilterItem): void
    onSelect?(items: Array<IFilterItem>): void
}

export interface IFilterItem {
    label: string,
    display?: string,
    value: string,
    image?: string,
    disabled?: boolean,
    className?: string,
    icon?: {
        type: IconFamilyType,
        name: string,
        size?: number
    }
    check?: {
        enable: boolean
    }
    onClick?(e: MouseEvent<HTMLAnchorElement>, item: IFilterItem): void
}

export interface ISearchFilter {
    readonly?: boolean,
    name?: string,
    id?: string
    defaultValue?: string,
    size?: SizeType,
    className?: string,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    position?: PositionType,
    noFilter?: boolean,
    disabled?: boolean,
    multiple?: boolean,
    control?: {
        showImage?: boolean,
        display?: 'badge' | 'default',
        badgeType?: SemanticType
    }
    icon?: {
        type?: any,
        name?: string,
        style?: CSSProperties,
        child?: ReactNode
    }
    menu?: {
        style?: CSSProperties,
        search?: boolean,
        className?: string,
        fullWidth?: boolean,
        limitHeight?: SizeType,
    }
    items: Array<ISearchFilterItem>,
    onChange(item: ISearchFilterItem): void,
    onSelect?(items: Array<IFilterItem>): void
}
export interface ISearchFilterItem {
    label: string,
    value: string,
    display?: string,
    image?: string,
    check?: {
        enable: boolean
    }
}

export interface ICheckbox {
    readonly?: boolean,
    name?: string,
    id?: string
    checked?: boolean,
    className?: string,
    size?: SizeType,
    style?: CSSProperties,
    wrapper?: {
        className?: string
    }
    label?: {
        title: string,
        className?: string,
        fontSize?: string,
        fontWeight?: FontWeightType
    },
    onChange(e: ChangeEvent<HTMLInputElement>): void

}

export interface IFileInput {
    name?: string,
    id?: string
    value?: string,
    size?: SizeType,
    className?: string,
    autoComplete?: boolean,
    placeholder?: string,
    showFocus?: boolean,
    isError?: boolean,
    disabled?: boolean
    accept?: FileAcceptType
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    icon?: {
        enable: boolean,
        position: PositionType
        child: ReactNode,
        onClick?(e: any): void
    },
    onChange(file: IFileUpload | null): void

}

export interface IImageUI {
    url?: string,
    className?: string,
    title: string,
    onChange(data: IResult): void
}

export interface IDropSelect {
    placeholder: string,
    options: any,
    onChange: any,
    focus: boolean,
    className: string,
    controlClassName: string
    isDisabled: boolean,
    defaultValue: any,
    controlDisplayImage: boolean,
    optionDisplayImage: boolean,
    controlDisplayLabel: boolean,
    optionDisplayLabel: boolean,
    controlDisplayLeft: boolean,
    disableSeparator: boolean | undefined,
    menuPosition: string,
    isSearchable: boolean,
    optionDisplayLeft: boolean,
    menuBackground: string,
    menuStyle: CSSProperties,
    menuClassName: string,
    searchBackground: string,
    searchColor: string,
    optionColor: string
}

export interface IDropSelectState {
    options: Array<any>,
    selected: {
        value: string,
        label: string,
        left: string,
        image: string,
    },
    isOpen: boolean,
    placeholder: string | undefined
}

export interface IDropdown {
    options: any,
    className: string,
    selected: any,
    defaultValue: any,
    placeholder: string,
    disabled: boolean,
    size: SizeType,
    control: {
        left: boolean,
        label: boolean,
        image: boolean,
        className?: string
    },
    menu: {
        bgColor: string,
        position: string,
        itemColor: string,
        itemLeft: boolean,
        itemLabel: boolean,
        style?: CSSProperties,
        className?: string
    },
    search: {
        enable: boolean,
        bgColor: string,
        color: string
    }
}

export interface IDateInput {
    name?: string,
    id?: string
    defaultValue?: Date,
    size?: SizeType,
    className?: string,
    selected?: boolean,
    position?: PositionType,
    isError?: boolean,
    time?: {
        enable: boolean,
        default?: Date
    }
    placeholder: {
        value: string,
        enable?: boolean
    },
    showFocus?: boolean,
    label?: {
        title: string,
        className?: string,
        required?: boolean,
        fontSize?: number,
        weight?: FontWeightType
    },
    onChange(calendar: ICalendar): void
}

export interface ICalendar {
    date: string,
    time: string,
    data: {
        date: Date,
        time: ITimeProps
    },
}

export interface ITimeProps {
    hour: string,
    min: string,
    sec: string,
    ampm: string
}

export interface ILinkButton {
    text: {
        label: string,
        className?: string,
        weight?: FontWeightType,
        size?: number,
        color?: string
    },
    url?: string,
    icon?: {
        enable?: boolean,
        child?: ReactNode
    }
    loading?: boolean,
    disabled?: boolean,
    className?: string
    onClick(e: MouseEvent<HTMLAnchorElement>): void
}

export interface IIconButton {
    container?: {
        className?: string
    },
    icon: {
        size?: number,
        className?: string,
        name: string,
        type: IconFamilyType
        child?: ReactNode
    },
    label?: {
        text: string,
        className?: string,
        size?: number,
        weight?: FontWeightType,
    }
    initBg?: boolean,
    active?: boolean,
    url?: string,
    size?: string,
    className?: string,
    radius?: string,
    onClick(e?: any): void
}

export interface IButton {
    id?: string,
    text: {
        label: string,
        size?: number,
        weight?: FontWeightType,
    },
    type?: ButtonType,
    url?: string,
    semantic?: SemanticType,
    size?: SizeType
    fill?: boolean,
    loading?: boolean,
    disabled?: boolean,
    disabledType?: DisabledType,
    block?: boolean,
    className?: string,
    reverse?: FlexReverseType,
    style?: CSSProperties,
    icon?: {
        enable: boolean,
        className?: string,
        child: ReactNode
    },
    onClick(e: MouseEvent<HTMLAnchorElement>): void
}

export interface ISelectedFilter {
    label: string,
    value: any,
    item?: IFilterItem
}

export interface IPopout {
    defaultValue?: string,
    className?: string,
    showFocus?: boolean,
    isError?: boolean,
    position?: PositionType,
    noFilter?: boolean,
    disabled?: boolean,
    menu?: {
        style?: CSSProperties,
        search?: boolean,
        className?: string,
        fullWidth?: boolean,
        limitHeight?: SizeType,
    }
    items: Array<IPopoutItem>,
}

export interface IPopoutItem {
    label: string,
    value: string,
    image?: string,
    disabled?: boolean,
    className?: string,
    icon?: {
        type: IconFamilyType,
        name: string,
        size?: number
    }
    check?: {
        enable: boolean
    }
    onClick(e: MouseEvent<HTMLAnchorElement>, item: IPopoutItem): void
}

export interface IAlert {
    name: string,
    type: SemanticType,
    show: boolean,
    className?: string,
    message?: string,
    dismiss?: boolean,
}

export interface IToast {
    show: boolean,
    title?: string,
    message: string,
    type: SemanticType,
    position: PositionType,
    close(e?: MouseEvent<HTMLAnchorElement>): void,
}

export interface IToast {
    show: boolean,
    title?: string,
    message: string,
    type: SemanticType,
    position: PositionType
}

export interface ICustomModal {
    show: boolean,
    title: string,
    header?: boolean,
    flattened?: boolean,
    className?: string,
    size?: SizeType,
    child?: ReactNode,
    children: ReactNode,
    hideOnClose?: boolean,
    backdrop?: {
        bgColor?: ''
    }
    closeModal(e?: any): void
}

export interface IModalProps {
    show: boolean,
    header?: boolean,
    title: string,
    flattened?: boolean,
    className?: string,
    size?: SizeType,
    closeModal(e?: any): void
}

export interface IForgotModal extends IModalProps { }
export interface IPlanModal extends IModalProps { }
export interface IRedirectModal extends IModalProps {
    message: string,
    redirectUrl: string
}
export interface IVerifyModal extends IModalProps {
    reference: string | null
}
export interface IMessageModal extends IModalProps {
    type: 'successful' | 'failed',
    message: string
}
export interface IRenewModal extends IModalProps { }
export interface ILevelModal extends IModalProps {
    level: LevelType
}

export interface IRoundButton {
    icon: ReactElement
    className?: string,
    clickable?: boolean,
    size?: SizeType,
    style?: CSSProperties,
    onClick?(e: MouseEvent<HTMLAnchorElement>): void
}

export interface IFileUpload {
    raw: any,
    base64: string,
    parsedSize: number,
    sizeExt: string,
    name: string,
    size: number,
    type: string,
    dur: number
}

export interface IFileog {
    sizeLimit?: number,
    accept: Array<CSVAcceptType | ImageAcceptType | PDFAcceptType | VideoAcceptType | DocAcceptType | AudioAcceptType>,
    type: FileAcceptType,
    raw?: boolean,
    multiple?: boolean,
    onSelect(files: Array<IFileUpload>): void
}

export interface IFileogRef {
    open(e?: any): void
    browse(e?: any): void
}

export interface IListQuery {
    limit?: number,
    paginate?: string,
    page?: number,
    select?: string,
    order?: QueryOrderType,
    type?: string,
    admin?: boolean,
    mapped?: boolean,
    from?: string,
    to?: string,
    resource?: ResourceType,
    resourceId?: string,
    key?: string,
    payload?: any,
    report?: boolean,
    workspace?: string
}

export interface IMetricQuery {
    type: FilterType,
    startDate?: string,
    endDate?: string,
    resource?: FilterType,
    resourceId?: string
}

export interface IListUI {
    type: ListUIType,
    resource?: ResourceType
    resourceId?: string,
    subsource?: ResourceType
    headers?: Array<{ label: string, style?: CSSProperties }>,
    rows?: Array<IListUIRow>

}

export interface IAPIReport {
    format: string,
    csv?: string,
    xml?: any,
    pdf?: any
}

export interface IListUIRow {
    option: 'status' | 'data',
    resource: ResourceType,
    type?: StatusType,
    data: any,
    callback?(data: any): void
}

export interface IUserCountry {
    name: string;
    code2: string;
    code3: string;
    capital: string;
    region: string;
    currencyCode: string;
    phoneCode: string;
    timezones: Array<ITimezone>;
}

export interface IUserPermission {
    entity: string,
    actions: Array<string>
}

export interface IAPIKey {
    secret: string,
    public: string,
    token: string,
    publicToken: string,
    domain: string,
    isActive: boolean,
    updatedAt: string
}

export interface IToastState {
    show: boolean,
    title?: string,
    error?: string,
    message: string,
    type: SemanticType,
    position: PositionType
}

export interface IPagination {
    next: { page: number, limit: number },
    prev: { page: number, limit: number },
}

export interface IDashboardLayout {
    component: any,
    title: string,
    back: boolean,
    sidebar: {
        collapsed: boolean
    }
}

export interface IPageLayout {
    component: ReactNode,
    navbar?: {
        title?: string,
        back?: boolean,
        logo?: boolean
    }
}

export interface IAPIResponse {
    error: boolean,
    errors: Array<any>,
    report?: IAPIReport
    count?: number,
    total?: number,
    pagination?: IPagination,
    data: any,
    message: string,
    token?: string,
    status: number
}

export interface IResult {
    message: string,
    error: boolean,
    field?: string,
    data: any,
}

export interface ISidebar {
    pageTitle: string,
    collapsed: boolean
}

export interface ISidebarProps {
    collapsed: boolean,
    route: IRouteItem,
    inroutes?: Array<IInRoute>,
    subroutes: Array<IRouteItem>,
    isOpen: boolean
}

export interface ITopbar {
    pageTitle: string,
    sticky?: boolean,
    showBack: boolean
}

export interface INavbar {
    title?: string,
    brand?: boolean,
    sticky?: boolean,
    showBack: boolean
}

export interface IPoller {
    loading: boolean,
    key: string,
    status: string,
    code: string
}

export interface ISetLoading {
    option: LoadingType,
    type?: string
}

export interface IUnsetLoading {
    option: LoadingType,
    type?: string,
    message: string
}

export interface IFileUpload {
    raw: any,
    base64: string,
    parsedSize: number,
    sizeExt: string,
    name: string,
    size: number,
    type: string,
    dur: number
}

export interface IEmptyState {
    children: any,
    bgColor?: string,
    size: SizeType,
    className?: string,
    bound?: boolean
}
export interface ITableHead {
    className?: string,
    items: Array<ICellHead>
}
export interface ICellHead {
    fontSize?: number,
    className?: string,
    label: string,
    style?: CSSProperties
}
export interface ICellData {
    fontSize?: number,
    className?: string,
    large?: boolean,
    style?: CSSProperties,
    children: ReactNode,
    onClick?(e: MouseEvent<any>): void
}
export interface IBadge {
    type: SemanticType,
    label: string
    display?: 'badge' | 'status',
    className?: string,
    style?: CSSProperties,
    size?: SizeType,
    padding?: { y: number, x: number }
    font?: {
        weight: FontWeightType,
        size: number
    }
    upper?: boolean
    close?: boolean,
    onClose?(e: any): void
}

export interface IDivider {
    show?: boolean,
    bg?: string,
    padding?: {
        enable?: boolean,
        top?: string,
        bottom?: string
    }
}

export interface IPlaceholder {
    className: string,
    height: string,
    bgColor: string,
    width: string,
    minWidth: string,
    minHeight: string,
    animate: boolean,
    radius: string | number,
    marginTop: string
    marginBottom: string,
    block: boolean,
    top: string
    left: string
    right: string,
    flex: boolean
}

export interface IPageSearch {
    key: string,
    hasResult: boolean,
    refine?: RefineType,
    payload?: any,
    type: PagesearchType,
    filters?: any,
    resource?: ResourceType,
    resourceId?: string
}

export interface IClearResource {
    type: string,
    resource: 'multiple' | 'single'
}

export interface IGroupedResource {
    name: string;
    links: Array<{
        title: string;
        snippet: string,
        url: string;
    }>;
}

export interface ICollection {
    data: Array<any>,
    report?: IAPIReport
    count: number,
    total: number,
    pagination: IPagination,
    loading: boolean,
    refineType?: RefineType,
    message?: string,
    payload?: any
}

export interface ICoreResource {
    industries: Array<Industry>,
    careers: Array<Career>,
    fields: Array<Field>,
    skills: Array<Skill>,
    topics: Array<Topic>
}

export interface IUserContext {
    users: ICollection,
    user: User,
    talent: Talent,
    mainCareer: ITalentCareer,
    subscription: Subscription,
    workspaces: ICollection,
    workspace: Workspace,
    normWorkspace: {
        personal: IPersonalWorkspace | null,
        businesses: Array<IBusinessWorkspace>
    }
    plan: Plan,
    userType: string,
    loading: boolean,
    loader: boolean,
    workspaceLoading: boolean,
    sidebar: ISidebarProps,
    toast: IToastState,
    growth: ITalentGrowth,
    setToast(data: IToastState): void,
    clearToast(): void,
    setSidebar(data: ISidebarProps): void,
    currentSidebar(collapse: boolean): ISidebarProps | null,
    setUserType(type: string): void,
    setCollection(type: string, data: ICollection): void,
    setResource(type: string, data: any): void
    setLoading(data: ISetLoading): void,
    unsetLoading(data: IUnsetLoading): void,
}

export interface IAppContext {
    poller: IPoller,
    search: ICollection,
    items: Array<any>
    uiFeatures: Array<IUIFeature>,
    camsDashboard: Record<string, any>,
    camsEvents: ICollection,
    camsEvent: any,
    camsEventStats: Record<string, any>,
    camsCenters: ICollection,
    camsCountries: Array<any>,
    camsParticipants: ICollection,
    camsParticipant: any,
    camsAccommodations: ICollection,
    camsAccommodation: any,
    camsRooms: ICollection,
    camsRoom: any,
    camsResourceGroups: ICollection,
    camsResourceGroupTypes: ICollection,
    camsResourceTypeGroups: ICollection,
    camsServicePoints: ICollection,
    camsSessions: ICollection,
    camsSession: any,
    camsUsers: ICollection,
    camsUser: any,
    camsReports: ICollection,
    camsReport: any,
    camsSelectedEvent: Record<string, any>,
    message: string,
    loading: boolean,
    loader: boolean,
    clearResource(data: IClearResource): void,
    setCollection(type: string, data: ICollection): void,
    setResource(type: string, data: any): void
    setLoading(data: ISetLoading): void,
    unsetLoading(data: IUnsetLoading): void,
}
