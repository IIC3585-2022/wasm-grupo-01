const isSubsetExist = (S, n, a, b, c, arr) => {
    if (a === 0 && b == 0 && c == 0){
      return true;
    }

    if (n < 0) {
      return false;
    }
    
    let A = false;
    if (a - S[n] >= 0){
        arr[n] = 1;
        A = isSubsetExist(S, n - 1, a - S[n], b, c, arr);
    }

    let B = false;
    if (!A && (b - S[n] >= 0))
    {
        arr[n] = 2;        // current element goes to the second subset
        B = isSubsetExist(S, n - 1, a, b - S[n], c, arr);
    }

    let C = false;
    if ((!A && !B) && (c - S[n] >= 0))
    {
        arr[n] = 3;        // current element goes to the third subset
        C = isSubsetExist(S, n - 1, a, b, c - S[n], arr);
    }

    return A || B || C;
}
  
const crunchingJS = (S, n) => {
    const sum = S.reduce((a,b) => a + b);
    const [subSet1, subSet2, subSet3] = [[],[],[]];
    let arr = new Array(n);

    const result = (n >=3) && !(sum%3) && isSubsetExist(S, n - 1, sum/3, sum/3, sum/3, arr);
    if (!result){
      return [subSet1, subSet2, subSet3];
    }

    for (let j = 0; j < n; j++){
      if (arr[j] == 1){
        subSet1.push(S[j])
      }
      else if (arr[j] == 2){
        subSet2.push(S[j])
      }
      else if (arr[j] == 3){
        subSet3.push(S[j])
      }
    }
    //console.log(subSet1, subSet2, subSet3);
    return [subSet1, subSet2, subSet3];

}

export default crunchingJS;