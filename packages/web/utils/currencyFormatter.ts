type NumberFormatType = {
    value: number;
    style?: string;
    currency?: string;
    locale: string | string[];
};

export const currencyFormatter = ({
    value,
    style,
    currency,
    locale,
}: NumberFormatType) => {
    let options: Omit<NumberFormatType, "value" | "locale"> & {
        maximumSignificantDigits?: number;
    } = {};

    if (style) options["style"] = style;
    if (currency) options["currency"] = currency;
    return new Intl.NumberFormat(locale, options).format(value);
};
