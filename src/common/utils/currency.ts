export const Currency = (coin: number) => {
    const real = new Intl.NumberFormat('pt-ao', {
        style: 'currency',
        currency: 'AOA'
    })

    return real.format(coin);
}