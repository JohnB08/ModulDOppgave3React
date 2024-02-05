const sanitizeList = /[{"¤%/()=´`}]/;

/**
 * Sammenligner input med en rekke tegn som ikke er godkjente tegn for bedriftsnavn
 * @param string stringen som må bli renset.
 * @returns boolean true : false
 */
export const needClean = (string: string) =>{
let needClean = sanitizeList.test(string)
return needClean
}