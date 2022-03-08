interface ErrorsData {
    label: string;
    subLabel: string;
    href: string
}

const errorsData: ErrorsData[] = [
    {
        label: '404',
        subLabel: 'Не туда попали',
        href: 'chat'
    },
    {
        label: '500',
        subLabel: 'Мы уже фиксим',
        href: 'chat'
    }
]

export default errorsData;
