#include <iostream>
#include <vector>
#include <numeric>
using namespace std;
 
// Helper function to 3–partition problem.
// It returns true if there exist three subsets with a given sum
bool isSubsetExist(int S[], int n, int a, int b, int c, int arr[])
{
    // return true if the subset is found
    if (a == 0 && b == 0 && c == 0) {
        return true;
    }
 
    // base case: no items left
    if (n < 0) {
        return false;
    }
 
    // Case 1. The current item becomes part of the first subset
    bool A = false;
    if (a - S[n] >= 0)
    {
        arr[n] = 1;        // current element goes to the first subset
        A = isSubsetExist(S, n - 1, a - S[n], b, c, arr);
    }
 
    // Case 2. The current item becomes part of the second subset
    bool B = false;
    if (!A && (b - S[n] >= 0))
    {
        arr[n] = 2;        // current element goes to the second subset
        B = isSubsetExist(S, n - 1, a, b - S[n], c, arr);
    }
 
    // Case 3. The current item becomes part of the third subset
    bool C = false;
    if ((!A && !B) && (c - S[n] >= 0))
    {
        arr[n] = 3;        // current element goes to the third subset
        C = isSubsetExist(S, n - 1, a, b, c - S[n], arr);
    }
 
    // return true if we get a solution
    return A || B || C;
}
extern "C" {
  int checkEqualSum(int S[], int n)
    {
        int sum = 0;
        for (int i = 0; i < n; i++)
        {
            sum += S[i];
        }
    
        // construct an array to track the subsets
        // `arr[i] = k` represents i'th item of `S` is part of k'th subset
        int arr[n];
    
        // set result to true if the sum is divisible by 3 and the set `S` can
        // be divided into three subsets with an equal sum
        bool result = (n >= 3) && !(sum % 3) &&
                isSubsetExist(S, n - 1, sum/3, sum/3, sum/3, arr);
    
        if (!result)
        {
            printf("3-Partition of set is not possible");
            return 0;
        }
        
        printf("Partition is possible");

        return 1;
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