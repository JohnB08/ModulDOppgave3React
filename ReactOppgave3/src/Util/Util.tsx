const sanitizeList = /[{!"£$#¤%&/()=?+´`}]/;


export const needClean = (string: string) =>{
let needClean = sanitizeList.test(string)
return needClean
}