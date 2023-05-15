const PriceFormat = ({price}) => {
    return Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 2
    }).format(price)
}

export default PriceFormat;
