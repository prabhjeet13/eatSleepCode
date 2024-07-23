#include<bits/stdc++.h>
using namespace std;
void merge(vector<int>& a, int beg, int mid, int end)    
{    
    int i, j, k;  
    int n1 = mid - beg + 1;    
    int n2 = end - mid;    
      
    int LeftArray[n1], RightArray[n2];  
    for (int i = 0; i < n1; i++)    
    LeftArray[i] = a[beg + i];    

    for (int j = 0; j < n2; j++)    
    RightArray[j] = a[mid + 1 + j];    
      
    i = 0, 
    j = 0;    
    k = beg;  
      
    while (i < n1 && j < n2)    
    {    
        if(LeftArray[i] <= RightArray[j])    
        {    
            a[k] = LeftArray[i];    
            i++;    
        }    
        else    
        {    
            a[k] = RightArray[j];    
            j++;    
        }    
        k++;    
    }    
    while (i<n1)    
    {    
        a[k] = LeftArray[i];    
        i++;    
        k++;    
    }    
      
    while (j<n2)    
    {    
        a[k] = RightArray[j];    
        j++;    
        k++;    
    }    
}    
void mergeSort(vector<int>& vec, int  begin, int end)
{
    if (begin >= end)
        return;

    int mid = begin + (end - begin) / 2;
    mergeSort(vec, begin, mid);
    mergeSort(vec, mid + 1, end);
    merge(vec, begin, mid, end);
}


int main()
{
    int n;
    cin >> n;
    vector<int> vec(n,0);
    for(int i = 0 ; i < n; i++)
    {
       cin>>vec[i];
     }
    mergeSort(vec,0,n-1);
   for(int i = 0 ; i < n; i++)
  {
       cout<<vec[i]<<" ";
  }  
return 0;
}