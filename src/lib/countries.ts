export interface Country {
  name: string
  code: string
  dialCode: string
  flag: string
}

function countryCodeToEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
    .join('');
}
export async function fetchCountries(): Promise<Country[]> {
  return await fetch('https://restcountries.com/v2/all?fields=name,callingCodes,alpha2Code').then(resp => {
    return resp.json()
  }).then(r => r.map(i => ({ name: i.name, code: i.alpha2Code, dialCode: `+${i.callingCodes[0]}`, flag: countryCodeToEmoji(i.alpha2Code) })))

}