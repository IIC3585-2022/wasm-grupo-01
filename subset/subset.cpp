// C++ program for
// the above approach
// obtenido de geekforgeeks.org
#include <iostream>
using namespace std;
 
// Utility function to check array can
// be partition to 3 subsequences of
// equal sum or not
int checkEqualSumUtil(int arr[], int N,
                      int sm1, int sm2,
                      int sm3, int j)
{   
  // Base Case
  if (j == N)
  {
    if (sm1 == sm2 && sm2 == sm3)
      return 1;
    else
      return 0;
  }
 
  else
  {
    // When element at index
    // j is added to sm1
    int l = checkEqualSumUtil(arr, N,
                              sm1 + arr[j],
                              sm2, sm3, j + 1);
 
    // When element at index
    // j is added to sm2
    int m = checkEqualSumUtil(arr, N, sm1,
                              sm2 + arr[j],
                              sm3, j + 1);
 
    // When element at index
    // j is added to sm3
    int r = checkEqualSumUtil(arr, N, sm1, sm2,
                              sm3 + arr[j], j + 1);
 
    // Return maximum value among
    // all above 3 recursive call
    return max(max(l, m), r);
  }
}
 
// Function to check array can be
// partition to 3 subsequences of
// equal sum or not
extern "C" {
  int checkEqualSum(int arr[], int N)
  {
    // Initialise 3 sums to 0
    int sum1, sum2, sum3;
    
    sum1 = sum2 = sum3 = 0;
    
    // Function Call
    if (checkEqualSumUtil(arr, N, sum1,
                            sum2, sum3, 0)== 1)
    {
        return 1;
    }
    else
    {
        return 0;
    }
  }
}
 
// Driver Code
int main()
{
  // Given array arr[]
  int arr[] = {17, 34, 59, 23, 17, 67,
               57, 2, 18, 59, 1 };
  int N = 11;
 
  // Function Call
  checkEqualSum(arr, N);
  return 0;
}