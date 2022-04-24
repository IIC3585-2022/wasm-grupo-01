const checkEqual = (list, N, sm1, sm2, sm3, j) => {
    if (j === N)
    {
      if (sm1 === sm2 && sm2 === sm3)
        return 1;
      else
        return 0;
    }
   
    else
    {
  
      const l = checkEqual(list, N,
                                sm1 + list[j],
                                sm2, sm3, j + 1);
  
      const m = checkEqual(list, N, sm1,
                                sm2 + list[j],
                                sm3, j + 1);
  
      const r = checkEqual(list, N, sm1, sm2,
                                sm3 + list[j], j + 1);
   
      return Math.max(Math.max(l, m), r);
    }
  }
  
  const crunchingJS = (list, N) => {
       const [sum1, sum2, sum3] = [0, 0, 0];
       if (checkEqual(list, N, sum1,
                      sum2, sum3, 0) === 1)
       {
           return 1;
       }
       else
       {
           return 0;
       }
}

export default crunchingJS;