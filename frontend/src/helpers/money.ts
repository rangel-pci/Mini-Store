const Formatter = (currency: string, isoLanguage: string) => new Intl.NumberFormat(isoLanguage, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
})

export const formatter = (lang: string, value: number) => {
    
    switch(lang){
        case 'en':
        case 'usd':
            return Formatter('USD', 'en-US').format(value/100)
        case 'pt':
        case 'brl':
            return Formatter('BRL', 'pt-BR').format(value/100)
        default: return ''
    }
}